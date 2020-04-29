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

        public int CheckUserExistence(dynamic data)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            data = data[0];
            try
            {
                string externalId = data.userId.userId;
                string service = data.service.service;
                User user = context.Users.Where(p => p.ExternalId == externalId && p.Service == service).DefaultIfEmpty<User>(null).First();
                if (user!=null)
                {
                    return user.UserId;
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
                context.Users.Update(modUser);
                return userId;
            }
            catch (ArgumentOutOfRangeException e)
            {
                string message = "The creation of a new User or finding an existing user failed, id of -1 has been as an error marker";
                _logger.LogWarning("Message displayed: {Message} at {RequestTime}", message, DateTime.Now);
                return -1;
            }
        }

    }
}