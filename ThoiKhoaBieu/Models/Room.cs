using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThoiKhoaBieu.Models
{
    public class Room
    {
        [Display(Name = "Mã phòng học")]
        public int ID { get; set; }

        [Display(Name = "Phòng học")]
        public string Name { get; set; }

        [Display(Name = "Sức chứa")]
        public int Capacity { get; set; }

        [Display(Name = "Máy chiếu")]
        public bool HasProjector { get; set; }
    }
}