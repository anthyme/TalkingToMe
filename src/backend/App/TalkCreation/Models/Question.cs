using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int QuizzID { get; set; }
        public Quizz Quizz { get; set; }
        public String Quest { get; set; }
        public String Type { get; set; }
        List<String> Answers { get; set; }
        String CorrectAn { get; set; }
        //public Object Presentation { get; set; }


    }
}
