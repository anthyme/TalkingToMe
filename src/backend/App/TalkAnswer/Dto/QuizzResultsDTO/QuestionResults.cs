using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.Dto.QuizzResultsDTO
{
    public class QuestionResults
    {
        public int questionId { get; set; }
        public string type { get; set; }
        public List<AnswerResults> listAnswers { get; set; }
    }
}