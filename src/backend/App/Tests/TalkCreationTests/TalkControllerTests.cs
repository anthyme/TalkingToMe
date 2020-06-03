using App.TalkCreation.Context;
using App.TalkCreation.Data;
using App.TalkCreation.Data.DataPost;
using App.TalkCreation.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataFetch.Dto;
using App.Tests.Infrastructure;
using FluentAssertions;
using Xunit;

namespace App.Tests.TalkCreationTests
{
    public class TalkControllerTests : IDisposable
    {
        TalksServiceFetch _talksServiceFetch;
        TalksServicePost _talksServicePost;
        TalkContextFactory _talkContextFactory;

        public TalkControllerTests()
        {
            var bootstrapper = new TestBootstrapper().Start();
            _talksServiceFetch = bootstrapper.TalksServiceFetch;
            _talksServicePost = bootstrapper.TalksServicePost;
            _talkContextFactory = bootstrapper.TalkContextFactory;
        }

        [Fact]
        public void ThrowTalkId()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await _talksServiceFetch.getTalkAndQuizzes(-1));
        }

        [Fact]
        public async Task PassTalkId()
        {
            //act
            var result = await _talksServiceFetch.getTalkAndQuizzes(1);
            //assert
            result.Should().BeEquivalentTo(new TalkAndQuizzesDTO
            {
                talkName = "Test",
                talkUrl = null,
            }, x => x.Excluding(x=> x.Quizzes).Excluding(x => x.idTalk));

        }

        [Fact]
        public void ThrowDeleteTalkId()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await _talksServiceFetch.deleteTalk(-1));
        }

        [Fact]
        public void ThrowCreateTalk()
        {
            var newTalk = "[{\"description\":{\"description\":\"test\"}}]";
            var parsedTalk = JArray.Parse(newTalk);
            Assert.ThrowsAsync<Exception>(async () => _talksServicePost.AddNewTalk(parsedTalk).ToString());
        }

        public void Dispose()
        {
            //delete talk id 1 dans la table
        }
    }
}
