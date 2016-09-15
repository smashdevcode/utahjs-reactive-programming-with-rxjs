using AspNetCoreResources.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) 
            : base(options)
        {
        }

        public DbSet<Contributor> Contributors { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<ResourceContributor> ResourceContributors { get; set; }
        public DbSet<ResourceVote> ResourceVotes { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Resource>()
                .HasOne(r => r.AddedByUser)
                .WithMany(u => u.Resources)
                .HasForeignKey(r => r.AddedByUserId)
                .OnDelete(Microsoft.EntityFrameworkCore.Metadata.DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<User>()
                .HasIndex(u => u.EmailAddress)
                .IsUnique();
        }
    }
}
