using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity.EntityFramework;
using ThoiKhoaBieu.Models;

namespace ThoiKhoaBieu.Controllers
{
    public class RoleController : Controller
    {
        ApplicationDbContext context;

        public RoleController()
        {
            context = new ApplicationDbContext();
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Index()
        {
            var roles = context.Roles.ToList();
            return View(roles);
        }

        [Authorize(Roles = "Admin")]
        public ActionResult Create()
        {
            var role = new IdentityRole();
            return View(role);
        }

        
        [HttpPost]
        public ActionResult Create(IdentityRole role)
        {
            context.Roles.Add(role);
            context.SaveChanges();
            return RedirectToAction("Index");
        }
    }
}