using System;
using App.TalkCreation.Models;
using App.TalkCreation.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;


namespace App.TalkCreation.Data
{
    public class TalksServicePost
    {
        private string _connectionString;
        public TalksServicePost(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }
        public string AddNewTalk(dynamic data)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try

            {
                Console.WriteLine(data);
                Talk newTalk = new Talk
                {
                    Name = data[0].name.name,
                    Description = data[0].description.description,
                    OwnerId = 1
                };
                context.Talks.Add(newTalk);
                context.SaveChanges();
                int talkId = newTalk.Id;

                AddQuizzesToTalk(data[0].quizzesId.selectedQuizzes, talkId);

                return "{\"response\":\"New Talk created\"}";
            } catch(Exception e)
            {
                return "{\"response\":\"New Talk failed to create\"}";
            }
        }

        public string AddQuizzesToTalk(dynamic quizzesId, int talkId)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                foreach (int quizzId in quizzesId)
                {
                    QuizzToTalk quizzToTalk = new QuizzToTalk
                    {
                        TalkId = talkId,
                        QuizzId = quizzId
                    };
                    context.QuizzToTalks.Add(quizzToTalk);
                    context.SaveChanges();
                }
                return "{\"response\":\"New Quizz added to Talk\"}";
            }
            catch (Exception e)
            {
                return "{\"response\":\"New Quizz failed to add to talk\"}";
            }
        }

        public void ChangeTalk(dynamic data)
        {

            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                Talk changeTalk = new Talk
                {
                    Id = data.id,
                    Name = data.name,
                    Description = data.description
                };
                context.Talks.Add(changeTalk);
                context.SaveChanges();
            } catch (ArgumentOutOfRangeException e)
            {

            }
        }
    }
}
