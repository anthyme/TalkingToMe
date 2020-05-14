using App.TalkCreation.Context;
using App.TalkCreation.Data;
using App.TalkCreation.Data.DataPost;
using App.TalkCreation.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace App.Tests.TalkCreationTests
{
    public class TalkControllerTests
    {

        [Fact]
        public void ThrowTalkId()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            IConfiguration configuration = configurationBuilder.Build();
            TalksServiceFetch _talksServiceFetch = new TalksServiceFetch(configuration);
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await _talksServiceFetch.getTalkAndQuizzes(-1));
        }

        [Fact]
        public void PassTalkId()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            IConfiguration configuration = configurationBuilder.Build();
            TalksServiceFetch _talksServiceFetch = new TalksServiceFetch(configuration);
            Assert.NotNull(_talksServiceFetch.getTalkAndQuizzes(1));
        }

        [Fact]
        public void ThrowDeleteTalkId()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            IConfiguration configuration = configurationBuilder.Build();
            TalksServiceFetch _talksServiceFetch = new TalksServiceFetch(configuration);
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await _talksServiceFetch.deleteTalk(-1));
        }

        [Fact]
        public void ThrowCreateTalk()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            IConfiguration configuration = configurationBuilder.Build();
            TalksServicePost _talksServicePost = new TalksServicePost(configuration);
            var newTalk = "[{\"description\":{\"description\":\"test\"}}]";
            var parsedTalk = JArray.Parse(newTalk);
            Assert.ThrowsAsync<Exception>(async() => _talksServicePost.AddNewTalk(parsedTalk).ToString());
        }
    }
}
