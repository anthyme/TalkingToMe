using App.Tests.Infrastructure;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataPost;
using Xunit;
using FluentAssertions;
using App.TalkAnswer.Dto;
using System.Collections.Generic;
using App.TalkAnswer.SaveTalkProgress;
using App.TalkCreation.Context;
using System;
using App.TalkCreation.Models;

namespace App.Tests.DataTests
{
    public class UserServiceTests
    {
        UserServiceFetch _userServiceFetch;
        UserServicePost _userServicePost;
        TalkSessionRepo _talkSessionRepo;
        TalkContextFactory _talkContextFactory;

        public UserServiceTests()
        {
            var bootstrap = new TestBootstrapper().Start();
            _userServiceFetch = bootstrap.UserServiceFetch;
            _talkSessionRepo = bootstrap.TalkSessionRepo;
            _userServicePost = bootstrap.UserServicePost;
            _talkContextFactory = bootstrap.TalkContextFactory;
        }

        [Fact]
        public async void CheckUserExistenceTest()
        {
            string userExists = _userServiceFetch.CheckUserExistence(1);
            string expectedResponse = "{\"response\":\"1\"}";
            userExists.Should().BeEquivalentTo(expectedResponse);
        }
        

       [Fact]
        public async void GetQuestionsBySessionTest()
        {
            CurrentSession currentSession = new CurrentSession("1", -1, DateTime.Now, new List<QuizzAnswers> { new QuizzAnswers() { quizzId = -1, listAnswers = new List<Dictionary<int, string>> { new Dictionary<int, string>() } } });
            _talkSessionRepo.Save(currentSession);
            List<UserQuestionsDTO> userQuestionsDto = _userServiceFetch.GetQuestionsBySession("1");
            userQuestionsDto.Should().BeEquivalentTo(new[] {
            new UserQuestionsDTO{
                Id = 1,
                Question = "Test",
                Upvotes = 1,
                SessionId = 1,
                Username = "Anonymous",
                } 
            });
            _talkSessionRepo.EndSession("1");
        }

        [Fact]
        public async void SaveSessionAndAnswersTest()
        {
            CurrentSession currentSession = new CurrentSession("1", -1, DateTime.Now, new List<QuizzAnswers> { new QuizzAnswers() { quizzId = -1, listAnswers = new List<Dictionary<int, string>> { new Dictionary<int, string>() } } });
            _talkSessionRepo.Save(currentSession);
            var exception = Record.Exception(() => _userServicePost.SaveSessionAndAnswers(currentSession));
            Assert.Null(exception);
            _talkSessionRepo.EndSession("1");
        }

        [Fact]
        public async void SaveQuestionTest()
        {
            var context =_talkContextFactory.Create();
            CurrentSession currentSession = new CurrentSession("1", -1, DateTime.Now, new List<QuizzAnswers> { new QuizzAnswers() { quizzId = -1, listAnswers = new List<Dictionary<int, string>> { new Dictionary<int, string>() } } });
            _talkSessionRepo.Save(currentSession);
            UserQuestionsDTO savedUserQuestion = _userServicePost.SaveQuestion("1","Test","Test","Test");
            savedUserQuestion.Should().BeEquivalentTo(
            new UserQuestionsDTO{
                Question = "Test",
                Upvotes = 0,
                SessionId = 1,
                Username = "Test",
                Date= "Test"
                }, x=>x.Excluding(x=>x.Id)
            );
            _talkSessionRepo.EndSession("1");
            UserQuestion userQuestionDelete = context.UserQuestions.Find(savedUserQuestion.Id);
            context.UserQuestions.Remove(userQuestionDelete);
            context.SaveChanges();
        }

        [Fact]
        public async void ChangeUpVote()
        {
            CurrentSession currentSession = new CurrentSession("1", -1, DateTime.Now, new List<QuizzAnswers> { new QuizzAnswers() { quizzId = -1, listAnswers = new List<Dictionary<int, string>> { new Dictionary<int, string>() } } });
            _talkSessionRepo.Save(currentSession);
            int upvotesUp = _userServicePost.ChangeUpVote(1, true);
            Assert.Equal<int>(2, upvotesUp);
            int upvotesDown = _userServicePost.ChangeUpVote(1, false);
            Assert.Equal<int>(1, upvotesDown);
        }
    }
}
