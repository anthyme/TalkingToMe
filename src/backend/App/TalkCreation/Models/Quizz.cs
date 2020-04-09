using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class Quizz
    {
        public int Id { get; set; }
#nullable enable
        public List<QuizzToTalk>? Talks { get; set; }
#nullable disable
        public String Name { get; set; }
        public List<QuizzToQuestion> Questions { get; set; }

    }
}
