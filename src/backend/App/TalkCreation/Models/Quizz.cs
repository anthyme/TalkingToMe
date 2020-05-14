using App.TalkAnswer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class Quizz
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
#nullable enable
        public List<QuizzToTalk>? Talks { get; set; }
        public List<SessionToQuizz>? Sessions { get; set; }
#nullable disable
        public String Name { get; set; }
        public ICollection<Question> Questions { get; set; }

    }
}
