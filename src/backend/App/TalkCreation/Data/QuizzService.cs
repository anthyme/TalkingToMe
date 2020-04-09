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

        //TODO - Change syntax for fetch
        public string AddNewQuizzNoTalk(dynamic data)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkContext>();
            optionsBuilder.UseSqlServer(_connectionString);
            using (TalkContext context = new TalkContext(optionsBuilder.Options))
            {
                var QuizzInfo= data[data.Count-1];
                Quizz addQuizz = new Quizz
                {
                    Name = QuizzInfo.Name
                };
                context.Quizzes.Add(addQuizz);
                context.SaveChanges();
                int quizzId = addQuizz.Id;
                data.RemoveAt(data.Count-1);
                foreach (dynamic question in data)
                {
                    string answers = "{";
                    foreach (String answer in question.answers.answers)
                    {
                        answers += '"' + answer + '"' + ",";
                    }
                    answers += "}";

                    Question addQuestion = new Question
                    {
                        Answers = answers,
                        Quest = question.question.questionValue,
                        Type = question.type.selectedValue,
                        CorrectAn = question.rightAnswer.value
                    };
                    context.Questions.Add(addQuestion);
                    context.SaveChanges();
                    int questionId = addQuestion.Id;
                    
                    QuizzToQuestion addQuizzToQuestion = new QuizzToQuestion
                    {
                        QuizzId = quizzId,
                        QuestionId= questionId
                    };
                    context.QuizzToQuestions.Add(addQuizzToQuestion);
                    context.SaveChanges();
                }
                return "{\"response\":\"New Quizz Saved\"}";
            }
        }
    }
}
