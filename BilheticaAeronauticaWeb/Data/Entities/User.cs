using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class User : IdentityUser
    {
        [MaxLength(50, ErrorMessage = "The field {0} only cat contain {1} characters lenght")]
        public string FirstName { get; set; }

        [MaxLength(50, ErrorMessage = "The field {0} only cat contain {1} characters lenght")]
        public string LastName { get; set; }

        [MaxLength(100, ErrorMessage = "The field {0} only cat contain {1} characters lenght")]
        public string Address { get; set; }

        public string? ImageId { get; set; }

        public string FullName => $"{FirstName} {LastName}";
    }
}
