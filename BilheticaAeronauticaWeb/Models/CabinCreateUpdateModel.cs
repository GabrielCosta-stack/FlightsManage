using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Models
{
    public class CabinCreateUpdateModel 
    {
        public int FlightCompanyId { get; set; }

        public int ICAOTypeDesignatorId { get; set; }

        [Required(ErrorMessage = "Cabin classes are required")]
        public List<CabinTypeModel> Cabins { get; set; }
    }
}
