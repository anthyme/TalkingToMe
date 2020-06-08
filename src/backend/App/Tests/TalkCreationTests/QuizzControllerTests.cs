using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataPost;
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
using Newtonsoft.Json.Linq;

namespace App.Tests.TalkCreationTests
{
    public class QuizzControllerTests
    {
        QuizzServiceFetch _quizzServiceFetch;
        QuizzServicePost _quizzServicePost;
        TalkContextFactory _talkContextFactory;

        public QuizzControllerTests()
        {
            var bootstrap = new TestBootstrapper().Start();
            _quizzServiceFetch = bootstrap.QuizzServiceFetch;
            _talkContextFactory = bootstrap.TalkContextFactory;
            _quizzServicePost = bootstrap.QuizzServicePost;
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
                    OwnerId=1,
                },
            }, x=>x.Excluding(x=>x.Questions));
        }

        [Fact]
        public async Task ReturnQuizzByTalkIdTest()
        {
            List<String> results = await _quizzServiceFetch.returnQuizzByTalkId(1);
            List<String> testResults = new List<String>();
            testResults.Add("1");
            results.Should().BeEquivalentTo(testResults);
        }

        [Fact]
        public void AddNewQuizzToTalkTest()
        {
            dynamic quizzJArray = new JArray();
            dynamic questionObject = new JObject();
            dynamic generalInfoObject = new JObject();
            var selectedValue = new JObject();
            selectedValue.Add("selectedValue", "Test");
            questionObject.question= selectedValue;
            
            var type = new JObject();
            type.Add("selectedValue", "UCQ");
            questionObject.type= type;

            dynamic answers = new JObject();
            dynamic answersList = new JArray();
            answersList.Add("Test1");
            answersList.Add("Test2");
            answers.answers = answersList;
            questionObject.answers= answers;
            
            var rightAnswer = new JObject();
            rightAnswer.Add("value", "Test1");
            questionObject.rightAnswer=rightAnswer;
            
            var isNew = new JObject();
            isNew.Add("isNew", "true");
            questionObject.New=isNew;

            var questionId = new JObject();
            questionId.Add("questionId", "0");
            questionObject.questionId= questionId;

            var name = new JObject();
            name.Add("quizzName", "Test");
            generalInfoObject.Name=name;

            var ownerId = new JObject();
            ownerId.Add("userId", "0");
            generalInfoObject.OwnerId=ownerId;

            quizzJArray.Add(questionObject);
            quizzJArray.Add(generalInfoObject);
   
            int results = _quizzServicePost.AddNewQuizzToTalk(quizzJArray);
            results.Should().NotBe(-1);
            var context = _talkContextFactory.Create();
            var quizz = context.Quizzes.Find(results);
            context.Quizzes.Remove(quizz);
            context.SaveChanges();
        }

        [Fact]
        public void updateQuizztest()
        {
            dynamic quizzJArray = new JArray();
            dynamic questionObject = new JObject();
            dynamic generalInfoObject = new JObject();
            var selectedValue = new JObject();
            selectedValue.Add("questionValue", "Test");
            questionObject.question = selectedValue;

            var type = new JObject();
            type.Add("selectedValue", "UCQ");
            questionObject.type = type;

            dynamic answers = new JObject();
            dynamic answersList = new JArray();
            answersList.Add("Test");
            answersList.Add("Test2");
            answers.answers = answersList;
            questionObject.answers = answers;

            var rightAnswer = new JObject();
            rightAnswer.Add("value", "Test");
            questionObject.rightAnswer = rightAnswer;

            var isNew = new JObject();
            isNew.Add("isNew", "false");
            questionObject.New = isNew;

            var questionId = new JObject();
            questionId.Add("questionId", "1");
            questionObject.questionId = questionId;

            var name = new JObject();
            name.Add("name", "Test");
            generalInfoObject.Name = name;

            var quizzId = new JObject();
            quizzId.Add("quizzId", "1");
            generalInfoObject.id = quizzId;

            quizzJArray.Add(questionObject);
            quizzJArray.Add(generalInfoObject);

            string results = _quizzServicePost.updateQuizz(quizzJArray);
            results.Should().BeEquivalentTo("{\"response\":\"Success\"}");
        }


        [Fact]
        public void changeTalksToQuizzTest()
        {
            dynamic quizzJArray = new JArray();
            dynamic TalkToQuizzObject = new JObject();
            
            var quizzId = new JObject();
            quizzId.Add("quizzId", "1");
            TalkToQuizzObject.quizzId = quizzId;

            dynamic selectedTalks = new JObject();
            dynamic selectedTalksList = new JArray();
            selectedTalks.selectedTalks = selectedTalksList;
            TalkToQuizzObject.selectedTalks = selectedTalks;

            dynamic oldTalks = new JObject();
            dynamic oldTalksList = new JArray();
            oldTalksList.Add("1");
            oldTalks.oldTalks = oldTalksList;
            TalkToQuizzObject.oldTalks = oldTalks;
            
            quizzJArray.Add(TalkToQuizzObject);

            var exception = Record.Exception(() => _quizzServicePost.changeTalksToQuizz(quizzJArray));
            Assert.NotNull(exception);

            dynamic quizzJArray2 = new JArray();
            dynamic TalkToQuizzObject2 = new JObject();

            var quizzId2 = new JObject();
            quizzId2.Add("quizzId", "1");
            TalkToQuizzObject2.quizzId = quizzId2;


            dynamic selectedTalks2 = new JObject();
            dynamic selectedTalksList2 = new JArray();
            selectedTalksList2.Add("1");
            selectedTalks2.selectedTalks = selectedTalksList2;
            TalkToQuizzObject2.selectedTalks = selectedTalks2;

            dynamic oldTalks2 = new JObject();
            dynamic oldTalksList2 = new JArray();
            oldTalks2.oldTalks = oldTalksList2;
            TalkToQuizzObject2.oldTalks = oldTalks2;

            quizzJArray2.Add(TalkToQuizzObject2);
            var exception2 = Record.Exception(() => _quizzServicePost.changeTalksToQuizz(quizzJArray2));
            Assert.NotNull(exception2);
        }
    }
}