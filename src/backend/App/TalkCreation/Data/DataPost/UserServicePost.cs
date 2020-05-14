using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using App.TalkAnswer.Dto;
using App.TalkAnswer.Models;
using App.TalkAnswer.SaveTalkProgress;
using App.TalkCreation.Context;

namespace App.TalkCreation.Data.DataPost
{
    public class UserServicePost
    {
        private string _connectionString;
        public UserServicePost(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }

        public void SaveSessionAndAnswers(CurrentSession currentSession)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                Session session = context.Sessions.FirstOrDefault(p => p.groupId == currentSession.groupid);
                int currentQuizzId = currentSession.currentQuizz;
                int allAnswrsIndx = currentSession.allAnswers.FindIndex(qA => qA.quizzId == currentQuizzId);
                List<Dictionary<int, string>> listAnswers = currentSession.allAnswers[allAnswrsIndx].listAnswers;
                foreach (Dictionary<int, string> respsDic in listAnswers)
                {
                    foreach (KeyValuePair<int, string> entry in respsDic)
                    {
                        UserAnswer userAnswer = new UserAnswer();
                        userAnswer.QuestionId = entry.Key;
                        userAnswer.Response = entry.Value;
                        userAnswer.Count = 1;
                        userAnswer.SessionId = session.Id;
                        context.UserAnswers.Add(userAnswer);
                    }
                }
                context.SaveChanges();
            }
            catch (ArgumentOutOfRangeException e)
            {
                
            }
        }
    }
}
