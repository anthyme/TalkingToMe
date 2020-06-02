using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Context;
using App.TalkCreation.Data.DataFetch.Dto;
using App.TalkCreation.Models;
using Microsoft.EntityFrameworkCore;

namespace App.TalkCreation.Data.DataFetch
{
    public class QuestionServiceFetch
    {
        readonly TalkContextFactory _talkContextFactory;
        public QuestionServiceFetch(TalkContextFactory talkContextFactory)
        {
            _talkContextFactory = talkContextFactory;
        }

        public async Task<List<Question>> GetQuestionsByQuizzId(int quizzId)
        {
            using var context = _talkContextFactory.Create();
            try
            {
                var response = await context.Questions
                        .Where(p => p.QuizzId == quizzId)
                        .Include(p => p.Answers)
                        .ToListAsync();
                return response;
            }
            catch (ArgumentOutOfRangeException e)
            {
                return null;
            }
        }

        public async Task<List<QuestionDto>> GetQuestionsDtoByQuizzId(int quizzId)
        {
            using var context = _talkContextFactory.Create();
            var listDto = new List<QuestionDto>();
            try
            {
                var response = await context.Questions
                        .Where(p => p.QuizzId == quizzId)
                        .Include(p => p.Answers)
                        .ToListAsync();

                foreach (var quest in response)
                {
                    var dto =
                        new QuestionDto
                        {
                            Id = quest.Id,
                            Question = quest.Quest,
                            CorrectAn = quest.CorrectAn,
                            Type = quest.Type
                        };
                    var anss = new List<string>();
                    foreach (var ans in quest.Answers) anss.Add(ans.Response);
                    dto.Answers = anss;
                    listDto.Add(dto);
                }
                return listDto;
            }
            catch (ArgumentOutOfRangeException e)
            {
                var dto =new QuestionDto{Id = -1};
                listDto.Add(dto);
                return listDto;
            }
        }
    }
}
