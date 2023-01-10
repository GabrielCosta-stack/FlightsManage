using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class FlightCabinAndSeatsMapRepository : GenericRepository<FlightCabinAndSeatsMap>, IFlightCabinAndSeatsMapRepository
    {
        private readonly DataContext _context;

        public FlightCabinAndSeatsMapRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<FlightCabinAndSeatsMap> GetByIdWithInfo(int id)
        {
            var aircraft = await _context
                .FlightCabinAndSeatsMap
                .Include(f => f.Flight)
                .Include(f => f.Flight.CityAirporFrom)
                .Include(f => f.Flight.CityAirporTo)
                .Include(f => f.FlightCabinMap)
                .ThenInclude(c => c.FlightSeatMap.OrderBy(seat => seat.Line).ThenBy(seat => seat.Column))
                .SingleOrDefaultAsync(i => i.Id == id);



            return aircraft;
        }
    }
}
