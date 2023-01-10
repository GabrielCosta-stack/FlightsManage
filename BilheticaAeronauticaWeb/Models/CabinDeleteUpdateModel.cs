using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Models
{
    public class CabinDeleteUpdateModel
    {
        [Required(ErrorMessage = "Flight Company is required")]
        public int FlightCompanyId { get; set; }

        [Required(ErrorMessage = "Icao is required")]
        public int ICAOTypeDesignatorId { get; set; }

        [Required(ErrorMessage = "Cabin classe is required")]
        public string Class { get; set; }
    }
}
