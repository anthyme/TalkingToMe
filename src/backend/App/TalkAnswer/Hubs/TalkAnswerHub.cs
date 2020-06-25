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
using App.TalkAnswer.Services;

namespace App.TalkAnswer.Hubs
{
    public class TalkAnswerHub : Hub
    {
        private readonly UserServices _userServices;
        private readonly QuestionServiceFetch _questionServiceFetch;
        private readonly QuizzServiceFetch _quizzServiceFetch;
        private readonly UserServicePost _userServicePost;
        readonly TalkSessionRepo _talkSessionRepo;
        private readonly UserServiceFetch _userServiceFetch;

        public TalkAnswerHub(UserServiceFetch userServiceFetch,
            UserServices userServices,
            QuestionServiceFetch questionServiceFetch,
            QuizzServiceFetch quizzServiceFetch,
            UserServicePost userServicePost,
            TalkSessionRepo talkSessionRepo)
        {
            _questionServiceFetch = questionServiceFetch;
            _userServices = userServices;
            _quizzServiceFetch = quizzServiceFetch;
            _userServicePost = userServicePost;
            _talkSessionRepo = talkSessionRepo;
            _userServiceFetch = userServiceFetch;
        }

        public async void CreateTalkGroup(string groupId, int talkId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
            Console.WriteLine("Owner context Id: " + Context.ConnectionId);
            _userServices.ChangeTalkById(groupId, talkId);
            await Clients.Client(Context.ConnectionId).SendAsync("NewChannel", "New Channel created");
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
            if (_talkSessionRepo.Get(groupId) != null)
            {
                int quizzId = _talkSessionRepo.Get(groupId).currentQuizz;
                List<QuestionDto> quests = await _questionServiceFetch.GetQuestionsDtoByQuizzId(quizzId);
                QuizzDTO quizz = await _quizzServiceFetch.returnQuizzById(quizzId);
                string quizzName = (quizz == null) ? "" : quizz.Name;
                await Clients.Client(Context.ConnectionId).SendAsync("SetCurrentQuizz", quests, quizzId, quizzName);
            }
        }

        public async Task StartQuizz(string groupId, int quizzId, string quizzName)
        {
            Console.WriteLine("Sending starting quizz info to group: " + groupId);
            _talkSessionRepo.Update(groupId, quizzId);
            List<QuestionDto> quests = await _questionServiceFetch.GetQuestionsDtoByQuizzId(quizzId);
            await Clients.Group(groupId).SendAsync("StartQuizz", quests, quizzId, quizzName);
        }

        public async Task SaveAnswers(string groupId, int quizzId, List<int> questIdList, List<string> answerList)
        {
            _talkSessionRepo.AddAnswers(groupId, quizzId, questIdList, answerList);
        }

        public async Task StopQuizz(string groupId, int quizzId)
        {
            CurrentSession currentSession = _talkSessionRepo.Get(groupId);
            _userServicePost.SaveSessionAndAnswers(currentSession);
            _talkSessionRepo.Update(groupId, currentSession.currentQuizz);
            await Clients.Group(groupId).SendAsync("StopQuizz");
            QuizzResults quizzResults = _userServices.GetQuizzResults(groupId, quizzId);
            await Clients.Client(Context.ConnectionId).SendAsync("ShowResults", quizzResults);
        }

        public async Task PostQuestion(string groupId, string question, string userName, string date)
        {
            var session = _talkSessionRepo.Get(groupId);
            if (!session.mutedUsers.Contains(Context.ConnectionId))
            {
                UserQuestionsDTO userQuestion = _userServicePost.SaveQuestion(groupId, question, userName, date, Context.ConnectionId);
                await Clients.Group(groupId).SendAsync("AddNewQuestion", userQuestion);
            }
        }

        public async Task GetCurrentSessionUserQuestions(string groupId)
        {
            List<UserQuestionsDTO> userQuestionsDTO = _userServiceFetch.GetQuestionsBySession(groupId);
            await Clients.Client(Context.ConnectionId).SendAsync("ShowCurrentUserQuestions", userQuestionsDTO);
        }

        public async Task GetCurrentSessionMutedUsers(string groupId)
        {
            List<string> mutedUsers = _talkSessionRepo.Get(groupId).mutedUsers;
            await Clients.Client(Context.ConnectionId).SendAsync("ShowMutedUsers", mutedUsers);
        }

        public async Task ChangeUpVote(string groupId, int id, bool addUpvote)
        {
            int upvotes = _userServicePost.ChangeUpVote(id, addUpvote);
            UpVotesDTO upvotesDTO = new UpVotesDTO
            {
                id = id,
                upvotes = upvotes
            };
            await Clients.Group(groupId).SendAsync("ConfirmChangedUpvote", upvotesDTO);
        }

        public async Task CannotHear(string groupId)
        {
            await Clients.Group(groupId).SendAsync("CannotHear");
        }

        public async Task CancelBell(string groupId)
        {
            await Clients.Group(groupId).SendAsync("CancelBell");
        }

        public void MuteUnmuteUser(string groupId, string userContext)
        {
            _talkSessionRepo.MuteUnmuteUser(groupId, userContext);
        }
       
    }
}
