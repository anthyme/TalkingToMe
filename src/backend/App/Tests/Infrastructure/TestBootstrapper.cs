using App.TalkAnswer.SaveTalkProgress;
using App.TalkCreation.Context;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataPost;
using Microsoft.Extensions.Configuration;
using System;

namespace App.Tests.Infrastructure
{
    class TestBootstrapper
    {
        public QuizzServiceFetch QuizzServiceFetch { get; private set; }
        public SessionServiceFetch SessionServiceFetch { get; private set; }
        public TalksServicePost TalksServicePost { get; private set; }
        public TalksServiceFetch TalksServiceFetch { get; set; }
        public TalkContextFactory TalkContextFactory { get; set; }
        public QuestionServiceFetch QuestionServiceFetch { get; set; }
        public TestBootstrapper Start()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var configuration = configurationBuilder.AddJsonFile("appsettings.json").Build();
            var talkSessionRepo = new TalkSessionRepo();
            var sessionMapper = new SessionMapper();
            var talkContextFactoryTest = new TalkContextFactory(configuration.GetConnectionString("DBString"));
            TalkContextFactory = talkContextFactoryTest;
            QuizzServiceFetch = new QuizzServiceFetch(talkContextFactoryTest);
            SessionServiceFetch = new SessionServiceFetch(talkContextFactoryTest, sessionMapper);
            TalksServicePost = new TalksServicePost(talkContextFactoryTest, talkSessionRepo);
            TalksServiceFetch = new TalksServiceFetch(talkContextFactoryTest);
            QuestionServiceFetch = new QuestionServiceFetch(talkContextFactoryTest);
            return this;
        }
    }
}