using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class QuizzToTalk
    {
        public int Id { get; set; }
        public int TalkId { get; set; }
        public Talk Talk { get; set; }
        public int QuizzId {get; set;}
        public Quizz Quizz { get; set; }
    }
}
