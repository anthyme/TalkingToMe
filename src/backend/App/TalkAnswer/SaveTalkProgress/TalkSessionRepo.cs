using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.SaveTalkProgress
{
    sealed class TalkSessionRepo
    {
        private static Dictionary<string, Session> Sessions { get; }
        private static readonly object padlock = new object();
        private TalkSessionRepo()
        {
        }
        private static TalkSessionRepo _talkSessionRepo;
        public static TalkSessionRepo GetInstance()
        {
            if (_talkSessionRepo == null)
            {
                _talkSessionRepo = new TalkSessionRepo();
            }
            return _talkSessionRepo;
        }

        public Session Get(string sessionId)
        {
            return Sessions[sessionId];
        }
        public void Save(Session session)
        {
            Sessions[session.groupid] = session;
        }

        public void EndSession(string sessionId)
        {
            if (Sessions.ContainsKey(sessionId)) {
                Sessions.Remove(sessionId);
            } else
            {
                throw new System.InvalidOperationException("The key "+ sessionId+" does not exist in recorded sessions" );
            }
        }
    }
}