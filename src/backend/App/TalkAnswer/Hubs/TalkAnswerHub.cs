using System;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Data;
using App.TalkCreation.Models;
using App.TalkAnswer.SaveTalkProgress;
using App.TalkCreation.Data.DataFetch.Dto;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Data.DataPost;
using App.TalkAnswer.Dto.QuizzResultsDTO;
using App.TalkAnswer.Dto;

namespace App.TalkAnswer.Hubs
{
    public class TalkAnswerHub : Hub
    {
        private readonly UserServices _userServices;
        private readonly QuestionServiceFetch _questionServiceFetch;
        private readonly QuizzServiceFetch _quizzServiceFetch;
        private readonly UserServicePost _userServicePost;
        public TalkAnswerHub(UserServices userServices, QuestionServiceFetch questionServiceFetch, QuizzServiceFetch quizzServiceFetch, UserServicePost userServicePost)
        {
            _questionServiceFetch = questionServiceFetch;
            _userServices = userServices;
            _quizzServiceFetch = quizzServiceFetch;
            _userServicePost = userServicePost;
        }
        public async void CreateTalkGroup(string groupId, int talkId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
            Console.WriteLine("Owner context Id: " + Context.ConnectionId);
            await _userServices.ChangeTalkById(groupId, talkId);
            Clients.Client(Context.ConnectionId).SendAsync("NewChannel", "New Channel created");
        }

        //CHANGE DB SO TALKS HAS A CURRENT QUESTION ACTIVE
        public async void JoinGroup(string groupId, string ownerId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
            Console.WriteLine("user context Id: " + Context.ConnectionId);
            await Clients.OthersInGroup(groupId).SendAsync("JoinedGroup", Context.ConnectionId);
        }

        public async Task GetCurrentQuizz(string groupId)
        {
            TalkSessionRepo _talkSessionRepo = TalkSessionRepo.GetInstance();
            if (_talkSessionRepo.Get(groupId) != null)
            { 
                int quizzId = _talkSessionRepo.Get(groupId).currentQuizz;
                List<QuestionDto> quests = await _questionServiceFetch.getQuestionsDtoByQuizzId(quizzId);
                QuizzDTO quizz = await _quizzServiceFetch.returnQuizzById(quizzId);
                string quizzName = (quizz == null) ? "" : quizz.Name;
                await Clients.Client(Context.ConnectionId).SendAsync("SetCurrentQuizz", quests, quizzId, quizzName);
            }            
        }

        public async Task StartQuizz(string groupId, int quizzId, string quizzName)
        {
            Console.WriteLine("Sending starting quizz info to group: " + groupId);
            TalkSessionRepo _talkSessionRepo = TalkSessionRepo.GetInstance();
            _talkSessionRepo.Update(groupId, quizzId);
            List<QuestionDto> quests = await _questionServiceFetch.getQuestionsDtoByQuizzId(quizzId);
            await Clients.Group(groupId).SendAsync("StartQuizz", quests, quizzId, quizzName);
        }

        public async Task SaveAnswers(string groupId, int quizzId, List<int> questIdList, List<string> answerList)
        {
            var _talkSessionRepo = TalkSessionRepo.GetInstance();
            _talkSessionRepo.AddAnswers(groupId, quizzId, questIdList, answerList);
        }

        public async Task StopQuizz(string groupId, int quizzId)
        {
            TalkSessionRepo _talkSessionRepo = TalkSessionRepo.GetInstance();
            CurrentSession currentSession = _talkSessionRepo.Get(groupId);
            _userServicePost.SaveSessionAndAnswers(currentSession);
            _talkSessionRepo.Update(groupId, currentSession.currentQuizz);
            await Clients.Group(groupId).SendAsync("StopQuizz");
            QuizzResults quizzResults = _userServices.GetQuizzResults(groupId, quizzId);
            await Clients.Client(Context.ConnectionId).SendAsync("ShowResults", quizzResults);
        }

        public async Task PostQuestion(string groupId, string question,string userName)
        {
            UserQuestionsDTO userQuestion=_userServicePost.SaveQuestion(groupId, question, userName);
            await Clients.Group(groupId).SendAsync("AddNewQuestion", userQuestion);
        }

        public async Task GetSessionQuestions(string groupId)
        {
            List<UserQuestion> userQuestions = _userServicePost.GetQuestionsBySession(groupId);
            await Clients.Group(groupId).SendAsync("ShowResults", userQuestions);
        }
    }
}
