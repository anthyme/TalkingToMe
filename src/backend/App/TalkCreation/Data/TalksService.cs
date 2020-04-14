using System;
using App.TalkCreation.Models;
using App.TalkCreation.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


namespace App.TalkCreation.Data
{
    public class TalksService
    {
        private IConfiguration configuration;
        private string _connectionString;
        public TalksService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }
        public string AddNewTalk(dynamic data)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkContext>();
            optionsBuilder.UseSqlServer(_connectionString);
            using (TalkContext context = new TalkContext(optionsBuilder.Options))
            {
                Talk newTalk = new Talk
                {
                    Name = data.Name,
                    Description = data.Description
                };
                context.Talks.Add(newTalk);
                context.SaveChanges();
                int talkId = newTalk.Id;

                Quizz tempQuizz = context.Quizzes.Where(p => p.Id == 0).FirstOrDefault();
                context.Quizzes.Add(tempQuizz);
                context.SaveChanges();
                int quizzId = tempQuizz.Id;

                QuizzToTalk quizzToTalk = new QuizzToTalk
                {
                    TalkId = talkId,
                    QuizzId = quizzId
                };
                context.QuizzToTalks.Add(quizzToTalk);
                context.SaveChanges();

                Question[] questions = context.Questions.Where(p => p.QuizzId == 0).ToArray();
                foreach (Question question in questions)
                {
                    question.Id = quizzId;
                    context.Questions.Add(question);
                    context.SaveChanges();

                }
                return "{\"response\":\"New Talk created\"}";
            }
        }
    }
}
