using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.SaveTalkProgress
{
    public class Session: Value
    {
        public string groupid { get; }
        public int currentQuizz { get; }

        public Session(string Groupid, int CurrentQuizz)
        {
            groupid = Groupid;
            currentQuizz = CurrentQuizz;
        }

        protected bool Equals(Session other)
        {
            return groupid == other.groupid
                   && currentQuizz == other.currentQuizz;
        }

        public override bool Equals(object? obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((Session)obj);
        }
       public override int GetHashCode()
        {
            return HashCode.Combine(groupid, currentQuizz);
        }
        public static readonly Session Invalid = new Session("Invalid", -1);
        public static Session Add(Session other)
        {
            if (other.groupid == "-1"
                || other.Equals(Invalid))
                return Session.Invalid;
            return new Session(other.groupid, other.currentQuizz);
        }
    }
}
