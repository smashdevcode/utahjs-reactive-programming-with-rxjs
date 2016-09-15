using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AspNetCoreResources.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required, MaxLength(30)]
        public string Username { get; set; }
        [Required, MaxLength(255)]
        public string EmailAddress { get; set; }
        public DateTime CreatedOn { get; set; }

        [JsonIgnore]
        public IList<Resource> Resources { get; set; }
        [JsonIgnore]
        public IList<ResourceVote> Votes { get; set; }
    }
}
