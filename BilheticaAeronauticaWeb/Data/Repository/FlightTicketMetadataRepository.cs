using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using System.Collections.Generic;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class FlightTicketMetadataRepository : GenericRepository<FlightTicketPriceMetaData>, IFlightTicketMetadataRepository
    {
        private readonly DataContext _context;

        public FlightTicketMetadataRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public void RemoveRangeTicketPriceMetaData(List<FlightTicketPriceMetaData> list)
        {
            _context.FlightTicketPriceMetaData.RemoveRange(list);
            _context.SaveChanges();
        }
    }
}
