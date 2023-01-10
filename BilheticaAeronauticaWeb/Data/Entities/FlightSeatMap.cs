using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class FlightSeatMap : IEntity
    {
        [Key]
        public int Id { get; set; }

        public int Line { get; set; }

        public string Column { get; set; }

        public string SeatNumber => $"{Line} {Column}";

        public int FlightCabinMapId { get; set; }

        public FlightCabinMap FlightCabinMap { get; set; }

        public int Reserverd { get; set; } = 0;
    }
}
