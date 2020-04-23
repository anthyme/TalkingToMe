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
    public class QuizzServicePost
    {
        private IConfiguration configuration;
        private string _connectionString;
        public QuizzServicePost(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }

        //TODO - Change syntax for fetch
        public string AddNewQuizzNoTalk(dynamic data)
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
                    OwnerId= QuizzInfo.OwnerId.userId
                };
                context.Quizzes.Add(addQuizz);
                context.SaveChanges();
                int quizzId = addQuizz.Id;
                data.RemoveAt(data.Count - 1);
                Console.WriteLine(data);
                foreach (dynamic question in data)
                {
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
                return "{\"response\":\"New Quizz Saved\"}";
            }
            catch (ArgumentOutOfRangeException e)
            {
                return "{\"response\":\"New Quizz failed to save\"}";
            }
        }

        public string AddQuizzToTalk(dynamic data)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                int IQuizzId = data.quizzId;
                Quizz tempQuizz = context.Quizzes.Where(p => p.Id == IQuizzId).FirstOrDefault();
                context.Quizzes.Add(tempQuizz);
                context.SaveChanges();
                int quizzId = tempQuizz.Id;

                QuizzToTalk quizzToTalk = new QuizzToTalk
                {
                    TalkId = data.talkId,
                    QuizzId = quizzId
                };
                context.QuizzToTalks.Add(quizzToTalk);
                context.SaveChanges();

                Question[] questions = context.Questions.Where(p => p.QuizzId == 0).Include(p=>p.Answers).ToArray();
                foreach (Question question in questions)
                {
                    question.Id = quizzId;
                    context.Questions.Add(question);
                    context.SaveChanges();

                }
                return "{\"response\":\"New Quizz added to Talk\"}";
            }
            catch (ArgumentOutOfRangeException e)
            {
                return "{\"response\":\"New Quizz failed to add to talk\"}";
            }
        }
    }
}
