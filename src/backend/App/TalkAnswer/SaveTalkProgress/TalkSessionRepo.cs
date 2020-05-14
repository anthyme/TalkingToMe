using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkAnswer.Models;

namespace App.TalkAnswer.SaveTalkProgress
{
    sealed class TalkSessionRepo
    {
        private static Dictionary<string, Session> Sessions = new Dictionary<string, Session>();
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

        public Session Get(string groupId)
        {
            try
            {
                Session session;
                Sessions.TryGetValue(groupId, out session);
                return session;
            }
            catch (Exception e)
            {
                return Session.Invalid;
            }
        }

        public void Update(string groupId, int quizzId)
        {
            try
            {
                if (Sessions.ContainsKey(groupId))
                {
                    Sessions[groupId].currentQuizz = quizzId;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("The session could not be updated");
            }
        }

        public void AddAnswers(string groupId, int quizzId, List<int> questIdList, List<string> answerList)
        {
            try
            {
                if (Sessions.ContainsKey(groupId))
                {
                    Dictionary<int, string> qADictTemp = new Dictionary<int, string>();
                    for (int i = 0; i < answerList.Count; i++)
                    {
                        qADictTemp.Add(questIdList[i], answerList[i]);
                    }
                        int allAnswrsIndx = Sessions[groupId].allAnswers.FindIndex(qA => qA.quizzId == quizzId);
                        if (allAnswrsIndx == -1)
                        {
                            List<Dictionary<int, string>> listAnswersTmp = new List<Dictionary<int, string>>();
                            listAnswersTmp.Add(qADictTemp);
                            Sessions[groupId].allAnswers.Add(new QuizzAnswers() { quizzId = quizzId, listAnswers = listAnswersTmp });
                        }
                        else
                        {
                            Sessions[groupId].allAnswers[allAnswrsIndx].listAnswers.Add(qADictTemp);
                        }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("The session could not be updated");
            }
        }
        public void Save(Session session)
        {
            try
            {
                Sessions.Add(session.groupid, session);
            }
            catch (Exception e)
            {
                Console.WriteLine("The session could not be added to the dictionnary");
            }
        }

        public void EndSession(string groupId)
        {
            if (Sessions.ContainsKey(groupId)) {
                Sessions.Remove(groupId);
            } else
            {
                throw new System.InvalidOperationException("The key "+ groupId + " does not exist in recorded sessions" );
            }
        }
    }
}