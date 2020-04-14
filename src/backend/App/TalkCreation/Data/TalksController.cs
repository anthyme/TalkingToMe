using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using App.TalkCreation.Context;
using App.TalkCreation.Models;

namespace App.TalkCreation.Data
{
    [Route("api/[controller]")]
    [ApiController]
    public class TalksController : ControllerBase
    {
        private readonly TalkContext _context;

        public TalksController(TalkContext context)
        {
            _context = context;
        }

        // GET: api/ChannelsControllerTest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Talk>>> GetTalks()
        {
            return await _context.Talks.Include( p => p.Quizzes).ToListAsync();
        }

        // GET: api/ChannelsControllerTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Talk>>> GetTalk(int id)
        {
            var talk = await _context.Talks.ToListAsync();
            //.Include(p => p.Quizzes).ThenInclude(p => p.Quizz).ThenInclude(p => p.Questions).ThenInclude(p => p.Question).Where(p => p.Id == id)
            //Query à améliorer dans les services

            if (talk == null)
            {
                return NotFound();
            }

            return talk;
        }

        // PUT: api/ChannelsControllerTest/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuizz(int id, Talk talk)
        {
            if (id != talk.Id)
            {
                return BadRequest();
            }

            _context.Entry(talk).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TalkExists(id))
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

        private bool TalkExists(int id)
        {
            throw new NotImplementedException();
        }

        // POST: api/ChannelsControllerTest
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Quizz>> PostTalk(Talk talk)
        {
            _context.Talks.Add(talk);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetChannel", new { id = talk.Id }, talk);
        }

        // DELETE: api/ChannelsControllerTest/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Talk>> DeleteTalk(int id)
        {
            var talk = await _context.Talks.FindAsync(id);
            if (talk == null)
            {
                return NotFound();
            }

            _context.Talks.Remove(talk);
            await _context.SaveChangesAsync();

            return talk;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Talk>>> GetTalkAndQuizz(int id)
        {
            var talk = await _context.Talks.ToListAsync();
            //.Include(p => p.Quizzes).ThenInclude(p => p.Quizz).ThenInclude(p => p.Questions).ThenInclude(p => p.Question).Where(p => p.Id == id)
            //Query à améliorer dans les services

            if (talk == null)
            {
                return NotFound();
            }

            return talk;
        }
    }
}
