using System;
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

namespace App.TalkCreation.Data
{
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

        [HttpGet("QuizzByTalk/{id}")]
        public async Task<ActionResult<List<String>>> GetQuizzesByTalkId(int id)
        {
            List<String> quizzes = await _quizzServiceFetch.returnQuizzByTalkId(id);
            return quizzes;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuizz(int id, Quizz channel)
        {
            if (id != channel.Id)
            {
                return BadRequest();
            }

            _context.Entry(channel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizzExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
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
            Console.WriteLine(returnQuizz);
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
