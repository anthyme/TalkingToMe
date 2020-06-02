using Microsoft.EntityFrameworkCore;

namespace App.TalkCreation.Context
{
    public class TalkContextFactory
    {
        readonly string _connectionString;

        public TalkContextFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public TalkContext Create()
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkContext>()
                .UseSqlServer(_connectionString);
            return new TalkContext(optionsBuilder.Options);
        }
    }
}
