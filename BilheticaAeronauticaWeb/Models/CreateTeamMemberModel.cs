using BilheticaAeronauticaWeb.Data.Entities;
using Microsoft.AspNetCore.Http;

namespace BilheticaAeronauticaWeb.Models
{
    public class CreateTeamMemberModel : User
    {
      
        public IFormFile ImageFile { get; set; }

        public string Role { get; set; }
    }
}
