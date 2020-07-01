using App.TalkAnswer.Dto;
using App.TalkCreation.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Models;
using Microsoft.EntityFrameworkCore;

namespace App.TalkCreation.Data.DataFetch
{
    public class SessionServiceFetch
    {
        readonly TalkContextFactory _talkContextFactory;
        private readonly TalksServiceFetch _talkServiceFetch;
        readonly SessionMapper _mapper;

        public SessionServiceFetch(TalkContextFactory talkContextFactory, TalksServiceFetch talkServiceFetch, SessionMapper mapper)
        {
            _talkContextFactory = talkContextFactory;
            _talkServiceFetch = talkServiceFetch;
            _mapper = mapper;
        }

        public async Task<List<SessionHistoryDTO>> returnSessionsByTalkId(int talkId)
        {
            using TalkContext context = _talkContextFactory.Create();
            var sessions = context.Sessions.Where(s => s.TalkId == talkId && s.EndDate != null)
                .OrderByDescending(s => s.StartDate).ToList();
            return _mapper.Map(sessions);
        }

        public async Task<SessionQuizzNChatDto> returnSessionAndChatById(int sessionId, string userId)
        {
            using TalkContext context = _talkContextFactory.Create();

            var session = context.Sessions.Where(s => s.Id == sessionId).FirstOrDefault();
            var talk = context.Talks.Where(t => t.Id == session.TalkId).FirstOrDefault(); ;
            if (talk.OwnerId == Convert.ToInt32(userId))
            {
                var talkNQuizzes = await _talkServiceFetch.getTalkAndQuizzes(talk.Id);
                SessionQuizzNChatDto sessionQuizzNChat = new SessionQuizzNChatDto
                {
                    Session = session,
                    Date = DateTime.Parse(session.StartDate),
                    TalkNQuizzes = talkNQuizzes,
                };

                return sessionQuizzNChat;
            }
            return null;
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
                    if (timeDiff.Seconds >= 1)
                    {
                        tempSession.TimeLasted += timeDiff.Seconds.ToString();
                        tempSession.TimeLasted += timeDiff.Seconds == 1 ? " second " : " seconds";
                    }
                }
                sessionDTOs.Add(tempSession);
            }
            return sessionDTOs;
        }
    }
}
