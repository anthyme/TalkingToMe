using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkAnswer.Dto;

namespace App.TalkAnswer.SaveTalkProgress
{
    public class CurrentSession : Value
    {
        public string groupid { get; }
        public int currentQuizz { get; set; }
        public DateTime startDate { get; set; }
        public List<QuizzAnswers> allAnswers { get; set; }

        public CurrentSession(string Groupid, int CurrentQuizz, DateTime StartDate, List<QuizzAnswers> AllAnswers)
        {
            groupid = Groupid;
            currentQuizz = CurrentQuizz;
            startDate = StartDate;
            allAnswers = AllAnswers;
        }

        protected bool Equals(CurrentSession other)
        {
            return groupid == other.groupid
                   && currentQuizz == other.currentQuizz;
        }

        public override bool Equals(object? obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((CurrentSession)obj);
        }
        public override int GetHashCode()
        {
            return HashCode.Combine(groupid, currentQuizz);
        }
        public static readonly CurrentSession Invalid = new CurrentSession("Invalid", -1,new DateTime(), null);
        public static CurrentSession Add(CurrentSession other)
        {
            if (other.groupid == "-1"
                || other.Equals(Invalid))
                return CurrentSession.Invalid;
            return new CurrentSession(other.groupid, other.currentQuizz, other.startDate, other.allAnswers);
        }
    }
}
