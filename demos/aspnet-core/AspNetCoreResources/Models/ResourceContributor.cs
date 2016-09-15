using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.Models
{
    public class ResourceContributor
    {
        public int Id { get; set; }
        [JsonIgnore]
        public int ResourceId { get; set; }
        public int ContributorId { get; set; }
        public int RoleId { get; set; }

        [JsonIgnore]
        public Resource Resource { get; set; }
        public Contributor Contributor { get; set; }
        public Role Role { get; set; }
    }
}
