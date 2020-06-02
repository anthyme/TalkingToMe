using App.TalkAnswer.Dto;
using App.TalkCreation.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Models;

namespace App.TalkCreation.Data.DataFetch
{
    public class SessionServiceFetch
    {
        readonly TalkContextFactory _talkContextFactory;
        readonly SessionMapper _mapper;

        public SessionServiceFetch(TalkContextFactory talkContextFactory, SessionMapper mapper)
        {
            _talkContextFactory = talkContextFactory;
            _mapper = mapper;
        }

        public async Task<List<SessionHistoryDTO>> returnSessionsByTalkId(int talkId)
        {
            using TalkContext context = _talkContextFactory.Create();
            var sessions = context.Sessions.Where(s => s.TalkId == talkId && s.EndDate != null)
                .OrderByDescending(s => s.StartDate).ToList();
            return _mapper.Map(sessions);
        }
    }

    public class SessionMapper
    {
        public List<SessionHistoryDTO> Map(List<Session> sessions)
        {
            var sessionDTOs = new List<SessionHistoryDTO>();
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
