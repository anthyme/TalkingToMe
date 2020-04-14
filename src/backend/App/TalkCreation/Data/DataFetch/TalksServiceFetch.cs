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
            var optionsBuilder = new DbContextOptionsBuilder<TalkContext>();
            optionsBuilder.UseSqlServer(_connectionString);
            using (TalkContext context = new TalkContext(optionsBuilder.Options))
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
        }
    }
}
