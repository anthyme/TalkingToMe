using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class Quizz
    {
        public int Id { get; set; }
        public int TalkId { get; set; }
        public QuizzToTalk Talk { get; set; }
        public String Name { get; set; }
        List<String> Questions { get; set; }
        List<String> Answers { get; set; }
        //public Object Presentation { get; set; }


    }
}