using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.Dto.QuizzResultsDTO
{
    public class QuizzResults
    {
        public int quizzId { get; set; }
        public List<QuestionResults> listQuestions { get; set; }
    }
}
