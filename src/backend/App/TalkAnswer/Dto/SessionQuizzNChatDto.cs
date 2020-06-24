using App.TalkCreation.Data.DataFetch.Dto;
using App.TalkCreation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.Dto
{
    public class SessionQuizzNChatDto
    {
        public TalkAndQuizzesDTO TalkNQuizzes { get; set; }
        public Session Session { get; set; }
        public DateTime Date { get; set; }
        public UserQuestion UserQuestions {get; set;}
    }
}
