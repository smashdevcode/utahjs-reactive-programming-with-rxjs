using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.Models
{
    public class ResourceVote
    {
        public int Id { get; set; }
        public int ResourceId { get; set; }
        public int UserId { get; set; }
        [Range(-1, 1)]
        public int Score { get; set; }

        public Resource Resource { get; set; }
        public User User { get; set; }
    }
}
