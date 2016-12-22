using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace ThoiKhoaBieu.Models
{
    public class SchoolDbContext:DbContext
    {
        public SchoolDbContext() : base("DefaultConnection")
        {
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Room> Rooms { get; set; }

        public DbSet<Schedule> Schedules { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Subject>().ToTable("Subject");
            modelBuilder.Entity<Class>().ToTable("Class");
            modelBuilder.Entity<Room>().ToTable("Room");
            modelBuilder.Entity<Schedule>().ToTable("Schedule");
        }
    }
}