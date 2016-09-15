using AspNetCoreResources.Data;
using AspNetCoreResources.Models;
using AspNetCoreResources.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.Controllers
{
    public class ResourcesController : Controller
    {
        private Repository _repository;

        public ResourcesController(Repository repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> Add()
        {
            var viewModel = new ResourcesAddViewModel();

            await viewModel.PrepareViewModel(_repository);

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ResourcesAddViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var resource = new Resource()
                {
                    Name = viewModel.Name,
                    Description = viewModel.Description,
                    Url = viewModel.Url,
                    AddedOn = DateTime.UtcNow,
                    AddedByUserId = 1 // TODO Need to use the current user.
                };
                    
                resource.Contributors.Add(new ResourceContributor()
                {
                    ContributorId = viewModel.ContributorId.Value,
                    RoleId = viewModel.RoleId.Value
                });

                await _repository.AddResource(resource);

                return RedirectToAction("Index", "Home");
            }

            await viewModel.PrepareViewModel(_repository);

            return View(viewModel);
        }

        [HttpGet, HttpPost]
        public IActionResult VerifyUrl(string url)
        {
            if (url.IndexOf("http://") == -1)
            {
                return Json("The Url must start with 'http://'.");
            }

            return Json(true);
        }
    }
}
