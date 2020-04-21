using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkCreation.Context
{

    public class TalkContextFactory
    {
        private IConfiguration _configuration;
        private string _connectionString;
        private readonly ILogger<TalkContextFactory> log;
        public TalkContextFactory(IConfiguration configuration, ILogger<TalkContextFactory> log)
        {
            this._connectionString = configuration.GetConnectionString("DBString");
            _configuration = configuration;
            this.log = log;
        }
        public TalkService create()
        {
            string _connectionString = _configuration.GetConnectionString("DBString");
            var optionsBuilder = new DbContextOptionsBuilder<TalkService>();
            optionsBuilder.UseSqlServer(_connectionString);
            var context = new TalkService(optionsBuilder.Options);
            return context;
        }

    }
}
