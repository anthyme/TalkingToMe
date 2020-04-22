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
        string _connectionString;
        public TalkContextFactory(string connectionString)
        {
            _connectionString = connectionString;
        }
        public TalkContext create()
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkContext>();
            optionsBuilder.UseSqlServer(_connectionString);
            var context = new TalkContext(optionsBuilder.Options);
            return context;
        }

    }
}
