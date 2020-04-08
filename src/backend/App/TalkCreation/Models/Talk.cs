using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class Talk
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public String Name { get; set; }
        public String Url { get; set; }
        //public Object Presentation { get; set; }

        public List<QuizzToTalk> Quizzes { get; set; }

        public String Description { get; set; }
    }
}
