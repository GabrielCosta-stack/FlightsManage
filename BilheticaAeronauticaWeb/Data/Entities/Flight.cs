using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class Flight : IEntity
    {
        [Key]
        public int Id { get; set; }

        public int CityAirporFromId { get; set; }
     
        public CityAirport CityAirporFrom { get; set; }

        public int CityAirporToId { get; set; }
  
        public CityAirport CityAirporTo { get; set; }



        public int AircraftId { get; set; }

    
        public Aircraft Aircraft { get; set; }

        public string DepartureTime { get; set; }

        public string DepartureDate { get; set; }

        public List<FlightTicketPriceMetaData> TicketsMetaData { get; set; }

        public string CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");
    }
}
