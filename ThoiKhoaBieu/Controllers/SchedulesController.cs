using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using ThoiKhoaBieu.Models;

namespace ThoiKhoaBieu.Controllers
{
    public class SchedulesController : Controller
    {
        private SchoolDbContext db = new SchoolDbContext();

        // GET: Schedules
        [Authorize(Roles="Admin")]
        public ActionResult Index()
        {
            var schedules = db.Schedules;
            List<ScheduleViewModel> model = new List<ScheduleViewModel>();
            foreach (Schedule sc in schedules)
            {
                sc.OfRoom = db.Rooms.Find(sc.RoomID);
                sc.OfClass = db.Classes.Find(sc.ClassID);
                if (sc.OfClass != null) sc.OfClass.OfSubject = db.Subjects.Find(sc.OfClass.SubjectID);
                ScheduleViewModel m = new ScheduleViewModel(sc);
                model.Add(m);
            }
            return View(model);
        }


        // GET: Schedules/Create
        [Authorize(Roles = "Admin")]
        public ActionResult Create()
        {
            ViewBag.ClassID = new SelectList(db.Classes, "ID", "Name");
            ViewBag.RoomID = new SelectList(db.Rooms, "ID", "Name");
            return View();
        }

        // POST: Schedules/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        
        public ActionResult Create([Bind(Include = "DayOfWeek,PartOfDay,TimeStart,TimeEnd,RoomID,ClassID")] Schedule schedule)
        {
            if (ModelState.IsValid)
            {
                db.Schedules.Add(schedule);
                db.SaveChanges();
                return Json("OK");
            }

            ViewBag.ClassID = new SelectList(db.Classes, "ID", "Name", schedule.ClassID);
            ViewBag.RoomID = new SelectList(db.Rooms, "ID", "Name", schedule.RoomID);
            return Json("Error");
        }

        // GET: Schedules/Edit/5
        [Authorize(Roles = "Admin")]
        public ActionResult Update(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Schedule schedule = db.Schedules.Find(id);
            if (schedule == null)
            {
                return HttpNotFound();
            }
            ViewBag.ClassID = new SelectList(db.Classes, "ID", "Name", schedule.ClassID);
            ViewBag.RoomID = new SelectList(db.Rooms, "ID", "Name", schedule.RoomID);
            return View(schedule);
        }

        // POST: Schedules/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Update([Bind(Include = "ID,DayOfWeek,PartOfDay,TimeStart,TimeEnd,RoomID,ClassID")] Schedule schedule)
        {
            if (ModelState.IsValid)
            {
                db.Entry(schedule).State = EntityState.Modified;
                db.SaveChanges();
                return Json("OK");
            }
            ViewBag.ClassID = new SelectList(db.Classes, "ID", "Name", schedule.ClassID);
            ViewBag.RoomID = new SelectList(db.Rooms, "ID", "Name", schedule.RoomID);
            return Json("Error");
        }

        // GET: Schedules/Delete/5
        [Authorize(Roles = "Admin")]
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return Json("Error");
            }
            Schedule schedule = db.Schedules.Find(id);
            if (schedule == null)
            {
                return Json("Error");
            }
            db.Schedules.Remove(schedule);
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
