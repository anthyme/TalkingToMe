using App.TalkCreation.Context;
using App.TalkCreation.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace App.TalkCreation.Data.DataPost
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
                    if (question.type.selectedValue != "Deleted")
                    {
                        createNewQuestion(question, quizzId);
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
        public string updateQuizz(dynamic data)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                int quizzId = data[data.Count-1].id.quizzId;
                Quizz modQuizz = context.Quizzes.FirstOrDefault(p => p.Id == quizzId);
                modQuizz.Name = data[data.Count - 1].Name.name;
                context.Quizzes.Update(modQuizz);
                context.SaveChanges();
                data.RemoveAt(data.Count - 1);
                List<int> listQIds = new List<int>();
                List<Question> listQuestions = context.Questions.Where(p=> p.QuizzId==quizzId).ToList();
                foreach (Question questions in listQuestions)
                {
                    listQIds.Add(questions.Id);
                }
                foreach (dynamic question in data)
                {
                    if (question.type.selectedValue != "Deleted")
                    {
                        if ("true".Equals(question.New.isNew))
                        {
                            createNewQuestion(question, quizzId);
                        }
                        else
                        {
                            int questionId = question.questionId.questionId;
                            listQIds.Remove(questionId);
                            putQuestion(question, quizzId);
                        }
                    }                          
                }
                if (listQIds.Count() != 0)
                {
                    foreach(int id in listQIds)
                    {
                        deleteQA(id);
                    }
                }
                return "{\"response\":\"Success\"}";
            }
            catch (ArrayTypeMismatchException e)
            {
                _logger.LogError("The Quizz did not get modified check Json format", e);
                return "{\"response\":\"Failure\"}";
            }
        }

        public void changeTalksToQuizz(dynamic data)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                int quizzId = data[0].quizzId.quizzId;
                List<int> oldTalks = data[0].oldTalks.oldTalks.ToObject<List<int>>();
                List<int> checkedTalks = data[0].selectedTalks.selectedTalks.ToObject<List<int>>();

                for (int i = checkedTalks.Count - 1; i >= 0; i--) //reversed loop to be able to call .remove in the loop
                {
                    if (oldTalks.Contains(checkedTalks[i]))
                    {
                        oldTalks.Remove(checkedTalks[i]);
                        checkedTalks.Remove(checkedTalks[i]);
                    }
                }
                foreach (int i in oldTalks)
                {
                    QuizzToTalk qtt = context.QuizzToTalks.Where(a => a.TalkId == i && a.QuizzId == quizzId).FirstOrDefault();
                    context.Remove(qtt);
                }
                foreach (int j in checkedTalks)
                {
                    var qtt = new QuizzToTalk { TalkId = j, QuizzId = quizzId };
                    context.Add(qtt);
                }
                context.SaveChanges();
            }
            catch (ArrayTypeMismatchException e)
            {
                _logger.LogError("The changes for in quizzToTalks didn't work", e);
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
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();

            int questionId = question.questionId.questionId; 
            Question questionMod = context.Questions.FirstOrDefault(p => p.Id == questionId);
            questionMod.Quest = question.question.questionValue;
            questionMod.Type = question.type.selectedValue;
            questionMod.CorrectAn = question.rightAnswer.value;
            context.Questions.Update(questionMod);

            List<Answer> deleteAnswers = context.Answers.Where(p => p.QuestionId == questionId).ToList();
            foreach (Answer answer in deleteAnswers)
            {
                context.Answers.Remove(answer);
                context.SaveChanges();
            }

            foreach(string answer in question.answers.answers)
            {
                Answer newAnswer = new Answer
                {
                    QuestionId = questionId,
                    Response = answer
                };
                context.Answers.Add(newAnswer);
                context.SaveChanges();
            }
        }

        private void deleteQA(int questionId)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            List<Answer> deleteAnswers = context.Answers.Where(p => p.QuestionId == questionId).ToList();
            foreach(Answer answer in deleteAnswers)
            {
                context.Answers.Remove(answer);
                context.SaveChanges();
            }
            Question deleteQuestion = context.Questions.FirstOrDefault(p=>p.Id==questionId);
            context.Questions.Remove(deleteQuestion);
            context.SaveChanges();
        }
    }
}
