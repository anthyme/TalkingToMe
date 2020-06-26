using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class UserQuestion
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Question { get; set; }
        public int Upvotes { get; set; }
        public int SessionId { get; set; }
        public string Date { get; set; }
        public Session Session { get; set; }

        public string UserContext { get; set; }
    }
}
