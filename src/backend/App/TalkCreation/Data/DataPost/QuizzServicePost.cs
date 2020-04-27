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
    public class QuizzServicePost
    {
        private IConfiguration configuration;
        private string _connectionString;
        private readonly ILogger _logger;
        public QuizzServicePost(IConfiguration configuration, ILogger<QuizzServicePost> logger)
        {
            _connectionString = configuration.GetConnectionString("DBString");
            _logger = logger;
        }

        //TODO - Change syntax for fetch
        public string AddNewQuizzToTalk(dynamic data)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                var QuizzInfo = data[data.Count - 1];
                Console.WriteLine(QuizzInfo);
                Quizz addQuizz = new Quizz
                {
                    Name = QuizzInfo.Name.quizzName,
                    OwnerId = QuizzInfo.OwnerId.userId
                };
                context.Quizzes.Add(addQuizz);
                context.SaveChanges();
                int quizzId = addQuizz.Id;
                data.RemoveAt(data.Count - 1);
                Console.WriteLine(data);
                foreach (dynamic question in data)
                {
                    createNewQuestion(question, quizzId);

                }
                return "{\"response\":\"New Quizz Saved\"}";
            }
            catch (ArgumentOutOfRangeException e)
            {
                _logger.LogError("The Quizz did get added correctly check Json format", e);
                return "{\"response\":\"New Quizz failed to save\"}";
            }
        }
        public string updateQuizz(dynamic data)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                int quizzId = data.id.id;
                Quizz modQuizz = context.Quizzes.FirstOrDefault(p => p.Id == quizzId);
                modQuizz.Name = data.name.name;
                context.Quizzes.Update(modQuizz);
                context.SaveChanges();
                data.RemoveAt(data.Count - 1);

                List<int> listModified;
                foreach (dynamic question in data)
                {
                    if (question.New.isNew == true)
                    {
                        createNewQuestion(question, quizzId);
                    }
                    else
                    {
                        //TODO - Function UPDATE / DELETE
                        putQuestion(question, quizzId);
                    }
                }
                return "{\"response\":\"New Quizz Saved\"}";
            }
            catch (ArgumentOutOfRangeException e)
            {
                _logger.LogError("The Quizz did get added correctly check Json format", e);
                return "{\"response\":\"New Quizz failed to save\"}";
            }
        }


        private void createNewQuestion(dynamic question, int quizzId)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            Question addQuestion = new Question
            {
                QuizzId = quizzId,
                Quest = question.question.questionValue,
                Type = question.type.selectedValue,
                CorrectAn = question.rightAnswer.value
            };
            context.Questions.Add(addQuestion);
            context.SaveChanges();
            int questionId = addQuestion.Id;
            foreach (string answerString in question.answers.answers)
            {
                Answer answer = new Answer
                {
                    QuestionId = questionId,
                    Response = answerString
                };
                context.Answers.Add(answer);
                context.SaveChanges();
            }
        }

        private void putQuestion(dynamic question, int quizzId)
        {

        }
    }
}
