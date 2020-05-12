using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.SaveTalkProgress
{
    sealed class TalkSessionRepo
    {
        private static Dictionary<long, Session> Sessions { get; }
        private static readonly object padlock = new object();
        private static TalkSessionRepo instance= null;
        TalkSessionRepo()
        {
        }
        public static TalkSessionRepo Instance
        {
            get
            {
                lock (padlock)
                {
                    if (instance == null)
                    {
                        instance = new TalkSessionRepo();
                    }
                    return instance;
                }
            }
        }
        public Session Get(long sessionId)
        {
            return Sessions[sessionId];
        }
        public void Save(Session session)
        {
            Sessions[session.groupid] = session;
        }

        public void EndSession(long sessionId)
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