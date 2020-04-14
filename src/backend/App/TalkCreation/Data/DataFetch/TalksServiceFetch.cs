using App.TalkCreation.Context;
using App.TalkCreation.Models;
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

        public async Task<ActionResult<IEnumerable<Talk>>> getTalkAndQuizzById(int id)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkContext>();
            optionsBuilder.UseSqlServer(_connectionString);
            using (TalkContext context = new TalkContext(optionsBuilder.Options))
            {
                var talkNQuizz = await context.Talks.Include(p => p.Quizzes).ToListAsync();
                return talkNQuizz;
            }
        }

        public async Task<List<Talk>> getTalksByUserId(int id)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkContext>();
            optionsBuilder.UseSqlServer(_connectionString);
            using (TalkContext context = new TalkContext(optionsBuilder.Options))
            {
                var talkNQuizz = await context.Talks.Where(p => p.OwnerId==id).ToListAsync();
                return talkNQuizz;
            }
        }
    }
}
