using System;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Data;
using App.TalkCreation.Models;
using App.TalkAnswer.SaveTalkProgress;

namespace App.TalkAnswer.Hubs
{
    public class TalkAnswerHub : Hub
    {
        private TalkSessionRepo _talkSessionRepo;
        private readonly UserServices _userServices;
        public TalkAnswerHub(UserServices userServices)
        {
            _userServices = userServices;
        }
        public async void CreateTalkGroup(string groupId,int talkId)
       {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
            Console.WriteLine("Owner context Id: " + Context.ConnectionId);
            _userServices.ChangeTalkById(groupId, talkId);
            string placeholder = "placeholder";
            var clients = Clients.Group(groupId).ToString();
            await Clients.All.SendAsync("NewChannel", clients);
        }

        //CHANGE DB SO TALKS HAS A CURRENT QUESTION ACTIVE
        public async void JoinGroup(string groupId, string ownerId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
            Console.WriteLine("user context Id: " + Context.ConnectionId);
            await Clients.OthersInGroup(groupId).SendAsync("JoinedGroup", Context.ConnectionId);
        }

        public async void GetCurrentQuizz(string groupId, int quizzId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupId);
            await Clients.User(Context.ConnectionId).SendAsync("SetCurrentQuizz", quizzId);
        }

        public async void StartQuizz(string groupId, int quizzId)
        {
            Console.WriteLine("Sending starting quizz info to group: " + groupId);
            await Clients.Group(groupId).SendAsync("StartQuizz", quizzId);
        }
    }
}
