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
        readonly TalkContextFactory _talkContextFactory;

        public SessionServicePost(TalkContextFactory talkContextFactory)
        {
            _talkContextFactory = talkContextFactory;
        }

        public async Task<string> DeleteSession(int id)
        {
            using TalkContext context = _talkContextFactory.Create();
            var session = await context.Sessions.FindAsync(id);
            context.SessionToQuizzes.RemoveRange(context.SessionToQuizzes.Where(s => s.SessionId == id));
            context.UserAnswers.RemoveRange(context.UserAnswers.Where(u => u.SessionId == id));
            context.Sessions.Remove(session);
            await context.SaveChangesAsync();
            return "{\"response\":\"Remove sucessful\"}";
        }
    }
}
