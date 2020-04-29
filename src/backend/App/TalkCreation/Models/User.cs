using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Models
{
    public class User
    {
        public int Id { get; set; }
        public String Email {get; set; }
        public String DisplayName { get; set; }
        public int UserId { get; set; }
        public String ExternalId { get; set; }
        public String Service { get; set; }
    }
}
