namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class FlightTicket : IEntity
    {
        public int Id { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
        
        public string From { get; set; }

        public string To { get; set; }
     
        public string CabinClass { get; set; }

        public string SeatNumber { get; set; }

        public string Date { get; set; } 

        public string Price { get; set; }

    }
}
