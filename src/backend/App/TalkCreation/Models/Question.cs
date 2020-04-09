using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class Question
    {
        public int Id { get; set; }
#nullable enable
        public QuizzToQuestion? Quizz { get; set; }
#nullable disable
        public String Quest { get; set; }
        public String Type { get; set; }
        public String Answers { get; set; }
        public String CorrectAn { get; set; }
        //public Object Presentation { get; set; }


    }
}
