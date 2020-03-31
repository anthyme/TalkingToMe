using Microsoft.EntityFrameworkCore;
using TalkingToMe.BaseMigration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Models;

namespace App.TalkCreation.Context
{
    public class TalkContext : DbContext
    {
        public TalkContext(DbContextOptions<TalkContext> options) : base(options)
        { }

        public DbSet<Quizz> Quizzes { get; set; }
        public DbSet<QuizzToTalk> QuizzToTalks { get; set; }
        public DbSet<Talk> Talks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*modelBuilder.Entity<Quizzes>().HasData(
                    new Quizz
                    {
                        ...
                    }
                );*/
        }
    }
}
