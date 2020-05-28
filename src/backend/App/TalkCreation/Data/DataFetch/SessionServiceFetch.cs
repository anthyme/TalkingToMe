using App.TalkAnswer.Dto;
using App.TalkAnswer.Models;
using App.TalkCreation.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Data.DataFetch
{
    public class SessionServiceFetch
    {
        private string _connectionString;
        public SessionServiceFetch(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }

        public async Task<List<SessionHistoryDTO>> returnSessionsByTalkId(int talkId)
        {
            TalkContextFactory talkFactory = new TalkContextFactory(_connectionString);
            using TalkContext context = talkFactory.create();
            var sessions = context.Sessions.Where(s => s.TalkId == talkId && s.EndDate != null).OrderByDescending(s => s.StartDate).ToList();
            List<SessionHistoryDTO> sessionDTOs = new List<SessionHistoryDTO>();
            foreach (Session session in sessions)
            {
                SessionHistoryDTO tempSession = new SessionHistoryDTO();
                tempSession.Id = session.Id;
                tempSession.StartDate = DateTime.Parse(session.StartDate);
                tempSession.TimeLasted = "";
                TimeSpan timeDiff = DateTime.Parse(session.EndDate) - tempSession.StartDate;
                if (timeDiff.Days >= 1)
                {
                    tempSession.TimeLasted = "1 day or more";
                }
                else
                {
                    if (timeDiff.Hours >= 1)
                    {
                        tempSession.TimeLasted += timeDiff.Hours.ToString();
                        tempSession.TimeLasted += timeDiff.Hours == 1 ? " hour " : " hours ";
                    }
                    if (timeDiff.Minutes >= 1)
                    {
                        tempSession.TimeLasted += timeDiff.Minutes.ToString();
                        tempSession.TimeLasted += timeDiff.Minutes == 1 ? " minute " : " minutes ";
                    }
                    tempSession.TimeLasted += timeDiff.Seconds.ToString();
                    tempSession.TimeLasted += timeDiff.Seconds == 1 ? " second " : " seconds";
                }
                sessionDTOs.Add(tempSession);
            }
            return sessionDTOs;
        }
    }
}
