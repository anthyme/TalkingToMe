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
    public class QuizzController : ControllerBase
    {
        private readonly TalkContext _context;
        private readonly QuizzService _quizzService;

        public QuizzController(TalkContext context, QuizzService quizzService)
        {
            _context = context;
            _quizzService = quizzService;
        }

        // GET: api/ChannelsControllerTest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quizz>>> GetQuizzes()
        {
            return await _context.Quizzes.ToListAsync();
        }

        // GET: api/ChannelsControllerTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quizz>> GetQuizz(int id)
        {
            var channel = await _context.Quizzes.FindAsync(id);

            if (channel == null)
            {
                return NotFound();
            }

            return channel;
        }

        // PUT: api/ChannelsControllerTest/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
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

        // POST: api/ChannelsControllerTest
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<string>> PostQuizz([FromBody]dynamic quizz)
        {
            var parsedQuizz = JArray.Parse(quizz.ToString());
            string returnQuizz= _quizzService.AddNewQuizzNoTalk(parsedQuizz);
            Console.WriteLine(returnQuizz);
            return returnQuizz;
        }

        // DELETE: api/ChannelsControllerTest/5
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
