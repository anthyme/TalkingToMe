using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int QuizzId { get; set; }
        public Quizz Quizz { get; set; }
        public String Quest { get; set; }
        public String Type { get; set; }
        public ICollection<Answer> Answers { get; set; }
        public String CorrectAn { get; set; }


    }
}
