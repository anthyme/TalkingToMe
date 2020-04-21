using App.TalkCreation.Data;
using Microsoft.Extensions.Configuration;
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
            Assert.ThrowsAsync<IOException>(async ()=> await _talksServiceFetch.getTalkAndQuizzes(5000));
        }

        [Fact]
        public void PassTalkId()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            IConfiguration configuration = configurationBuilder.Build();
            TalksServiceFetch _talksServiceFetch = new TalksServiceFetch(configuration);
            Assert.NotNull(_talksServiceFetch.getTalkAndQuizzes(1));
        }
    }
}
