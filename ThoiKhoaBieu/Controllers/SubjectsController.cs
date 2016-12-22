using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ThoiKhoaBieu.Models;

namespace ThoiKhoaBieu.Controllers
{
    public class SubjectsController : Controller
    {
        private SchoolDbContext db = new SchoolDbContext();

        // GET: Subjects
        [Authorize]
        public ActionResult Index()
        {
            return View(db.Subjects.ToList());
        }


        // GET: Subjects/Create
        [Authorize]
        public ActionResult Create()
        {
            return View();
        }

        // POST: Subjects/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.

        [HttpPost]
        public ActionResult Create([Bind(Include = "Name,RequireProjector")] Subject subject)
        {
            if (ModelState.IsValid)
            {
                db.Subjects.Add(subject);
                db.SaveChanges();
                return Json("OK");
            }

            return Json("Error");
        }

        // GET: Subjects/Edit/5
        [Authorize]
        public ActionResult Update(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Subject subject = db.Subjects.Find(id);
            if (subject == null)
            {
                return HttpNotFound();
            }
            return View(subject);
        }

        // POST: Subjects/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.

        [HttpPost]
        public ActionResult Update([Bind(Include = "ID,Name,RequireProjector")] Subject subject)
        {
            if (ModelState.IsValid)
            {
                db.Entry(subject).State = EntityState.Modified;
                db.SaveChanges();
                return Json("OK");
            }
            return Json("Error");
        }

        // GET: Subjects/Delete/5
        [Authorize]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return Json("Error");
            }
            Subject subject = db.Subjects.Find(id);
            if (subject == null)
            {
                return Json("Error");
            }
            db.Subjects.Remove(subject);
            db.SaveChanges();
            return Json("OK");
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}