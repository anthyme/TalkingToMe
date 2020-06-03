using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkAnswer.Dto;
using App.TalkAnswer.Dto.QuizzResultsDTO;
using App.TalkAnswer.SaveTalkProgress;
using App.TalkCreation.Context;
using App.TalkCreation.Models;
using Microsoft.Extensions.Logging;

namespace App.TalkAnswer.Services
{
    public class UserServices
    {
        private readonly ILogger _logger;
        private readonly TalkSessionRepo _talkSessionRepo;
        readonly TalkContextFactory _talkContextFactory;

        public UserServices(
            ILogger<UserServices> logger,
            TalkSessionRepo talkSessionRepo,
            TalkContextFactory talkContextFactory)
        {
            _logger = logger;
            _talkSessionRepo = talkSessionRepo;
            _talkContextFactory = talkContextFactory;
        }

        public async Task ChangeTalkById(string groupId, int talkId)
        {
            using (TalkContext context = _talkContextFactory.Create())
            {
                Talk modTalk = context.Talks.Where(p => p.Id == talkId).FirstOrDefault();
                modTalk.Url = groupId;
                if (talkId != -1)
                {
                    string now = DateTime.Now.ToString();
                    Session dbSession = new Session { StartDate = now, groupId = groupId, TalkId = talkId };
                    context.Sessions.Add(dbSession);
                    CurrentSession currentSession = new CurrentSession(groupId, -1, DateTime.Now, new List<QuizzAnswers> { new QuizzAnswers() { quizzId = -1, listAnswers = new List<Dictionary<int, string>> { new Dictionary<int, string>() } } });
                    if (!context.Sessions.Where(s => s.groupId == groupId).Any())
                    {
                        _talkSessionRepo.Save(currentSession);
                    }
                }
                context.SaveChanges();
            }
        }

        public QuizzResults GetQuizzResults(string groupId, int quizzId)
        {
            using (TalkContext context = _talkContextFactory.Create())
            {
                try
                {
                    QuizzResults quizzResults = new QuizzResults
                    {
                        quizzId = quizzId,
                        listQuestions = new List<QuestionResults>(),
                    };
                    List<Question> listQuestions = context.Questions.Where(p => p.Quizz.Id == quizzId).ToList();
                    foreach (Question question in listQuestions)
                    {
                        QuestionResults questionResults = new QuestionResults
                        {
                            questionId = question.Id,
                            listAnswers = new List<AnswerResults>(),
                            type = question.Type,
                        };
                        List<UserAnswer> listUserAnswers = context.UserAnswers.Where(p => p.QuestionId == question.Id && p.Session.groupId.Equals(groupId)).ToList();
                        foreach (UserAnswer userAnswer in listUserAnswers)
                        {
                            AnswerResults answerResults = new AnswerResults
                            {
                                answer = userAnswer.Response,
                                count = userAnswer.Count,
                            };
                            questionResults.listAnswers.Add(answerResults);
                        }
                        quizzResults.listQuestions.Add(questionResults);

                    }
                    return quizzResults;
                    Console.WriteLine("Change Talk");
                }
                catch (Exception e)
                {
                    _logger.LogError("The Talk could not update its url", e);
                    return null;
                }
            }
        }
    }
}
