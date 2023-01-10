using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Models
{
    public class RegisterModel
    {
        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string UserName { get; set; }

        [MaxLength(100, ErrorMessage = "The Field {0} only can contain {1} characters length")]
        public string Address { get; set; }

        [MaxLength(20, ErrorMessage = "The Field {0} only can contain {1} characters length")]
        public string PhoneNumber { get; set; }

        public string Password { get; set; }
    }
}
