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

namespace App.TalkCreation.Data
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        private readonly TalkContext _context;
        private readonly QuestionServiceFetch _questionServiceFetch;

        public QuestionController(TalkContext context, QuestionServiceFetch questionServiceFetch)
        {
            _context = context;
            _questionServiceFetch = questionServiceFetch;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions()
        {
            return await _context.Questions.ToListAsync();
        }

        [HttpGet("fetchQuestionsByQuizzId/{quizzId}")] //Fetch custom to get all questions from a quizz
        public async Task<IEnumerable<Question>> fetchTalkAndQuizzes(int quizzId)
        {
            Task<IEnumerable<Question>> quests = _questionServiceFetch.getQuestionsByQuizzId(quizzId);
            return await quests;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
            var quest = await _context.Questions.FindAsync(id);

            if (quest == null)
            {
                return NotFound();
            }
            return quest;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question quest)
        {
            if (id != quest.Id)
            {
                return BadRequest();
            }

            _context.Entry(quest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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

        private bool QuestionExists(int id)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Question>> DeleteQuestion(int id)
        {
            var quest = await _context.Questions.FindAsync(id);
            if (quest == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(quest);
            await _context.SaveChangesAsync();

            return quest;
        }
    }
}
