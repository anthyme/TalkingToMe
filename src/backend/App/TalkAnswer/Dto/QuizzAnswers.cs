using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.Dto
{
    public class QuizzAnswers
    {
        public int quizzId { get; set; }
        public List<Dictionary<int, string>> listAnswers { get; set;}
    }
}
