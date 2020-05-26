using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using App.TalkAnswer.Dto;
using App.TalkAnswer.Models;
using App.TalkAnswer.SaveTalkProgress;
using App.TalkCreation.Context;
using App.TalkCreation.Models;

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
                List<Question> quizzQuestions = context.Questions.Where(p => p.QuizzId == currentQuizzId).ToList();
                List<Dictionary<int, string>> dicListAnswers = currentSession.allAnswers[allAnswrsIndx].listAnswers;
                Dictionary<int, string> dicQuestionTypes = new Dictionary<int, string>();
                foreach (Question question in quizzQuestions)
                {
                    dicQuestionTypes.Add(question.Id, question.Type);
                }
                Dictionary<int, List<string>> dicAllAnswersByQuestion = new Dictionary<int, List<string>>();

                foreach (Dictionary<int, string> respsDic in dicListAnswers)
                {
                    foreach (KeyValuePair<int, string> entry in respsDic)
                    {
                        if (dicQuestionTypes[entry.Key].Equals("UCQ"))
                        {
                            if (!dicAllAnswersByQuestion.ContainsKey(entry.Key))
                            {
                                List<string> allAnswersList = new List<string>();
                                allAnswersList.Add(entry.Value);
                                dicAllAnswersByQuestion.Add(entry.Key, allAnswersList);
                            }
                            else
                            {
                                List<string> allAnswersList = new List<string>();
                                dicAllAnswersByQuestion.TryGetValue(entry.Key, out allAnswersList);
                                allAnswersList.Add(entry.Value);
                                dicAllAnswersByQuestion.Remove(entry.Key);
                                dicAllAnswersByQuestion.Add(entry.Key, allAnswersList);
                            }
                        } else
                        {
                            UserAnswer userAnswer = new UserAnswer
                            {
                                QuestionId = entry.Key,
                                Response = entry.Value,
                                Count = 1,
                                SessionId = session.Id,
                            };
                            context.UserAnswers.Add(userAnswer);
                        }
                    }
                    Console.WriteLine("Count for dicAllAnswersByQuestion: " + dicAllAnswersByQuestion.Count());
                }
                if (dicQuestionTypes.Count() != 0)
                {
                    Console.WriteLine("Count for dicQuestionTypes: " + dicQuestionTypes.Count());
                    foreach (KeyValuePair<int, List<string>> entry in dicAllAnswersByQuestion)
                    {
                        Dictionary<string, int> dicCountAnswers = new Dictionary<string, int>();
                        foreach (string listItem in entry.Value)
                        {
                            if (!dicCountAnswers.ContainsKey(listItem))
                            {
                                dicCountAnswers.Add(listItem, 1);
                            }
                            else
                            {
                                int count;
                                dicCountAnswers.TryGetValue(listItem, out count);
                                dicCountAnswers.Remove(listItem);
                                count++;
                                dicCountAnswers.Add(listItem, count);
                            }
                        }
                        foreach (KeyValuePair<string, int> answer in dicCountAnswers)
                        {
                            UserAnswer userAnswer = new UserAnswer
                            {
                                QuestionId = entry.Key,
                                Response = answer.Key,
                                Count = answer.Value,
                                SessionId = session.Id,
                            };
                            Console.WriteLine("For question: "+userAnswer.QuestionId+",the count was :"+userAnswer.Count);
                            context.UserAnswers.Add(userAnswer);
                        }
                    }
                }
                context.SaveChanges();
            }
            catch (ArgumentOutOfRangeException e)
            {

            }
        }
        public UserQuestionsDTO SaveQuestion(string groupId, string question, string username)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            Session currentSession = context.Sessions.Where(p => p.groupId == groupId).FirstOrDefault();
            UserQuestion userQuestion = new UserQuestion
            {
                Question = question,
                Upvotes = 0,
                SessionId = currentSession.Id,
                Username = username,
            };
            context.UserQuestions.Add(userQuestion);
            context.SaveChanges();
            UserQuestionsDTO userQuestionsDTO = new UserQuestionsDTO
            {
                Id = userQuestion.Id,
                Question = question,
                Upvotes = 0,
                SessionId = currentSession.Id,
                Username = username,
            };
            return userQuestionsDTO;
        }
        
        public List<UserQuestion> GetQuestionsBySession(string groupId)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            Session currentSession = context.Sessions.Where(p => p.groupId == groupId).FirstOrDefault();
            List<UserQuestion> userQuestions = context.UserQuestions.Where(p => p.SessionId == currentSession.Id).ToList();
            return userQuestions;
        }
    }
}
