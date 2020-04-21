using System;
using App.TalkCreation.Models;
using App.TalkCreation.Context;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using App.TalkCreation.Data.DataFetch.Dto;

namespace App.TalkCreation.Data.DataFetch
{
    public class QuizzServiceFetch
    {
        private IConfiguration configuration;
        private string _connectionString;
        public QuizzServiceFetch(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }
        
        //TODO - Change syntax for fetch
        public async Task<QuizzDTO> returnQuizzById(int id)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkService>();
            optionsBuilder.UseSqlServer(_connectionString);
            using (TalkService context = new TalkService(optionsBuilder.Options))
            {
                var quizz = await context.Quizzes
                    .Where(p => p.Id == id)
                    .Include(p => p.Questions)
                    .ThenInclude(p=>p.Answers)
                    .FirstOrDefaultAsync();
                if (quizz == null)
                {
                    //TODO - Create return error
                    return null;
                }
                QuizzDTO quizzDto = new QuizzDTO
                {
                    Id = quizz.Id,
                    OwnerId = quizz.OwnerId,
                    Name = quizz.Name,
                    Questions = quizz.Questions
                };
                return quizzDto;
            }
        }

        public async Task<List<QuizzDTO>> returnQuizzByUserId(int id)
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkService>();
            optionsBuilder.UseSqlServer(_connectionString);
            using (TalkService context = new TalkService(optionsBuilder.Options))
            {
                var quizzes = await context.Quizzes
                    .Where(p => p.OwnerId == id)
                    .Include(p => p.Questions)
                    .ThenInclude(p => p.Answers)
                    .ToListAsync();
                if (quizzes == null)
                {
                    Console.WriteLine("quizzes is null");
                    //TODO - Create return error
                    return null;
                }
                Console.WriteLine("quizzes is not null");
                List<QuizzDTO> quizzesDto = new List<QuizzDTO>();
                foreach(Quizz quizz in quizzes)
                {
                    QuizzDTO quizzDto = new QuizzDTO
                    {
                        Id = quizz.Id,
                        Name = quizz.Name,
                    };
                    quizzesDto.Add(quizzDto);
                }

                return quizzesDto;
            }
        }
    }
}
