using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.SaveTalkProgress
{
    public class Session: Value
    {
        public long groupid { get; }
        public string currentQuizz { get; }

        public Session(long Groupid, string CurrentQuizz)
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
        public static readonly Session Invalid = new Session(-1, "Invalid");
        public static Session Add(Session other)
        {
            if (other.groupid == -1
                || other.Equals(Invalid))
                return Session.Invalid;
            return new Session(other.groupid, other.currentQuizz);
        }
    }
}
