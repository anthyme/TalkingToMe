using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using NSubstitute;
using Xunit;

namespace App.Tests.DI
{
    public class DiTest
    {
        [Fact]
        public void NowPlusOneMinuteShouldReturnNowPlusOneMinute()
        {
            var time = Substitute.For<ITime>();
            time.Now().Returns(new DateTime(2020, 1, 1, 12, 37, 20));
            //var time = new TimeAccess();
            var biz = new TestBusinessLayer(time);
            var sut = new TestControler(biz);

            var result = sut.NowPlusOneMinute();

            result.Should().Be(new DateTime(2020, 1, 1, 12, 38, 20));
        }
    }


    public class TestControler
    {
        readonly TestBusinessLayer _testBusinessLayer;

        public TestControler(TestBusinessLayer testBusinessLayer)
        {
            _testBusinessLayer = testBusinessLayer;
        }

        public DateTime NowPlusOneMinute()
        {
            return _testBusinessLayer.NowPlusOneMinute();
        }
    }

    public class TestBusinessLayer
    {
        readonly ITime _timeAccess;

        public TestBusinessLayer(ITime timeAccess)
        {
            _timeAccess = timeAccess;
        }

        public DateTime NowPlusOneMinute()
        {
            return _timeAccess.Now().AddMinutes(1);
        }
    }

    public interface ITime
    {
        DateTime Now();
    }

    public class TimeAccess : ITime
    {
        public DateTime Now()
        {
            return DateTime.UtcNow;
        }
    }
}
