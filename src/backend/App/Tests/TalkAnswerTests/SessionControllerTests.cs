using App.TalkAnswer.Dto;
using App.TalkCreation.Context;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataPost;
using App.Tests.Infrastructure;
using FluentAssertions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace App.Tests.TalkAnswerTests
{
    public class SessionControllerTests : IDisposable
    {
        TalkContextFactory _talkContextFactory;
        SessionServiceFetch _sessionServiceFetch;
        SessionServicePost _sessionServicePost;

        public SessionControllerTests()
        {
            var bootstrapper = new TestBootstrapper().Start();
            _talkContextFactory = bootstrapper.TalkContextFactory;
            _sessionServiceFetch = bootstrapper.SessionServiceFetch;
            _sessionServicePost = bootstrapper.SessionServicePost;
        }

        [Fact]
        public async void ReturnSessionsByTalkId()
        {
            var sessionHistoryDtos = await _sessionServiceFetch.returnSessionsByTalkId(1);
            sessionHistoryDtos[0].Should().BeEquivalentTo(
            new SessionHistoryDTO
            {
                Id = 1,
                StartDate = new DateTime(2020, 1, 1, 1, 0, 0),
                TimeLasted = "30 minutes "
            });
        }

        public void Dispose()
        {

        }
    }
}
