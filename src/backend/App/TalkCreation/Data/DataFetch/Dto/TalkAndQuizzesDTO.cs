using App.TalkCreation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Data.DataFetch.Dto
{
    public class TalkAndQuizzesDTO
    {
        public int idTalk { get; set; }
        public String talkName { get; set; }
        public String talkUrl { get; set; }
        public List<Quizz> Quizzes { get; set; }
    }
}
