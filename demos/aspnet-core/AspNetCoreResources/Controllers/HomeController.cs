using AspNetCoreResources.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.Controllers
{
    public class HomeController : Controller
    {
        private Repository _repository;

        public HomeController(Repository repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> Index()
        {
            var resources = await _repository.GetResources();
            return View(resources);
        }
    }
}
