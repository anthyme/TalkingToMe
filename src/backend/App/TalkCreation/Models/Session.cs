using System;
using System.Collections.Generic;

namespace App.TalkCreation.Models
{
    public class Session
    {
        public int Id { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string groupId { get; set; }
        public int TalkId { get; set; }

#nullable enable
        public List<UserAnswer>? UserAnswers { get; set; }
        public List<UserQuestion>? UserQuestions { get; set; }
        public List<SessionToQuizz>? Quizzes { get; set; }
#nullable disable
    }
}
