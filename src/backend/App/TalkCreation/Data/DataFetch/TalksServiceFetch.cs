using App.TalkCreation.Context;
using App.TalkCreation.Models;
using App.TalkCreation.Data.DataFetch.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace App.TalkCreation.Data
{
    public class TalksServiceFetch
    {
        private IConfiguration configuration;
        private string _connectionString;
        public TalksServiceFetch(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }



        public async Task<TalkAndQuizzesDTO> getTalkAndQuizzes(int id)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
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
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
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
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
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
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
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
