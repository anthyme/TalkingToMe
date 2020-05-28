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
using Microsoft.Extensions.Logging;
using App.TokenValidation;
using App.TalkCreation.Data.DataPost;
using App.TalkAnswer.Models;
using App.TalkAnswer.Dto;

namespace App.TalkCreation.Data
{
    [JwtTokenValidation]
    [Route("api/[controller]")]
    [ApiController]
    public class TalksController : ControllerBase
    {
        private readonly TalkContext _context;
        private readonly TalksServicePost _talkServicePost;
        private readonly TalksServiceFetch _talkServiceFetch;
        private readonly ILogger _logger;

        public TalksController(TalkContext context, TalksServicePost talksService, TalksServiceFetch talksServiceFetch, ILogger<TalksController> logger)
        {
            _context = context;
            _talkServicePost = talksService;
            _talkServiceFetch = talksServiceFetch;
            _logger = logger;
        }

        // GET: api/ChannelsControllerTest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Talk>>> GetTalks()
        {
            //Test purpose, do not keep forever //
            var Message = $"This is a test log from Louis, I take all responsibilities";
            _logger.LogWarning("Message displayed: {Message} at {RequestTime}", Message, DateTime.Now);
            // End of test purpose //


            return await _context.Talks.Include( p => p.Quizzes).ToListAsync();
        }

        // GET: api/ChannelsControllerTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Talk>>> GetTalk(int id)
        {
            List<Talk> talks = await _talkServiceFetch.getTalksByUserId(id);
            return talks;
        }

        [HttpGet("fetchTalkAndQuizzes/{id}")]
        public async Task<TalkAndQuizzesDTO> fetchTalkAndQuizzes(int id)
        {
            Task<TalkAndQuizzesDTO> talk = _talkServiceFetch.getTalkAndQuizzes(id);
            return await talk;
        }

        [HttpGet("TalksByQuizz/{quizzId}")]
        public async Task<ActionResult<List<String>>> GetTalksByQuizzId(int quizzId)
        {
            List<String> talks = await _talkServiceFetch.returnTalksByQuizzId(quizzId);
            return talks;
        }

        [HttpPut("ChangeUrl/{id}")]
        public async Task<string> PutTalkurl([FromBody]dynamic talk, int id)
        {
            var parsedTalk = JArray.Parse(talk.ToString());
            _talkServicePost.ChangeTalkUrl(parsedTalk, id);
            return "{\"response\":\"Talk modified\"}";
        }

        [HttpPut("{id}")]
        public async Task<string> PutQuizz([FromBody]dynamic talk)
        {
            var parsedTalk = JArray.Parse(talk.ToString());
            _talkServicePost.ChangeTalk(parsedTalk);
            return "{\"response\":\"Talk modified\"}";
        }

        private bool TalkExists(int id)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<ActionResult<string>> PostTalk([FromBody]dynamic talk)
        {
            var parsedTalk = JArray.Parse(talk.ToString());
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
