using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.Models
{
    public class Session
    {
        public int Id { get; set; }
        public String StartDate { get; set; }
        public String EndDate { get; set; }
#nullable enable
        public List<SessionToQuizz>? Quizzes { get; set; }
#nullable disable
    }
}
