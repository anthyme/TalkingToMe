using App.TalkCreation.Context;
using App.TalkCreation.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using App.TalkAnswer.SaveTalkProgress;

namespace App.TalkAnswer
{
    public class UserServices
    {
        private string _connectionString;
        private readonly ILogger _logger;
        public UserServices(IConfiguration configuration, ILogger<UserServices> logger)
        {
            _connectionString = configuration.GetConnectionString("DBString");
            _logger = logger;
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
                context.SaveChanges();
                if (talkId != -1)
                {
                    Session session = new Session(groupId, -1);
                    _talkSessionRepo.Save(session);
                }
                Console.WriteLine("Change Talk");
            }
            catch (Exception e)
            {
                _logger.LogError("The Talk could not update its url", e);
            }
        }
    }
}
