using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class FlightCabinMapRepository : GenericRepository<FlightCabinMap>, IFlightCabinMapRepository
    {
        private readonly DataContext _context;

        public FlightCabinMapRepository(DataContext context) : base(context)
        {
            _context = context;
        }
    }
}
