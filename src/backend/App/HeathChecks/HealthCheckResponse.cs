using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.HeathChecks
{
    public class HealthCheckResponse
    {
        public string Status { get; set; }
        public IEnumerable<HealthCheck> Checks { get; set; }
        public TimeSpan Duration { get; set; }
    }
}
