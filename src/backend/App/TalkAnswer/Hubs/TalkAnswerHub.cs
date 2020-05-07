using System;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Data;
using App.TalkCreation.Models;

namespace App.TalkAnswer.Hubs
{
    public class TalkAnswerHub : Hub
    {
        private readonly UserServices _userServices;
        public TalkAnswerHub(UserServices userServices)
        {
            _userServices = userServices;
        }
        public async void CreateTalkGroup(string groupId, string userId, int talkId)
        {
            await Groups.AddToGroupAsync(userId, groupId);
            _userServices.ChangeTalkById(groupId, talkId);
            string placeholder = "placeholder";
            await Clients.All.SendAsync("NewChannel", placeholder);
        }

        //CHANGE DB SO TALKS HAS A CURRENT QUESTION ACTIVE
        public async void JoinGroup(string groupId, string userId, string ownerId)
        {
            await Groups.AddToGroupAsync(userId, groupId);
            await Clients.User(ownerId).SendAsync("RequestCurrentQuizz", userId);
        }

        public async void GetCurrentQuizz(string groupId, string userId, int quizzId)
        {
            await Groups.AddToGroupAsync(userId, groupId);
            await Clients.User(userId).SendAsync("SetCurrentQuizz", quizzId);
        }

        public async void StartQuizz(string groupId, int quizzId)
        {
            await Clients.OthersInGroup(groupId).SendAsync("StartQuizz", quizzId);
        }
    }
}
