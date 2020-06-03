using Microsoft.EntityFrameworkCore;
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
        public DbSet<UserQuestion> UserQuestions { get; set; }
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
            modelBuilder.Entity<UserQuestion>().ToTable("UserQuestions");

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
            modelBuilder.Entity<UserAnswer>().HasOne(e => e.Session).WithMany(e => e.UserAnswers).HasForeignKey(p => p.SessionId);
            modelBuilder.Entity<Session>().HasMany(c => c.UserAnswers).WithOne(e => e.Session);
            modelBuilder.Entity<UserQuestion>().HasOne(e => e.Session).WithMany(p => p.UserQuestions).HasForeignKey(p => p.SessionId);
            modelBuilder.Entity<Session>().HasMany(c => c.UserQuestions).WithOne(e => e.Session);

            modelBuilder.Entity<Talk>().HasData(new {Id = 1, OwnerId =1, Name="Test", Description = "Test" });
            modelBuilder.Entity<Quizz>().HasData(new {Id = 1,OwnerId=1, Name="Test" });
            modelBuilder.Entity<Session>().HasData(new {Id = 1,StartDate= "01/01/2020 01:00:00", EndDate= "01/01/2020 01:30:00" , groupId="1", TalkId=1});
            modelBuilder.Entity<SessionToQuizz>().HasData(new {Id = 1,QuizzId=1, SessionId= 1});
            modelBuilder.Entity<UserQuestion>().HasData(new {Id = 1,Question="Test", Upvotes= 1, SessionId=1, Username="Anonymous"});
            modelBuilder.Entity<UserAnswer>().HasData(new {Id = 1,QuestionId=1, Response= "Test", Count=1, SessionId=1});
            modelBuilder.Entity<Answer>().HasData(new {Id = 1,QuestionId=1, Response="Test" }, new { Id = 2, QuestionId = 1, Response = "Test2" });
            modelBuilder.Entity<QuizzToTalk>().HasData(new {Id = 1,TalkId=1, QuizzId=1 });
            modelBuilder.Entity<Question>().HasData(new {Id = 1,QuizzId=1, Quest="Test", Type="UCQ",CorrectAn="Test" });
            modelBuilder.Entity<User>().HasData(new {Id = 1, Service ="Google", ExternalId="0", UserId = 1 });
        }
    }
}
