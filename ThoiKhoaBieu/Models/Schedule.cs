using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ThoiKhoaBieu.Models
{
    public class Schedule
    {
        [Display(Name = "Mã")]
        public int ID { get; set; }

        [Display(Name = "Thứ")]
        public int DayOfWeek { get; set; }

        [Display(Name = "Buổi")]
        public int PartOfDay { get; set; }

        [Display(Name = "Bắt đầu")]
        public int TimeStart { get; set; }

        [Display(Name = "Kết thúc")]
        public int TimeEnd { get; set; }

        [Display(Name = "Mã phòng học")]
        public int RoomID { get; set; }

        [Display(Name = "Mã lớp học")]
        public int ClassID { get; set; }

        [ForeignKey("RoomID")]
        public virtual Room OfRoom { get; set; }

        [ForeignKey("ClassID")]
        public virtual Class OfClass { get; set; }
    }

    public class ScheduleViewModel
    {
        public ScheduleViewModel(Schedule sc)
        {
            this.ID = sc.ID;
            this.DayOfWeek = sc.DayOfWeek;
            this.PartOfDay = sc.PartOfDay;
            this.TimeLong = sc.TimeStart + " - " + sc.TimeEnd;
            this.RoomName = sc.OfRoom.Name;
            this.ClassName = sc.OfClass.Name;
            this.SubjectName = sc.OfClass.OfSubject.Name;
        }

        [Display(Name = "Mã")]
        public int ID { get; set; }

        [Display(Name = "Thứ")]
        public int DayOfWeek { get; set; }

        [Display(Name = "Buổi")]
        public int PartOfDay { get; set; }

        [Display(Name = "Tiết")]
        public string TimeLong { get; set; }

        [Display(Name = "Phòng học")]
        public string RoomName { get; set; }

        [Display(Name = "Lớp học")]
        public string ClassName { get; set; }

        [Display(Name = "Môn học")]
        public string SubjectName { get; set; }
    }
}