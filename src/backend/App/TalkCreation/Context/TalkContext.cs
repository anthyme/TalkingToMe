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
        public DbSet<Question> Questions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Quizz>().ToTable("Quizz");
            modelBuilder.Entity<QuizzToTalk>().ToTable("QuizzToTalks");
            modelBuilder.Entity<Talk>().ToTable("Talks");
            modelBuilder.Entity<Question>().ToTable("Questions");

            modelBuilder.Entity<Talk>().HasMany(e => e.Quizzes).WithOne();
            modelBuilder.Entity<Quizz>().HasMany(e => e.Talks).WithOne();
            modelBuilder.Entity<Quizz>().HasMany(e => e.Questions).WithOne();
            modelBuilder.Entity<QuizzToTalk>().HasOne(e => e.Talk).WithMany(e => e.Quizzes).HasForeignKey(b => b.TalkId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<QuizzToTalk>().HasOne(e => e.Quizz).WithMany(e => e.Talks);
            modelBuilder.Entity<Question>().HasOne(e => e.Quizz).WithMany(e => e.Questions).HasForeignKey(p => p.QuizzId);
            modelBuilder.Entity<Quizz>().HasMany(c => c.Questions).WithOne(e => e.Quizz);
        }
    }
}
