﻿using System;
using App.TalkCreation.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using App.TalkCreation.Context;
using App.TalkCreation.Models;
using Newtonsoft.Json.Linq;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataFetch.Dto;
using Microsoft.AspNetCore.Authorization;
using App.TokenValidation;
using App.TalkCreation.Data.DataPost;

namespace App.TalkCreation.Data
{
    [JwtTokenValidation]
    [Route("api/[controller]")]
    [ApiController]
    public class QuizzController : ControllerBase
    {
        private readonly TalkContext _context;
        private readonly QuizzServicePost _quizzService;
        private readonly QuizzServiceFetch _quizzServiceFetch;

        public QuizzController(TalkContext context, QuizzServicePost quizzService, QuizzServiceFetch quizzServiceFetch)
        {
            _context = context;
            _quizzService = quizzService;
            _quizzServiceFetch = quizzServiceFetch;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quizz>>> GetQuizzes()
        {
            return await _context.Quizzes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuizzDTO>> GetQuizz(int id)
        {
            QuizzDTO quizz = await _quizzServiceFetch.returnQuizzById(id);
            return quizz;
        }

        [HttpGet("GetByUser/{id}")]
        public async Task<ActionResult<List<QuizzDTO>>> GetQuizzesByUserId(int id)
        {
            List<QuizzDTO> quizzes = await _quizzServiceFetch.returnQuizzByUserId(id);
            return quizzes;
        }

        [HttpGet("QuizzByTalk/{talkId}")]
        public async Task<ActionResult<List<String>>> GetQuizzesByTalkId(int talkId)
        {
            List<String> quizzes = await _quizzServiceFetch.returnQuizzByTalkId(talkId);
            return quizzes;
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<string>> PutQuizz([FromBody] dynamic quizz)
        {
            var parsedQuizz = JArray.Parse(quizz.ToString());
            string returnQuizz = _quizzService.updateQuizz(parsedQuizz);
            return returnQuizz;
        }

       [HttpPut("TalksToQuizz")]
       public async Task<string> putTalksToQuizz([FromBody] dynamic jsonTTQ)
        {
            var parsedTtq = JArray.Parse(jsonTTQ.ToString());
            Console.WriteLine(parsedTtq);
            _quizzService.changeTalksToQuizz(parsedTtq);
            return "{\"response\":\"QuizzToTalks modified\"}";
        }

        private bool QuizzExists(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<ActionResult<string>> PostQuizz([FromBody]dynamic quizz)
        {
            var parsedQuizz = JArray.Parse(quizz.ToString());
            string returnQuizz= _quizzService.AddNewQuizzToTalk(parsedQuizz);
            return returnQuizz;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Quizz>> DeleteQuizz(int id)
        {
            var channel = await _context.Quizzes.FindAsync(id);
            if (channel == null)
            {
                return NotFound();
            }

            _context.Quizzes.Remove(channel);
            await _context.SaveChangesAsync();

            return channel;
        }
    }
}
