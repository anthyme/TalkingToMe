using System;
using App.TalkCreation.Models;
using App.TalkCreation.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using App.TalkAnswer.SaveTalkProgress;

namespace App.TalkCreation.Data.DataPost
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
                    OwnerId = data[0].ownerId.userIdRdx
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
                int talkId = data[0].id.id;
                Talk changeTalk = context.Talks.FirstOrDefault(item => item.Id == talkId);
                changeTalk.Name = data[0].name.name;
                changeTalk.Description = data[0].description.description;
                context.Talks.Update(changeTalk);

                List<int> oldQuizzes = data[0].oldQuizzes.oldQuizzes.ToObject<List<int>>();
                List<int> checkedQuizzes = data[0].selectedQuizzes.selectedQuizzes.ToObject<List<int>>();
                for (int i = checkedQuizzes.Count - 1; i >= 0; i--) //reversed loop to be able to call .remove in the loop
                {
                    if (oldQuizzes.Contains(checkedQuizzes[i]))
                    {
                        oldQuizzes.Remove(checkedQuizzes[i]);
                        checkedQuizzes.Remove(checkedQuizzes[i]);
                    }
                }
                foreach(int i in oldQuizzes)
                {
                    QuizzToTalk qtt = context.QuizzToTalks.Where(a => a.QuizzId == i && a.TalkId == talkId).FirstOrDefault();
                    context.Remove(qtt);
                }
                foreach(int j in checkedQuizzes)
                {
                    var qtt = new QuizzToTalk { QuizzId = j, TalkId = talkId };
                    context.Add(qtt);
                }

                context.SaveChanges();
            } catch (ArgumentOutOfRangeException e)
            {
                Console.WriteLine("error modifiying talk");
            }
        }

        public void ChangeTalkUrl(dynamic data, int id)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                string talkurl = data[0].url;
                Console.WriteLine("talkurl");
                Talk changeTalk = context.Talks.FirstOrDefault(item => item.Id == id);
                string groupId = changeTalk.Url;
                changeTalk.Url = (talkurl.Equals("NULL"))? changeTalk.Url = null: changeTalk.Url = talkurl;
                context.Talks.Update(changeTalk);
                context.SaveChanges();
                if (talkurl.Equals("NULL"))
                {
                   TalkSessionRepo _talkSessionRepo = TalkSessionRepo.GetInstance();
                   _talkSessionRepo.EndSession(groupId);
                }
            }
            catch (ArgumentOutOfRangeException e)
            {
                Console.WriteLine("error modifiying talk url");
            }
        }

        
    }
}
