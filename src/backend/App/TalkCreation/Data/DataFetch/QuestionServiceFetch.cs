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
    public class QuestionServiceFetch
    {
        private IConfiguration configuration;
        private string _connectionString;
        public QuestionServiceFetch(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }
        public async Task<IEnumerable<Question>> getQuestionsByQuizzId(int quizzId)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                var response = await context.Questions
                        .Where(p => p.QuizzId == quizzId)
                        .Include(p => p.Answers)
                        .ToListAsync();
                return response;
            } catch (ArgumentOutOfRangeException e)
            {
                return null;
            }
        }
    }
}
