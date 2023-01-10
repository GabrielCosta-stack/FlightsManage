using System.Collections.Generic;

namespace BilheticaAeronauticaWeb.Models
{
    public class FlightCreateModel
    {
        public int? Id { get; set; }

        public int CityAirporFromId { get; set; }

        public int CityAirporToId { get; set; }

        public int AircraftId { get; set; }

        public string DepartureTime { get; set; }

        public string DepartureDate { get; set; }

        public List<TicketMetadataModel> TicketsMetaData { get; set; }


    }
}
