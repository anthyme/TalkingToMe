using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class QuizzToQuestion
    {
        public int Id { get; set; }
        public int QuizzId { get; set; }
        public Quizz Quizz { get; set; }
        public int QuestionId { get; set; }
        public Question Question { get; set; }
    }
}
