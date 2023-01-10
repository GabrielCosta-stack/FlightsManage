namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class FlightTicketPriceMetaData : IEntity
    {
        public int Id { get; set; }

        public int FlightId { get; set; }

        public Flight Flight { get; set; }

        public string CabinClass { get; set; }

        public long AdultPrice { get; set; }




    }
}
