using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.Dto
{
    public class SessionHistoryDTO
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public String TimeLasted { get; set; }
    }
}
