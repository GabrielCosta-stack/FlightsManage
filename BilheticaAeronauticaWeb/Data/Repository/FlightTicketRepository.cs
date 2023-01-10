using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class FlightTicketRepository : GenericRepository<FlightTicket>, IFlightTicketRepository
    {
        private readonly DataContext _context;

        public FlightTicketRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}
