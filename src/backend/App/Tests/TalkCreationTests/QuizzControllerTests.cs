using App.TalkCreation.Context;
using App.TalkCreation.Data;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace App.Tests.TalkCreationTests
{
    public class QuizzControllerTests
    {

        [Fact]
        public void ThrowQuizzId()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            IConfiguration configuration = configurationBuilder.Build();
            QuizzServiceFetch _quizzServiceFetch = new QuizzServiceFetch(configuration);
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await _quizzServiceFetch.returnQuizzById(5000));
        }

        [Fact]
        public void ThrowReturnQuizzById()
        {
            IConfigurationBuilder configurationBuilder = new ConfigurationBuilder();
            IConfiguration configuration = configurationBuilder.Build();
            QuizzServiceFetch _quizzServiceFetch = new QuizzServiceFetch(configuration);
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => _quizzServiceFetch.returnQuizzByUserId(1000000));
        }

    }
}