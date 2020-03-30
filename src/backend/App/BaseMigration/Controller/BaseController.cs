using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TalkingToMe.BaseMigration.Context;
using TalkingToMe.BaseMigration.Models;

namespace TalkingToMe.BaseMigration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloWorldBase : ControllerBase
    {
        private readonly BaseContext _context;

        public HelloWorldBase(BaseContext context)
        {
            _context = context;
        }

        // GET: api/ChannelsControllerTest/5
        [HttpGet]
        public async Task<ActionResult<HelloWorld>> GetChannel()
        {
            var helloWorld = await _context.HelloWorldBase.FindAsync(1);

            if (helloWorld == null)
            {
                return NotFound();
            }

            return helloWorld;
        }

    }
}

