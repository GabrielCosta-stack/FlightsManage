using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class FlightSeatMapRepository : GenericRepository<FlightSeatMap>, IFlightSeatMapRepository
    {
        private readonly DataContext _context;

        public FlightSeatMapRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}
