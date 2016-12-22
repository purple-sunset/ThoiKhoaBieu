using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ThoiKhoaBieu.Models
{
    public class Class
    {
        [Display(Name="Mã lớp học")]
        public int ID { get; set; }

        [Display(Name = "Lớp học")]
        public string Name { get; set; }

        [Display(Name = "Số tiết học")]
        public int TimeCount { get; set; }

        [Display(Name = "Mã môn học")]
        public int SubjectID { get; set; }

        [ForeignKey("SubjectID")]
        public virtual Subject OfSubject { get; set; }
    }

    public class ClassViewModel
    {
        public ClassViewModel(Class cl)
        {
            this.ID = cl.ID;
            this.Name = cl.Name;
            this.TimeCount = cl.TimeCount;
            this.SubjectName = cl.OfSubject.Name;
        }

        [Display(Name = "Mã lớp học")]
        public int ID { get; set; }

        [Display(Name = "Lớp học")]
        public string Name { get; set; }

        [Display(Name = "Số tiết học")]
        public int TimeCount { get; set; }

        [Display(Name = "Môn học")]
        public String SubjectName { get; set; }
     
        
    }
}