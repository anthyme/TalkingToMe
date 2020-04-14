using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Data
{
    public class TalksService
    {
        private IConfiguration configuration;
        private string _connectionString;
        public TalksService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBString");
        }
    }
}
