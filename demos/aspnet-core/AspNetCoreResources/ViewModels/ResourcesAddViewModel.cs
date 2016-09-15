using AspNetCoreResources.Data;
using AspNetCoreResources.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreResources.ViewModels
{
    public class ResourcesAddViewModel
    {
        [Required, MaxLength(500)]
        public string Name { get; set; }

        public string Description { get; set; }

        [Required, MaxLength(500), Remote(action: "VerifyUrl", controller: "Resources")]
        public string Url { get; set; }

        [Display(Name = "Contributor")]
        [Required]
        public int? ContributorId { get; set; }

        [Display(Name = "Role")]
        [Required]
        public int? RoleId { get; set; }

        public IEnumerable<SelectListItem> Contributors { get; set; }
        public IEnumerable<SelectListItem> Roles { get; set; }

        public async Task PrepareViewModel(Repository repository)
        {
            var contributors = await repository.GetContributors();
            Contributors = contributors
                .Select(c => new SelectListItem() { Value = c.Id.ToString(), Text = c.FullName })
                .ToList();

            var roles = await repository.GetRoles();
            Roles = roles
                .Select(c => new SelectListItem() { Value = c.Id.ToString(), Text = c.Name })
                .ToList();
        }
    }
}
