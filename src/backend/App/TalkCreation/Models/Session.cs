using App.TalkCreation.Models;
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
        public String groupId { get; set; }

#nullable enable
        public List<UserAnswer>? UserAnswers { get; set; }
        public List<UserQuestion>? UserQuestions { get; set; }
        public List<SessionToQuizz>? Quizzes { get; set; }
#nullable disable
    }
}
