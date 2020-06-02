using App.TalkCreation.Data;
using App.TalkCreation.Data.DataFetch;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using App.Tests.Infrastructure;
using NUnit.Framework.Constraints;
using Xunit;

namespace App.Tests.TalkCreationTests
{
    public class QuizzControllerTests
    {
        QuizzServiceFetch _quizzServiceFetch;

        public QuizzControllerTests()
        {
            _quizzServiceFetch = new TestBootstrapper().Start().QuizzServiceFetch;
        }

        [Fact]
        public void ThrowQuizzId()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () => await _quizzServiceFetch.returnQuizzById(-1));
        }

        [Fact]
        public void ThrowReturnQuizzById()
        {
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(
                async () => await _quizzServiceFetch.returnQuizzByUserId(-1));
        }
    }
}