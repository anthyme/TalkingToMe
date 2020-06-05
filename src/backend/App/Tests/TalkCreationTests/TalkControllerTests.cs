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
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.Office2010.Excel;

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
        public async void ReturnTalkAndQuizzesById()
        {
            var talkNQuizzes = await _talksServiceFetch.getTalkAndQuizzes(1);
            talkNQuizzes.Should().BeEquivalentTo(
            new TalkAndQuizzesDTO
            {
                idTalk = 1,
                talkName = "Test",
                Quizzes = new List<Quizz> { new Quizz() { Id = 1, Name = "Test" } }
            });
        }

        [Fact]
        public async void ReturnTalksByQuizzId()
        {
            var talkIds = await _talksServiceFetch.returnTalksByQuizzId(1);
            talkIds[0].Should().BeEquivalentTo("1");
        }

        [Fact]
        public async void ReturnTalksByUserId()
        {
            var talks = await _talksServiceFetch.getTalksByUserId(1);
            talks.Should().BeEquivalentTo(
            new Talk
            {
                Id = 1,
                OwnerId = 1,
                Name = "Test",
                Description = "Test"
            });
        }

        [Fact]
        public async void ShouldCreateAndDeleteTalk()
        {
            var tempJson = "[{\"description\":{},\"name\":{\"name\":\"talkToTest\"},\"ownerId\":{\"userIdRdx\":0}}]";
            var parsedTempJson = JArray.Parse(tempJson);
            int tempTalkId = _talksServicePost.AddNewTalk(parsedTempJson);
            var tempTalk = await _talksServiceFetch.getTalkAndQuizzes(tempTalkId);
            Assert.NotNull(tempTalk);
            await _talksServicePost.deleteTalk(tempTalkId);
            tempTalk = await _talksServiceFetch.getTalkAndQuizzes(tempTalkId);
            tempTalk.Should().BeNull();
        }

        [Fact]
        public void ThrowDeleteTalkId()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await _talksServicePost.deleteTalk(-1));
        }

        [Fact]
        public void ThrowCreateTalk()
        {
            var newTalk = "[{\"description\":{\"description\":\"test\"}}]";
            var parsedTalk = JArray.Parse(newTalk);
            Assert.ThrowsAsync<Exception>(async () => _talksServicePost.AddNewTalk(parsedTalk).ToString());
        }

        [Fact]
        public async Task ShouldDeleteAndCreateQuizzToTalk()
        {
            //Delete quizzToTalk link
            var tempJson = "[{\"id\":{\"id\":1},\"name\":{\"name\":\"Test\"},\"description\":{\"description\":\"Test\"},\"selectedQuizzes\":{\"selectedQuizzes\":[]},\"oldQuizzes\":{\"oldQuizzes\":[\"1\"]}}]";
            var parsedTempJson = JArray.Parse(tempJson);
            _talksServicePost.ChangeTalk(parsedTempJson);
            var quizzesToTalks = await _talksServiceFetch.returnTalksByQuizzId(1);
            quizzesToTalks.Count().Should().Equals(0);

            //Create quizzToTalk link
            tempJson = "[{\"id\":{\"id\":1},\"name\":{\"name\":\"Test\"},\"description\":{\"description\":\"Test\"},\"selectedQuizzes\":{\"selectedQuizzes\":[\"1\"]},\"oldQuizzes\":{\"oldQuizzes\":[]}}]";
            parsedTempJson = JArray.Parse(tempJson);
            _talksServicePost.ChangeTalk(parsedTempJson);
            quizzesToTalks = await _talksServiceFetch.returnTalksByQuizzId(1);
            quizzesToTalks.Count().Should().Equals(1);
        }

        [Fact]
        public async Task ShouldChangeTalkUrl()
        {
            //Delete quizzToTalk link
            var tempJson = "[{\"url\":\"Test\"}]";
            var parsedTempJson = JArray.Parse(tempJson);
            _talksServicePost.ChangeTalkUrl(parsedTempJson, 1);
            var talkNQuizzes = await _talksServiceFetch.getTalkAndQuizzes(1);
            talkNQuizzes.Should().BeEquivalentTo(
            new TalkAndQuizzesDTO
            {
                idTalk = 1,
                talkName = "Test",
                talkUrl = "Test"
            }, x => x.Excluding(x => x.Quizzes));
            tempJson = "[{\"url\":\"NULL\"}]";
            parsedTempJson = JArray.Parse(tempJson);
            _talksServicePost.ChangeTalkUrl(parsedTempJson, 1);
        }

        public void Dispose()
        {
            //delete talk id 1 dans la table
        }
    }
}
