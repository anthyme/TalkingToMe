using App.TalkCreation.Data.DataFetch;
using System;
using System.Threading.Tasks;
using App.Tests.Infrastructure;
using Xunit;
using App.TalkCreation.Data.DataFetch.Dto;
using System.Collections.Generic;
using FluentAssertions;
using App.TalkCreation.Context;
using App.TalkCreation.Models;
using Microsoft.Extensions.Configuration;

namespace App.Tests.TalkCreationTests
{
    public class QuizzControllerTests
    {
        QuizzServiceFetch _quizzServiceFetch;
        TalkContextFactory _talkContextFactory;

        public QuizzControllerTests()
        {
            var bootstrap = new TestBootstrapper().Start();
            _quizzServiceFetch = bootstrap.QuizzServiceFetch;
            _talkContextFactory = bootstrap.TalkContextFactory;
        }

        [Fact]
        public void ThrowQuizzId()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await _quizzServiceFetch.returnQuizzById(-1));
        }

        [Fact]
        public void ThrowReturnQuizzById()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(
                async () => await _quizzServiceFetch.returnQuizzByUserId(-1));
        }

        [Fact]
        public async Task ReturnQuizzByUserIdAsync()
        {
            List<QuizzDTO> result = await _quizzServiceFetch.returnQuizzByUserId(1);
            result.Should().BeEquivalentTo(new[]
            {
                new QuizzDTO
                {
                    Id = 1,
                    Name="Test",
                },
            });
        }

        [Fact]
        public async Task ReturnQuizzByTalkIdTest()
        {
            List<String> results = await _quizzServiceFetch.returnQuizzByTalkId(1);
            List<String> testResults = new List<String>();
            testResults.Add("1");
            results.Should().BeEquivalentTo(testResults);
        }
    }
}