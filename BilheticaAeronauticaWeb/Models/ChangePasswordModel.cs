using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Models
{
    public class ChangePasswordModel
    {
        [Required]
       
        public string OldPassword { get; set; }

        [Required]
      
        public string NewPassword { get; set; }
    }
}
