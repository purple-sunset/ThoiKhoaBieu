using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThoiKhoaBieu.Models
{
    public class Subject
    {
        [Display(Name = "Mã môn học")]
        public int ID { get; set; }

        [Display(Name = "Môn học")]
        public string Name { get; set; }

        [Display(Name = "Cần máy chiếu")]
        public bool RequireProjector { get; set; }
    }
}