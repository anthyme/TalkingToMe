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

namespace App.TalkAnswer.Hubs
{
    public class TalkAnswerHub : Hub
    {
        private readonly UserServices _userServices;
        private readonly QuestionServiceFetch _questionServiceFetch;
        private readonly QuizzServiceFetch _quizzServiceFetch;
        public TalkAnswerHub(UserServices userServices, QuestionServiceFetch questionServiceFetch, QuizzServiceFetch quizzServiceFetch)
        {
            _questionServiceFetch = questionServiceFetch;
            _userServices = userServices;
            _quizzServiceFetch = quizzServiceFetch;
        }
        public async void CreateTalkGroup(string groupId, int talkId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
            Console.WriteLine("Owner context Id: " + Context.ConnectionId);
            _userServices.ChangeTalkById(groupId, talkId);
            await Clients.All.SendAsync("NewChannel", "New Channel created");
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
            int quizzId = _talkSessionRepo.Get(groupId).currentQuizz;
            List<QuestionDto> quests = await _questionServiceFetch.getQuestionsDtoByQuizzId(quizzId);
            QuizzDTO quizz = await _quizzServiceFetch.returnQuizzById(quizzId);
            string quizzName = (quizz == null)? "" :quizz.Name;
            await Clients.Client(Context.ConnectionId).SendAsync("SetCurrentQuizz", quests, quizzId, quizzName);
        }

        public async Task StartQuizz(string groupId, int quizzId, string quizzName)
        {
            Console.WriteLine("Sending starting quizz info to group: " + groupId);
            TalkSessionRepo _talkSessionRepo = TalkSessionRepo.GetInstance();
            _talkSessionRepo.Update(groupId, quizzId);
            List<QuestionDto> quests = await _questionServiceFetch.getQuestionsDtoByQuizzId(quizzId);
            await Clients.Group(groupId).SendAsync("StartQuizz", quests, quizzId, quizzName);
        }

        public async void saveAnswers(string groupId, int quizzId, List<int> questIdList, List<string> answerList)
        {
            Console.WriteLine("Louis saveAnswer:", questIdList);
            Console.WriteLine("Louis saveAnswer:", answerList);
            TalkSessionRepo _talkSessionRepo = TalkSessionRepo.GetInstance();
            _talkSessionRepo.AddAnswers(groupId, quizzId, questIdList, answerList);
        }
    }
}
