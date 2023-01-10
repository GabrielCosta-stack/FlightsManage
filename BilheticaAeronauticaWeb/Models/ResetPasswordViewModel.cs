using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Models
{
    public class ResetPasswordViewModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        public string Token { get; set; }
    }
}
