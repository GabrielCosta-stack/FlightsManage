namespace BilheticaAeronauticaWeb.Models
{
    public class FlightTicketModel
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public int FlightSeatMapId { get; set; }

        public int FlightId { get; set; }
     
        public string From { get; set; }

        public string To { get; set; }

        public string CabinClass { get; set; }

        public string SeatNumber { get; set; }

        public string Date { get; set; }

        public string Price { get; set; }
    }
}
