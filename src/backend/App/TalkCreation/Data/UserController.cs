using System;
using App.TalkCreation.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using App.TalkCreation.Context;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Models;
using Newtonsoft.Json.Linq;
using App.TalkCreation.Data.DataFetch.Dto;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using DocumentFormat.OpenXml.Spreadsheet;
using App.TokenValidation;
using App.TalkAnswer.Dto.QuizzResultsDTO;
using Microsoft.Extensions.Primitives;
using App.TalkAnswer.Services;
using App.TalkAnswer.Dto;

namespace App.TalkCreation.Data
{
    [JwtTokenValidation]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TalkContext _context;
        private readonly UserServiceFetch _userServiceFetch;
        private readonly UserServices _userServices;
        private readonly ILogger _logger;

        public UserController(TalkContext context, UserServiceFetch userServiceFetch, UserServices userServices, ILogger<TalksController> logger)
        {
            _context = context;
            _userServiceFetch = userServiceFetch;
            _userServices = userServices;
            _logger = logger;
        }

        // GET: api/ChannelsControllerTest
        [HttpPost]
        public async Task<ActionResult<string>> CheckUserAndGetId([FromBody]dynamic userInfos)
        {
            var parsedInfos = JArray.Parse(userInfos.ToString());
            Console.WriteLine(parsedInfos);
            string userId = _userServiceFetch.CheckUserExistence(parsedInfos);
            // End of test purpose //
            return userId;
        }

        [HttpGet("resultsBySessionAndQuizz/{groupId}")]
        public async Task<QuizzResults> LoadResults(string groupId)
        {
            var header = Request.Headers;
            if (header.ContainsKey("QuizzId"))
            {
                StringValues quizzId;
                header.TryGetValue("QuizzId", out quizzId);

                var quizzResults = _userServices.GetQuizzResults(groupId, Convert.ToInt32(quizzId));
                return quizzResults;
            }
            return null;
        }

        [HttpGet("QuestionsBySession/{groupId}")]
        public async Task<List<UserQuestionsDTO>> LoadQuestionsBySession(string groupId)
        {
            var userQuestionsDTO = _userServiceFetch.GetQuestionsBySession(groupId);
            return userQuestionsDTO;
        }
    }
}
