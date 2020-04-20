using App.TalkCreation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Data.DataFetch.Dto
{
    public class QuizzDTO
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public String Name { get; set; }
        public ICollection<Question> Questions { get; set; }
    }
}
