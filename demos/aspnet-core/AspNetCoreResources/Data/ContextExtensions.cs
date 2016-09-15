using AspNetCoreResources.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.Data
{
    public static class ContextExtensions
    {
        public static void EnsureSeedData(this Context context)
        {
            // Users
            var users = new[]
            {
                new User() { Id = 1, Username = "SmashDev", EmailAddress = "james@smashdev.com", CreatedOn = DateTime.UtcNow },
            };
            AddUsers(context, users);

            // Contributors
            var contributors = new []
            {
                new Contributor() { Id = 1, FirstName = "Scott", LastName = "Hanselman" },
                new Contributor() { Id = 2, FirstName = "James", LastName = "Churchill" },
            };
            AddContributors(context, contributors);

            // Roles
            var roles = new[]
            {
                new Role() { Id = 1, Name = "Author" },
            };
            AddRoles(context, roles);

            // Resources (with ResourceContributors)
            var resources = new[]
            {
                new Resource()
                {
                    Id = 1,
                    AddedOn = DateTime.UtcNow,
                    AddedByUserId = 1,
                    Name = "Some Blog Post",
                    Description = "Description would go here.",
                    Contributors = new List<ResourceContributor>()
                    {
                        new ResourceContributor()
                        {
                            Id = 1,
                            ContributorId = 1,
                            ResourceId = 1,
                            RoleId = 1
                        }
                    },
                    Url = "http://www.something.com/"
                },
                new Resource()
                {
                    Id = 2,
                    AddedOn = DateTime.UtcNow.AddDays(-7),
                    AddedByUserId = 1,
                    Name = "Another Blog Post",
                    Description = "Description would go here.",
                    Contributors = new List<ResourceContributor>()
                    {
                        new ResourceContributor()
                        {
                            Id = 2,
                            ContributorId = 2,
                            ResourceId = 2,
                            RoleId = 1
                        }
                    },
                    Url = "http://www.somethingelse.com/"
                },
            };
            AddResources(context, resources);
        }

        private static void AddUsers(Context context, User[] users)
        {
            foreach (var user in users)
            {
                if (!context.Users.Any(u => u.Id == user.Id))
                {
                    user.Id = 0;
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }

        private static void AddContributors(Context context, Contributor[] contributors)
        {
            foreach (var contributor in contributors)
            {
                if (!context.Contributors.Any(c => c.Id == contributor.Id))
                {
                    contributor.Id = 0;
                    context.Contributors.Add(contributor);
                }
                context.SaveChanges();
            }
        }

        private static void AddRoles(Context context, Role[] roles)
        {
            foreach (var role in roles)
            {
                if (!context.Roles.Any(r => r.Id == role.Id))
                {
                    role.Id = 0;
                    context.Roles.Add(role);
                }
                context.SaveChanges();
            }
        }

        private static void AddResources(Context context, Resource[] resources)
        {
            foreach (var resource in resources)
            {
                if (!context.Resources.Any(r => r.Id == resource.Id))
                {
                    resource.Id = 0;
                    foreach(var contributor in resource.Contributors)
                    {
                        contributor.Id = 0;
                    }
                    context.Resources.Add(resource);
                }
                context.SaveChanges();
            }
        }
    }
}
