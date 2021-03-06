﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkAnswer.Dto;

namespace App.TalkAnswer.SaveTalkProgress
{
    public sealed class TalkSessionRepo
    {
        private static Dictionary<string, CurrentSession> Sessions = new Dictionary<string, CurrentSession>();

        public CurrentSession Get(string groupId)
        {
            try
            {
                CurrentSession currentSession;
                Sessions.TryGetValue(groupId, out currentSession);
                return currentSession;
            }
            catch (Exception e)
            {
                return CurrentSession.Invalid;
            }
        }

        public void Update(string groupId, int quizzId)
        {
            try
            {
                if (Sessions.ContainsKey(groupId))
                {
                    if (Sessions[groupId].currentQuizz == quizzId)
                    {
                        Sessions[groupId].currentQuizz = -1;
                    }
                    else
                    {
                        Sessions[groupId].currentQuizz = quizzId;
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("The session could not be updated");
            }
        }

        public void MuteUnmuteUser(string groupId, string userContext)
        {
            try
            {
                if (Sessions.ContainsKey(groupId))
                {
                    if (!Sessions[groupId].mutedUsers.Contains(userContext))
                    {
                        Sessions[groupId].mutedUsers.Add(userContext);
                    }
                    else
                    {
                        Sessions[groupId].mutedUsers.Remove(userContext);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("THe session you are trying to find has an error");
            }
        }

        public void AddAnswers(string groupId, int quizzId, List<int> questIdList, List<string> answerList)
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

        public void Save(CurrentSession currentSession)
        {
            try
            {
                Sessions.Add(currentSession.groupid, currentSession);
            }
            catch (Exception e)
            {
                Console.WriteLine("The session could not be added to the dictionnary");
            }
        }

        public void EndSession(string groupId)
        {
            if (Sessions.ContainsKey(groupId))
            {
                Sessions.Remove(groupId);
            }
            else
            {
                throw new System.InvalidOperationException("The key " + groupId + " does not exist in recorded sessions");
            }
        }
    }
}