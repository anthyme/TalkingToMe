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
using Microsoft.AspNetCore.Authorization;
using DocumentFormat.OpenXml.Spreadsheet;
using App.TokenValidation;

namespace App.TalkCreation.Data
{
    [JwtTokenValidation]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TalkContext _context;
        private readonly UserServiceFetch _userServiceFetch;
        private readonly ILogger _logger;

        public UserController(TalkContext context, UserServiceFetch userServiceFetch, ILogger<TalksController> logger)
        {
            _context = context;
            _userServiceFetch = userServiceFetch;
            _logger = logger;
        }

        // GET: api/ChannelsControllerTest
        [HttpPost]
        public async Task<ActionResult<string>> CheckUserAndGetId([FromBody]dynamic userInfos)
        {
            var parsedInfos = JArray.Parse(userInfos.ToString());
            string userId = _userServiceFetch.CheckUserExistence(parsedInfos);
            // End of test purpose //
            Console.WriteLine(userId);
            return userId;
        }
    }
}
