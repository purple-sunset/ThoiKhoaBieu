using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThoiKhoaBieu.Models
{
    public class UserViewModel
    {
        public UserViewModel(ApplicationUser user)
        {
            this.UserId = user.Id;
            this.UserName = user.UserName;
            this.FullName = user.FullName;
            this.Email = user.Email;
            this.Role = new ApplicationDbContext().Roles.Find(user.Roles.FirstOrDefault()?.RoleId).Name;
        }

        public string UserId { get; set; }
        [Display(Name = "Tên tài khoản")]
        public string UserName { get; set; }

        [Display(Name = "Họ và Tên")]
        public string FullName { get; set; }
        
        [Display(Name = "E-mail")]
        [EmailAddress]
        public string Email { get; set; }

        [Display(Name = "Quyền")]
        public string Role { get; set; }
    }
}