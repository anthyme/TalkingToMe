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
    public class QuizzService
    {
        private IConfiguration configuration;
        private string _connectionString;
        public QuizzService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }
        public Quizz AddNewQuizzNoTalk(dynamic data)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkContext>();
            optionsBuilder.UseSqlServer(_connectionString);
            using (TalkContext context = new TalkContext(optionsBuilder.Options))
            {
                Quizz addQuizz = new Quizz
                {
                    Name = data.Name.toString()
                };
                context.Quizzes.Add(addQuizz);
                int quizzId = addQuizz.Id;
                foreach (dynamic question in data)
                {
                    string answers = "{";
                    foreach (Object answer in data.Answers)
                    {
                        answers += '"' + answer.ToString() + '"' + ",";
                    }
                    answers = "}";
                    
                    Question addQuestion = new Question
                    {
                        Answers = answers,
                        Quest = question.Question.ToString(),
                        Type = question.Type.ToString(),
                        CorrectAn = question.CorrectAn.ToString()
                    };
                    context.Questions.Add(addQuestion);
                    int questionId = addQuestion.Id;
                    
                    QuizzToQuestion addQuizzToQuestion = new QuizzToQuestion
                    {
                        QuizzId = quizzId,
                        QuestionId= questionId
                    };
                    context.QuizzToQuestions.Add(addQuizzToQuestion);
                }
                context.SaveChanges();
                return addQuizz;
            }
        }
    }
}
