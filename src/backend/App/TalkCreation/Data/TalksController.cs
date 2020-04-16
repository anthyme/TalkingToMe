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
using App.TalkCreation.Data.DataFetch.Dto;

namespace App.TalkCreation.Data
{
    [Route("api/[controller]")]
    [ApiController]
    public class TalksController : ControllerBase
    {
        private readonly TalkContext _context;
        private readonly TalksServicePost _talkServicePost;
        private readonly TalksServiceFetch _talkServiceFetch;

        public TalksController(TalkContext context, TalksServicePost talksService, TalksServiceFetch talksServiceFetch)
        {
            _context = context;
            _talkServicePost = talksService;
            _talkServiceFetch = talksServiceFetch;
        }

        // GET: api/ChannelsControllerTest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Talk>>> GetTalks()
        {
            return await _context.Talks.Include( p => p.Quizzes).ToListAsync();
        }

        // GET: api/ChannelsControllerTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Talk>>> GetTalk(int id)
        {
            List<Talk> talks = await _talkServiceFetch.getTalksByUserId(id);
            return talks;
        }

        [HttpGet("fetchTalkAndQuizzes/{id}")] //Fetch custom for specific DTO
        public async Task<TalkAndQuizzesDTO> fetchTalkAndQuizzes(int id)
        {
            Task<TalkAndQuizzesDTO> talk = _talkServiceFetch.getTalkAndQuizzes(id);
            return await talk;
        }

        // PUT: api/ChannelsControllerTest/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<string> PutQuizz([FromBody]dynamic talk)
        {
            var parsedTalk = JArray.Parse(talk.ToString());
            _talkServicePost.ChangeTalk(parsedTalk);
            return "Talk modified";
        }

        private bool TalkExists(int id)
        {
            throw new NotImplementedException();
        }

        // POST: api/ChannelsControllerTest
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<string>> PostTalk([FromBody]dynamic talk)
        {
            var parsedTalk = JArray.Parse(talk.ToString());
            Console.WriteLine(parsedTalk);
            string returnQuizz = _talkServicePost.AddNewTalk(parsedTalk);
            Console.WriteLine(returnQuizz);
            return returnQuizz;
        }

        // DELETE: api/ChannelsControllerTest/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteTalk(int id)
        {
            string response = await _talkServiceFetch.deleteTalk(id);
            return response;
        }
    }
}
