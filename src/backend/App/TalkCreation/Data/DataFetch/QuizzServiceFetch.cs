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
        private string _connectionString;
        public QuizzServiceFetch(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }

        //TODO - Change syntax for fetch
        public async Task<QuizzDTO> returnQuizzById(int id)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                var quizz = await context.Quizzes
               .Where(p => p.Id == id)
               .Include(p => p.Questions)
               .ThenInclude(p => p.Answers)
               .FirstOrDefaultAsync();
                if (quizz == null)
                {
                    //TODO - Create return error
                    return null;
                }
                List<QuestionDto> questionDTOList = new List<QuestionDto>();
                foreach (Question question in quizz.Questions)
                {
                    List<string> answerList = new List<string>();
                    foreach (Answer answer in question.Answers)
                    {
                        answerList.Add(answer.Response);
                    }
                    QuestionDto questionDto = new QuestionDto
                    {
                        Id = question.Id,
                        CorrectAn = question.CorrectAn,
                        Type = question.Type,
                        Question = question.Quest,
                        Answers = answerList
                    };
                    questionDTOList.Add(questionDto);
                }
                QuizzDTO quizzDto = new QuizzDTO
                {
                    Id = quizz.Id,
                    OwnerId = quizz.OwnerId,
                    Name = quizz.Name,
                    Questions = questionDTOList
                };
                return quizzDto;
            }
            catch (ArgumentOutOfRangeException e)
            {
                Console.WriteLine("Failed to get Quizz");
                return null;
            }
        }

        public async Task<List<QuizzDTO>> returnQuizzByUserId(int id)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                var quizzes = await context.Quizzes
                .Where(p => p.OwnerId == id)
                .Include(p => p.Questions)
                .ThenInclude(p => p.Answers)
                .ToListAsync();

                List<QuizzDTO> quizzesDto = new List<QuizzDTO>();
                foreach (Quizz quizz in quizzes)
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
            catch (ArgumentOutOfRangeException e)
            {
                Console.WriteLine("This user does not have any Quizzes");
                return null;
            }
        }

        public async Task<List<String>> returnQuizzByTalkId(int id)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                var quizzesToTalk = context.QuizzToTalks
                    .Where(p => p.TalkId == id)
                    .ToList();
                List<String> listQuizzesId = new List<String>();
                foreach (QuizzToTalk quizzToTalk in quizzesToTalk)
                {
                    listQuizzesId.Add(quizzToTalk.QuizzId.ToString());
                }
                return listQuizzesId;
            }
            catch (ArgumentOutOfRangeException e)
            {
                Console.WriteLine("This user does not have any Quizzes");
                return null;
            }
        }
    }
}
