using App.TalkAnswer.SaveTalkProgress;
using App.TalkCreation.Context;
using App.TalkCreation.Data;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataPost;
using App.TalkCreation.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;

namespace App.Tests.Infrastructure
{
    class TestBootstrapper
    {
        public QuizzServiceFetch QuizzServiceFetch { get; private set; }
        public QuizzServicePost QuizzServicePost { get; private set; }
        public SessionServiceFetch SessionServiceFetch { get; private set; }
        public SessionServicePost SessionServicePost { get; private set; }
        public TalksServicePost TalksServicePost { get; private set; }
        public TalksServiceFetch TalksServiceFetch { get; set; }
        public TalkContextFactory TalkContextFactory { get; set; }
        public QuestionServiceFetch QuestionServiceFetch { get; set; }
        public UserServiceFetch UserServiceFetch { get; set; }
        public UserServicePost UserServicePost { get; set; }
        public TalkSessionRepo TalkSessionRepo { get; set; }
        public TestBootstrapper Start()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var configuration = configurationBuilder.AddJsonFile("appsettings.json").Build();
            var talkSessionRepo = new TalkSessionRepo();
            ILoggerFactory loggerFactory = new LoggerFactory();
            ILogger<TalksController> loggerTalks = loggerFactory.CreateLogger<TalksController>();
            ILogger<QuizzServicePost> loggerQuizz = loggerFactory.CreateLogger<QuizzServicePost>();
            var sessionMapper = new SessionMapper();
            var talkContextFactoryTest = new TalkContextFactory(configuration.GetConnectionString("DBString"));
            TalkContextFactory = talkContextFactoryTest;
            TalkSessionRepo = talkSessionRepo;
            QuizzServiceFetch = new QuizzServiceFetch(talkContextFactoryTest);
            SessionServiceFetch = new SessionServiceFetch(talkContextFactoryTest, sessionMapper);
            SessionServicePost = new SessionServicePost(talkContextFactoryTest);
            TalksServicePost = new TalksServicePost(talkContextFactoryTest, talkSessionRepo);
            TalksServiceFetch = new TalksServiceFetch(talkContextFactoryTest);
            UserServicePost = new UserServicePost(talkContextFactoryTest, talkSessionRepo);
            UserServiceFetch = new UserServiceFetch(loggerTalks, talkContextFactoryTest, talkSessionRepo);
            QuizzServicePost = new QuizzServicePost(loggerQuizz, talkContextFactoryTest);
            QuestionServiceFetch = new QuestionServiceFetch(talkContextFactoryTest);
            return this;
        }
    }
}