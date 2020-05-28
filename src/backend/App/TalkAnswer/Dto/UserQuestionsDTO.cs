using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.Dto
{
    public class UserQuestionsDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Question { get; set; }
        public int Upvotes { get; set; }
        public int SessionId { get; set; }
        public string Date { get; set; }
    }
}
