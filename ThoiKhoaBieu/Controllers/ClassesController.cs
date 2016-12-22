using System;
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
    public class ClassesController : Controller
    {
        private SchoolDbContext db = new SchoolDbContext();

        // GET: Classes
        [Authorize]
        public ActionResult Index()
        {
            var classes = db.Classes;
            ViewBag.Subject = db.Subjects.ToList();
            List<ClassViewModel> model = new List<ClassViewModel>();
            foreach (Class cl in classes)
            {
                cl.OfSubject = db.Subjects.Find(cl.SubjectID);
                ClassViewModel m = new ClassViewModel(cl);
                model.Add(m);
            }
            return View(model);
        }


        // GET: Classes/Create
        [Authorize]
        public ActionResult Create()
        {
            ViewBag.SubjectID = new SelectList(db.Subjects, "ID", "Name");
            return View();
        }

        // POST: Classes/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Create([Bind(Include = "Name,TimeCount,SubjectID")] Class model)
        {
            if (ModelState.IsValid)
            {
                db.Classes.Add(model);
                db.SaveChanges();
                return Json("OK");
            }

            return Json("Error");
        }

        // GET: Classes/Edit/5
        [Authorize]
        public ActionResult Update(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Class @class = db.Classes.Find(id);
            if (@class == null)
            {
                return HttpNotFound();
            }
            ViewBag.SubjectID = new SelectList(db.Subjects, "ID", "Name", @class.SubjectID);
            return View(@class);
        }

        // POST: Classes/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public ActionResult Update([Bind(Include = "ID,Name,TimeCount,SubjectID")] Class model)
        {
            if (ModelState.IsValid)
            {
                db.Entry(model).State = EntityState.Modified;
                db.SaveChanges();
                return Json("OK");
            }

            return Json("Error");
        }

        // GET: Classes/Delete/5
        [Authorize]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return Json("Error");
            }
            Class @class = db.Classes.Find(id);
            if (@class == null)
            {
                return Json("Error");
            }
            db.Classes.Remove(@class);
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