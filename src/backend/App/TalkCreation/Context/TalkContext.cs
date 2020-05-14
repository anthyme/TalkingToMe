using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.TalkCreation.Models;
using App.TalkAnswer.Models;

namespace App.TalkCreation.Context
{
    public class TalkContext : DbContext
    {
        public TalkContext(DbContextOptions<TalkContext> options) : base(options)
        { }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<SessionToQuizz> SessionToQuizzes { get; set; }
        public DbSet<Quizz> Quizzes { get; set; }
        public DbSet<QuizzToTalk> QuizzToTalks { get; set; }
        public DbSet<Talk> Talks { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<UserAnswer> UserAnswers { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Session>().ToTable("Sessions");
            modelBuilder.Entity<SessionToQuizz>().ToTable("SessionToQuizzes");
            modelBuilder.Entity<Quizz>().ToTable("Quizz");
            modelBuilder.Entity<QuizzToTalk>().ToTable("QuizzToTalks");
            modelBuilder.Entity<Talk>().ToTable("Talks");
            modelBuilder.Entity<Question>().ToTable("Questions");
            modelBuilder.Entity<Answer>().ToTable("Answers");
            modelBuilder.Entity<UserAnswer>().ToTable("UserAnswers");
            modelBuilder.Entity<User>().ToTable("Users");

            modelBuilder.Entity<Session>().HasMany(e => e.Quizzes).WithOne();
            modelBuilder.Entity<Talk>().HasMany(e => e.Quizzes).WithOne();
            modelBuilder.Entity<Quizz>().HasMany(e => e.Talks).WithOne();
            modelBuilder.Entity<Quizz>().HasMany(e => e.Questions).WithOne();
            modelBuilder.Entity<Quizz>().HasMany(e => e.Sessions).WithOne();
            modelBuilder.Entity<QuizzToTalk>().HasOne(e => e.Talk).WithMany(e => e.Quizzes).HasForeignKey(b => b.TalkId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<QuizzToTalk>().HasOne(e => e.Quizz).WithMany(e => e.Talks);
            modelBuilder.Entity<SessionToQuizz>().HasOne(e => e.Session).WithMany(e => e.Quizzes).HasForeignKey(b => b.SessionId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<SessionToQuizz>().HasOne(e => e.Quizz).WithMany(e => e.Sessions);
            modelBuilder.Entity<Question>().HasOne(e => e.Quizz).WithMany(e => e.Questions).HasForeignKey(p => p.QuizzId);
            modelBuilder.Entity<Quizz>().HasMany(c => c.Questions).WithOne(e => e.Quizz);
            modelBuilder.Entity<Answer>().HasOne(e => e.Question).WithMany(p=> p.Answers).HasForeignKey(p => p.QuestionId);
            modelBuilder.Entity<UserAnswer>().HasOne(e => e.Question).WithMany(p => p.UserAnswers).HasForeignKey(p => p.QuestionId);
            modelBuilder.Entity<Question>().HasMany(c => c.Answers).WithOne(e => e.Question);
        }
    }
}
