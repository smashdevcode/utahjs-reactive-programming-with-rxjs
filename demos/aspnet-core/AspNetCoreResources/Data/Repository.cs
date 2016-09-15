using AspNetCoreResources.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.Data
{
    public class Repository
    {
        private Context _context;

        public Repository(Context context)
        {
            _context = context;
        }

        public async Task<List<Resource>> GetResources()
        {
            var contributors = await _context.ResourceContributors
                .Include(rc => rc.Contributor)
                .Include(rc => rc.Role)
                .ToListAsync();

            return await _context.Resources
                .Include(r => r.AddedByUser)
                .Include(r => r.Votes)
                .ToListAsync();
        }

        public async Task<List<Resource>> GetResources(string criteria)
        {
            var contributors = await _context.ResourceContributors
                .Include(rc => rc.Contributor)
                .Include(rc => rc.Role)
                .ToListAsync();

            return await _context.Resources
                .Include(r => r.AddedByUser)
                .Include(r => r.Votes)
                .Where(r => r.Name.Contains(criteria))
                .ToListAsync();
        }

        public async Task<Resource> GetResource(int id)
        {
            var contributors = await _context.ResourceContributors
                .Include(rc => rc.Contributor)
                .Include(rc => rc.Role)
                .Where(rc => rc.ResourceId == id)
                .ToListAsync();

            return await _context.Resources
                .Include(r => r.AddedByUser)
                .Include(r => r.Votes)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public Task AddResource(Resource resource)
        {
            _context.Resources.Add(resource);
            return _context.SaveChangesAsync();
        }

        public Task<List<Role>> GetRoles()
        {
            return _context.Roles.ToListAsync();
        }

        public Task<List<Contributor>> GetContributors()
        {
            return _context.Contributors.ToListAsync();
        }

        public Task AddResourceVote(ResourceVote resourceVote)
        {
            _context.ResourceVotes.Add(resourceVote);
            return _context.SaveChangesAsync();
        }
    }
}
