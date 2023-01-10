using BilheticaAeronauticaWeb.Data.Entities;
using Microsoft.AspNetCore.Http;

namespace BilheticaAeronauticaWeb.Models
{
    public class FlightCompanyModel : FlightCompany 
    {
        public IFormFile ImageFile { get; set; }
    }
}
