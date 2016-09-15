using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.Models
{
    public class Resource
    {
        public int Id { get; set; }
        [Required, MaxLength(500)]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required, MaxLength(500)]
        public string Url { get; set; }
        public DateTime AddedOn { get; set; }
        public int AddedByUserId { get; set; }

        public int Score => Votes.Sum(v => v.Score);

        public User AddedByUser { get; set; }
        public IList<ResourceContributor> Contributors { get; set; }
        public IList<Tag> Tags { get; set; }
        public IList<ResourceVote> Votes { get; set; }

        public Resource()
        {
            Contributors = new List<ResourceContributor>();
            Tags = new List<Tag>();
            Votes = new List<ResourceVote>();
        }

        public override string ToString()
        {
            return $"Id: {Id}, Name: {Name}, Url: {Url}";
        }
    }
}
