﻿using App.TalkAnswer.Dto;
using App.TalkCreation.Context;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataPost;
using App.TokenValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Data
{
    [JwtTokenValidation]
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly TalkContext _context;
        private readonly IConfiguration configuration;
        private readonly ILogger<QuestionController> log;
        private readonly SessionServicePost _sessionServicePost;
        private readonly SessionServiceFetch _sessionServiceFetch;

        public SessionController(TalkContext context, IConfiguration configuration, ILogger<QuestionController> log, SessionServicePost sessionServicePost, SessionServiceFetch sessionServiceFetch)
        {
            this.configuration = configuration;
            this.log = log;
            _context = context;
            _sessionServicePost = sessionServicePost;
            _sessionServiceFetch = sessionServiceFetch;
        }

        [HttpGet("SessionsByTalk/{talkId}")]
        public async Task<ActionResult<List<SessionHistoryDTO>>> getSessionsByTalkId(int talkId)
        {
            List<SessionHistoryDTO> sessions = await _sessionServiceFetch.returnSessionsByTalkId(talkId);
            return sessions;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteSession(int id)
        {
            string response = await _sessionServicePost.DeleteSession(id);
            return response;
        }
    }
}
