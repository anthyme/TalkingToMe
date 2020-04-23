using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Data.DataFetch.Dto
{
    public class QuestionDto
    {
        public int Id { get; set; }
        public List<string> Answers { get; set; }
        public string CorrectAn { get; set; }
        public string Type { get; set; }
        public string Question { get; set; }
    }
}
