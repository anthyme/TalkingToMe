using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Back_End_Chat.Context;
using Back_End_Chat.Models;

namespace App.BaseMigration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChannelsControllerTest : ControllerBase
    {
        private readonly ChatContext _context;

        public ChannelsControllerTest(ChatContext context)
        {
            _context = context;
        }

        // GET: api/ChannelsControllerTest/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Channel>> GetChannel(int id)
        {
            var channel = await _context.HelloWorldBase.FindAsync(id);

            if (channel == null)
            {
                return NotFound();
            }

            return channel;
        }

}

