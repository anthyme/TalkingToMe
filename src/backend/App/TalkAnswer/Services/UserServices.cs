using App.TalkCreation.Context;
using App.TalkCreation.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using App.TalkAnswer.SaveTalkProgress;
using App.TalkCreation.Data.DataFetch.Dto;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data;
using App.TalkAnswer.Dto;
using App.TalkAnswer.Models;

namespace App.TalkAnswer
{
    public class UserServices
    {
        private string _connectionString;
        private readonly ILogger _logger;
        private readonly QuizzServiceFetch _quizzServiceFetch;
        private readonly QuestionServiceFetch _questionServiceFetch;
        public UserServices(IConfiguration configuration, ILogger<UserServices> logger, QuizzServiceFetch quizzServiceFetch, QuestionServiceFetch questionServiceFetch)
        {
            _connectionString = configuration.GetConnectionString("DBString");
            _logger = logger;
            _quizzServiceFetch =quizzServiceFetch;
            _questionServiceFetch = questionServiceFetch;
        }


        public void ChangeTalkById(string groupId, int talkId)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            TalkSessionRepo _talkSessionRepo = TalkSessionRepo.GetInstance();
            try 
            {
                Talk modTalk = context.Talks.Where(p => p.Id == talkId).FirstOrDefault();
                modTalk.Url = groupId;
                if (talkId != -1)
                {
                    string now = DateTime.Now.ToString();
                    Session dbSession = new Session { StartDate = now, groupId = groupId };
                    context.Sessions.Add(dbSession);
                    CurrentSession currentSession = new CurrentSession(groupId, -1, DateTime.Now, new List<QuizzAnswers> { new QuizzAnswers() { quizzId = -1, listAnswers = new List<Dictionary<int, string>> { new Dictionary<int, string>() } } });
                    _talkSessionRepo.Save(currentSession);
                }
                context.SaveChanges();
                Console.WriteLine("Change Talk");
            }
            catch (Exception e)
            {
                _logger.LogError("The Talk could not update its url", e);
            }
        }
    }
}
