using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class FlightCabinMap : IEntity
    {
        [Key]
        public int Id { get; set; }

        public int FlightCabinAndSeatsMapId { get; set; }

        public FlightCabinAndSeatsMap FlightCabinAndSeatsMap { get; set; }

        public string Class { get; set; }

        public List<FlightSeatMap> FlightSeatMap { get; set; }
    }
}
