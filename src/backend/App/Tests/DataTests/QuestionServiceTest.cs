using App.TalkAnswer.Dto;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataFetch.Dto;
using App.TalkCreation.Models;
using App.Tests.Infrastructure;
using FluentAssertions;
using System;
using System.Collections.Generic;
using Xunit;

namespace App.Tests.DataTests
{
    public class QuestionServiceTest
    {
        QuestionServiceFetch _questionServiceFetch;
        public QuestionServiceTest()
        {
            var bootstrap = new TestBootstrapper().Start();
            _questionServiceFetch = bootstrap.QuestionServiceFetch;
        }
        [Fact]
        public async void GetQuestionByQuizzId()
        {
            List<Question> questionList = await _questionServiceFetch.GetQuestionsByQuizzId(1);
        }

        [Fact]
        public async void GetQuestionsDtoByQuizzId()
        {
            List<QuestionDto> questionList = await _questionServiceFetch.GetQuestionsDtoByQuizzId(1);
            questionList.Should().BeEquivalentTo(new[]
           {
            new QuestionDto
            {
                Id = 1,
                Question = "Test",
                CorrectAn = "Test",
                Type = "UCQ"
            }, 
        },x => x.Excluding(x => x.Answers));
        }
    }
}
