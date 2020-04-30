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
        private readonly TalksServiceFetch _talkServiceFetch;
        public TalkAnswerHub(TalksServiceFetch talkServiceFetch)
        {
            _talkServiceFetch = talkServiceFetch;
        }
        public async void getQuizzById(int Id)
        {
            //Console.WriteLine("What do I spot?/"+message.sender+"/"+message.Text+"/"+message.SentDate+"/"+message.ChannelId);
            //Quizz quizz = channelService.CreateChannel(channel);
            // /!\ "SendAsync" set as replacement for "InvokeAsync" 

            string placeholder = "placeholder";
            await Clients.All.SendAsync("NewChannel", placeholder);
        }

    }
}
