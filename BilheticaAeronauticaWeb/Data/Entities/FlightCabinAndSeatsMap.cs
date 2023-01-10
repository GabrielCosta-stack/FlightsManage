using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class FlightCabinAndSeatsMap : IEntity
    {
        [Key]
        public int Id { get; set; }

        public int FlightId { get; set; }

        public Flight Flight { get; set; }

        public List<FlightCabinMap> FlightCabinMap { get; set; }
    }
}
