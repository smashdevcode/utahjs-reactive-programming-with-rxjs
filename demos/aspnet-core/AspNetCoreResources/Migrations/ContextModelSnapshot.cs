using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using AspNetCoreResources.Data;

namespace AspNetCoreResources.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AspNetCoreResources.Models.Contributor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 50);

                    b.HasKey("Id");

                    b.ToTable("Contributors");
                });

            modelBuilder.Entity("AspNetCoreResources.Models.Resource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AddedByUserId");

                    b.Property<DateTime>("AddedOn");

                    b.Property<string>("Description");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 500);

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 500);

                    b.HasKey("Id");

                    b.HasIndex("AddedByUserId");

                    b.ToTable("Resources");
                });

            modelBuilder.Entity("AspNetCoreResources.Models.ResourceContributor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ContributorId");

                    b.Property<int>("ResourceId");

                    b.Property<int>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("ContributorId");

                    b.HasIndex("ResourceId");

                    b.HasIndex("RoleId");

                    b.ToTable("ResourceContributors");
                });

            modelBuilder.Entity("AspNetCoreResources.Models.ResourceVote", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ResourceId");

                    b.Property<int>("Score");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("ResourceId");

                    b.HasIndex("UserId");

                    b.ToTable("ResourceVotes");
                });

            modelBuilder.Entity("AspNetCoreResources.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 30);

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("AspNetCoreResources.Models.Tag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 30);

                    b.Property<int?>("ResourceId");

                    b.HasKey("Id");

                    b.HasIndex("ResourceId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("AspNetCoreResources.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreatedOn");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 255);

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasAnnotation("MaxLength", 30);

                    b.HasKey("Id");

                    b.HasIndex("EmailAddress")
                        .IsUnique();

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AspNetCoreResources.Models.Resource", b =>
                {
                    b.HasOne("AspNetCoreResources.Models.User", "AddedByUser")
                        .WithMany("Resources")
                        .HasForeignKey("AddedByUserId");
                });

            modelBuilder.Entity("AspNetCoreResources.Models.ResourceContributor", b =>
                {
                    b.HasOne("AspNetCoreResources.Models.Contributor", "Contributor")
                        .WithMany()
                        .HasForeignKey("ContributorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AspNetCoreResources.Models.Resource", "Resource")
                        .WithMany("Contributors")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AspNetCoreResources.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AspNetCoreResources.Models.ResourceVote", b =>
                {
                    b.HasOne("AspNetCoreResources.Models.Resource", "Resource")
                        .WithMany("Votes")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("AspNetCoreResources.Models.User", "User")
                        .WithMany("Votes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AspNetCoreResources.Models.Tag", b =>
                {
                    b.HasOne("AspNetCoreResources.Models.Resource")
                        .WithMany("Tags")
                        .HasForeignKey("ResourceId");
                });
        }
    }
}
