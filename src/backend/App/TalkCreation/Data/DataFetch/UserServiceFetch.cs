using App.TalkCreation.Context;
using App.TalkCreation.Models;
using App.TalkCreation.Data.DataFetch.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.Extensions.Logging;
using App.TalkAnswer.SaveTalkProgress;
using App.TalkAnswer.Models;
using App.TalkAnswer.Dto;

namespace App.TalkCreation.Data
{
    public class UserServiceFetch
    {
        private IConfiguration configuration;
        private string _connectionString;
        private readonly ILogger _logger;
        public UserServiceFetch(IConfiguration configuration, ILogger<TalksController> logger)
        {
            _connectionString = configuration.GetConnectionString("DBString");
            _logger = logger;
        }

        public string CheckUserExistence(dynamic data)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            data = data[0];
            try
            {
                string externalId = data.externalId.externalId;
                string service = data.service.service;
                User user = context.Users.Where(p => p.ExternalId == externalId && p.Service == service).FirstOrDefault();
                if (user!=null)
                {
                    return "{\"response\":\""+ user.UserId + "\"}";
                }

                User newUser = new User
                {
                    ExternalId = data.externalId.externalId,
                    Email = data.email.email,
                    Service = data.service.service,
                    DisplayName = data.name.name,
                };
                context.Users.Add(newUser);
                context.SaveChanges();
                int userId = newUser.Id;
                User modUser = context.Users.Where(p => p.Id == userId).FirstOrDefault();
                modUser.UserId = userId;
                context.SaveChanges();
                return "{\"response\":\"" + userId + "\"}";
            }
            catch (Exception e)
            {
                string message = "The creation of a new User or finding an existing user failed, id of -1 has been returned as an error marker";
                _logger.LogWarning("Message displayed: {Message} at {RequestTime}", message, DateTime.Now);
                return "{\"response\":\"-1\"}" ;
            }
        }

        public List<UserQuestionsDTO> GetQuestionsBySession(string groupId)
        {
            TalkSessionRepo _talkSessionRepo = TalkSessionRepo.GetInstance();
            CurrentSession currentSession = _talkSessionRepo.Get(groupId);
            if (currentSession == null)
            {
                return null;
            }
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            Session session = context.Sessions.Where(p => p.groupId == groupId).FirstOrDefault();
            List<UserQuestion> userQuestions = context.UserQuestions.Where(p => p.SessionId == session.Id).ToList();
            List<UserQuestionsDTO> userQuestionsDTO = new List<UserQuestionsDTO>();
            foreach (UserQuestion userQuestion in userQuestions)
            {
                UserQuestionsDTO userQuestionDTO = new UserQuestionsDTO
                {
                    Id = userQuestion.Id,
                    Question = userQuestion.Question,
                    Upvotes = userQuestion.Upvotes,
                    SessionId = session.Id,
                    Username = userQuestion.Username,
                };
                userQuestionsDTO.Add(userQuestionDTO);
            }
            return userQuestionsDTO;
        }

    }
}