using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Context;
using App.TalkCreation.Data.DataFetch.Dto;
using App.TalkCreation.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace App.TalkCreation.Data.DataFetch
{
    public class TalksServiceFetch
    {
        readonly TalkContextFactory _talkContextFactory;

        public TalksServiceFetch(TalkContextFactory talkContextFactory)
        {
            _talkContextFactory = talkContextFactory;
        }

        public async Task<TalkAndQuizzesDTO> getTalkAndQuizzes(int id)
        {
            using TalkContext context = _talkContextFactory.Create();
            try
            {
                var response = await context.Talks
                    .Where(p => p.Id == id)
                    .Include(p => p.Quizzes)
                    .ThenInclude(p => p.Quizz)
                    .ToListAsync();

                TalkAndQuizzesDTO talkNQuizzes = new TalkAndQuizzesDTO();
                talkNQuizzes.idTalk = id;
                talkNQuizzes.talkName = response[0].Name;
                talkNQuizzes.talkUrl = response[0].Url;
                talkNQuizzes.Quizzes = new List<Quizz>();
                foreach (QuizzToTalk qtt in response[0].Quizzes)
                {
                    Quizz qtemp = new Quizz();
                    qtemp.Id = qtt.Quizz.Id;
                    qtemp.Name = qtt.Quizz.Name;
                    talkNQuizzes.Quizzes
                        .Add(qtemp);
                }
                return talkNQuizzes;
            }
            catch (ArgumentOutOfRangeException e)
            {
                Console.WriteLine("The Desired Talk does not exist");
                return null;
            }
        }

        public async Task<List<String>> returnTalksByQuizzId(int quizzId)
        {
            using TalkContext context = _talkContextFactory.Create();
            try
            {
                var quizzesToTalk = context.QuizzToTalks
                    .Where(p => p.QuizzId == quizzId)
                    .ToList();
                List<String> listTalksId = new List<String>();
                foreach (QuizzToTalk quizzToTalk in quizzesToTalk)
                {
                    listTalksId.Add(quizzToTalk.TalkId.ToString());
                }
                return listTalksId;
            }
            catch (ArgumentOutOfRangeException e)
            {
                Console.WriteLine("This quizz isn't linked to any talk");
                return null;
            }
        }


        public async Task<List<Talk>> getTalksByUserId(int id)
        {
            using TalkContext context = _talkContextFactory.Create();
            try
            {
                var talks = await context.Talks.Where(p => p.OwnerId == id).ToListAsync();
                return talks;
            }
            catch (ArgumentOutOfRangeException e)
            {
                return null;
            }
        }

        public async Task<string> deleteTalk(int id)
        {
            using TalkContext context = _talkContextFactory.Create();
            try
            {
                var talk = await context.Talks.FindAsync(id);
                context.QuizzToTalks.RemoveRange(context.QuizzToTalks.Where(q => q.TalkId == id));
                context.Talks.Remove(talk);
                await context.SaveChangesAsync();
                return "{\"response\":\"Remove sucessful\"}";
            }
            catch (ArgumentOutOfRangeException e)
            {
                return "{\"response\":\"Remove failed\"}";
            }

        }
    }
}
