using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Models
{
    public class RecoverPasswordModel
    {
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
