using App.TalkCreation.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Data.DataPost
{
    public class SessionServicePost
    {
        private string _connectionString;
        public SessionServicePost(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }

        public async Task<string> deleteSession(int id)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            try
            {
                var session = await context.Sessions.FindAsync(id);
                context.SessionToQuizzes.RemoveRange(context.SessionToQuizzes.Where(s => s.SessionId == id));
                context.Sessions.Remove(session);
                await context.SaveChangesAsync();
                return "{\"response\":\"Remove sucessful\"}";
            }
            catch (ArgumentOutOfRangeException e)
            {
                return "{\"response\":\"Remove failed\"}";
            }

        }
    }
}
