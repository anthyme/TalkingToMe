using App.TalkAnswer.SaveTalkProgress;
using App.TalkCreation.Context;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataPost;
using Microsoft.Extensions.Configuration;

namespace App.Tests.Infrastructure
{
    class TestBootstrapper
    {
        public QuizzServiceFetch QuizzServiceFetch { get; private set; }
        public SessionServiceFetch SessionServiceFetch { get; private set; }
        public TalksServicePost TalksServicePost { get; private set; }
        public TalksServiceFetch TalksServiceFetch { get; set; }

        public TestBootstrapper Start()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var configuration = configurationBuilder.Build();
            var talkSessionRepo = new TalkSessionRepo();
            var sessionMapper = new SessionMapper();
            var talkContextFactory = new TalkContextFactory(configuration.GetConnectionString("DBString"));
            QuizzServiceFetch = new QuizzServiceFetch(talkContextFactory);
            SessionServiceFetch = new SessionServiceFetch(talkContextFactory, sessionMapper);
            TalksServicePost = new TalksServicePost(talkContextFactory, talkSessionRepo);
            TalksServiceFetch = new TalksServiceFetch(talkContextFactory);
            return this;
        }
    }
}