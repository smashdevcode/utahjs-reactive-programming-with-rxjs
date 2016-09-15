using AspNetCoreResources.Data;
using AspNetCoreResources.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.ApiControllers
{
    [Route("api/[controller]")]
    public class ResourcesController : Controller
    {
        private Repository _repository;

        public ResourcesController(Repository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var resources = await _repository.GetResources();
            return Ok(new { Data = resources });
        }

        [HttpGet("search/{criteria}")]
        public async Task<IActionResult> Get(string criteria)
        {
            var resources = await _repository.GetResources(criteria);
            return Ok(new { Data = resources });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var resource = await _repository.GetResource(id);

            if (resource == null)
            {
                return NotFound();
            }

            return Ok(new { Data = new [] { resource } });
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Resource resource)
        {
            if (resource.Contributors.Count == 0)
            {
                ModelState.AddModelError("Contributors", "At least one contributor is required.");
            }

            if (ModelState.GetValidationState("Contributors") != Microsoft.AspNetCore.Mvc.ModelBinding.ModelValidationState.Invalid)
            {
                foreach (var contributor in resource.Contributors)
                {
                    var itemNumber = resource.Contributors.IndexOf(contributor) + 1;

                    if (contributor.ContributorId == 0 && (contributor.Contributor == null || contributor.Contributor.Id == 0))
                    {
                        ModelState.AddModelError("Contributors", $"Contributor #{itemNumber} must include a contributor.");
                    }

                    if (contributor.RoleId == 0 && (contributor.Role == null || contributor.Role.Id == 0))
                    {
                        ModelState.AddModelError("Contributors", $"Contributor #{itemNumber} must include a role.");
                    }
                }
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Fix up the contributors related data prior to adding the resource.
            // 1) Give priority to the "Contributor.Id" and "Role.Id" property values.
            // 2) Remove the navigation property values to prevent Entity Framework from 
            // attempting to create new records.
            foreach (var contributor in resource.Contributors)
            {
                if (contributor.Contributor != null)
                {
                    contributor.ContributorId = contributor.Contributor.Id;
                }
                contributor.Contributor = null;

                if (contributor.Role != null)
                {
                    contributor.RoleId = contributor.Role.Id;
                }
                contributor.Role = null;
            }

            resource.AddedByUserId = 1; // TODO Need to use the current user.

            await _repository.AddResource(resource);

            // Retrieve the resource from the repository 
            // in order to get a fully populated model.
            var newResource = await _repository.GetResource(resource.Id);

            return CreatedAtAction("Get", new { id = resource.Id }, new { Data = new [] { newResource } });
        }

        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}

        [HttpPost("[action]/{id:int}")]
        public async Task<IActionResult> VoteUp(int id)
        {
            var resourceVote = new ResourceVote()
            {
                ResourceId = id,
                UserId = 1, // TODO Need to use the current user.
                Score = 1                
            };

            await _repository.AddResourceVote(resourceVote);

            var resource = await _repository.GetResource(id);

            return Created("/", new { score = resource.Score });
        }

        [HttpPost("[action]/{id:int}")]
        public async Task<IActionResult> VoteDown(int id)
        {
            var resourceVote = new ResourceVote()
            {
                ResourceId = id,
                UserId = 1, // TODO Need to use the current user.
                Score = -1
            };

            await _repository.AddResourceVote(resourceVote);

            var resource = await _repository.GetResource(id);

            return Created("/", new { score = resource.Score });
        }
    }
}
