using Microsoft.EntityFrameworkCore;

namespace App.TalkCreation.Context
{
    public class TalkContextFactory
    {
        protected readonly string _connectionString;

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
    public class TalkContextFactoryTest : TalkContextFactory
    {
        public TalkContextFactoryTest(string connectionString
                   ) : base(connectionString) { }
        
        public TalkContext Create()
        {
            var optionsBuilder = new DbContextOptionsBuilder<TalkContext>()
                .UseInMemoryDatabase("In_mem")
                .UseSqlServer(_connectionString);
            return new TalkContext(optionsBuilder.Options);
        }
    }
}
