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
    public class RoomsController : Controller
    {
        private SchoolDbContext db = new SchoolDbContext();

        // GET: Rooms
        [Authorize]
        public ActionResult Index()
        {
            return View(db.Rooms.ToList());
        }



        // GET: Rooms/Create
        [Authorize]
        public ActionResult Create()
        {
            return View();
        }

        // POST: Rooms/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
      
        public ActionResult Create([Bind(Include = "Name,Capacity,HasProjector")] Room room)
        {
            if (ModelState.IsValid)
            {
                db.Rooms.Add(room);
                db.SaveChanges();
                return Json("OK");
            }

            return Json("Error");
        }

        // GET: Rooms/Edit/5
        [Authorize]
        public ActionResult Update(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return HttpNotFound();
            }
            return View(room);
        }

        // POST: Rooms/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        
        public ActionResult Update([Bind(Include = "ID,Name,Capacity,HasProjector")] Room room)
        {
            if (ModelState.IsValid)
            {
                db.Entry(room).State = EntityState.Modified;
                db.SaveChanges();
                return Json("OK");
            }
            return Json("Error");
        }

        // GET: Rooms/Delete/5
        [Authorize]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return Json("Error");
            }
            Room room = db.Rooms.Find(id);
            if (room == null)
            {
                return Json("Error");
            }
            db.Rooms.Remove(room);
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
