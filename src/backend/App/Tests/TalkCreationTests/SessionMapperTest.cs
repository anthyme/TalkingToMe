using System;
using System.Collections.Generic;
using App.TalkAnswer.Dto;
using App.TalkCreation.Data.DataFetch;
using App.TalkCreation.Models;
using FluentAssertions;
using Xunit;

namespace App.Tests.TalkCreationTests
{
    public class SessionMapperTest
    {
        [Fact]
        public void MapIsOk()
        {
            var sut = new SessionMapper();

            string Date(int month, int day, int hour = 0, int minute = 0) => new DateTime(2020, month, day, hour, minute, 0).ToString();
            var sessions = new List<Session>()
            {
                new Session{ StartDate = Date(1,1), EndDate = Date(1,2), Id = 1},
                new Session{ StartDate = Date(1,2,12), EndDate = Date(1,2,14), Id = 2},
            };

            var result = sut.Map(sessions);

            result.Should().BeEquivalentTo(new[]
            {
                new SessionHistoryDTO
                {
                    Id = 1,
                    StartDate = new DateTime(2020, 1, 1),
                    TimeLasted = "1 day or more"
                },
                new SessionHistoryDTO
                {
                    Id = 2,
                    StartDate = new DateTime(2020, 1, 2, 12, 0, 0),
                    TimeLasted = "2 hours "
                },
            });
        }
    }
}