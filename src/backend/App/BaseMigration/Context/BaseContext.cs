using Microsoft.EntityFrameworkCore;
using TalkingToMe.BaseMigration.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace TalkingToMe.BaseMigration.Context
{
    public class BaseContext : DbContext
    {
        public BaseContext(DbContextOptions<BaseContext> options) : base(options)
        { }

        public DbSet<HelloWorld> HelloWorldBase { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<HelloWorld>().HasData(
                    new HelloWorld
                    {
                        Id =1,
                        Message = "HelloWorld!"
                    }
                );
        }
    }
}