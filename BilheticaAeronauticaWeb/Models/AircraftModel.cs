using BilheticaAeronauticaWeb.Data.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Models
{
    public class AircraftModel
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "Models Quantity is required")]
        public int ModelsQuantity { get; set; }

        public int FlightCompanyId { get; set; }

        public int ICAOTypeDesignatorId { get; set; }

        [Required(ErrorMessage = "Cabin classes are required")]
        public List<CabinTypeModel> Cabins { get; set; }

        

        
    }
}
