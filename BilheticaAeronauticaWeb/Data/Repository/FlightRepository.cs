using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using BilheticaAeronauticaWeb.Extensions;
using BilheticaAeronauticaWeb.Helper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class ResponseData
    {
        public List<Flight> QueryOneway{ get; set; }
        public List<Flight> QueryReturn { get; set; }
    }

    public class FlightRepository : GenericRepository<Flight>, IFlightRepository
    {
        private readonly DataContext _context;

        public FlightRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public IQueryable<Flight> GetAllWithInfo()
        {
            return _context.Flight
                .Include(aircraft => aircraft.Aircraft)
                .ThenInclude(company => company.FlightCompany)
                .Include( meta => meta.TicketsMetaData)
                .Include(airport => airport.CityAirporFrom)
                .ThenInclude(country => country.Country)
                .Include( airport => airport.CityAirporTo)
                .ThenInclude(country => country.Country)
                .AsQueryable()
                .AsNoTracking();
        }

        public async Task<Flight> GetByIdWithInfo(int id)
        {
            var aircraft = await _context.Flight
                .Include(aircraft => aircraft.Aircraft)
                .Include(model => model.Aircraft.ICAOTypeDesignator)
                .Include(company => company.Aircraft.FlightCompany)
                
                .Include(meta => meta.TicketsMetaData)
                .Include(airport => airport.CityAirporFrom)
                .ThenInclude(country => country.Country)
                .Include(airport => airport.CityAirporTo)
                .ThenInclude(country => country.Country)
                .AsNoTracking()
                .SingleOrDefaultAsync(i => i.Id == id);

            return aircraft;
        }

        public async Task<List<FlightTicketPriceMetaData>> GetByIdWithTicketMetadata(int id)
        {
            var aircraft = await _context.FlightTicketPriceMetaData
                .Where(i => i.FlightId == id)
                .ToListAsync();

            return aircraft;
        }

        public  async Task<ResponseHelper> GetBySearch(string locationFromIataCode,
            string locationToIataIataCode,
            string flightDefinition,
            string departureDate,
            string returningDate,
            string cabinClass
            )
        {
        
            ResponseHelper response = new ResponseHelper();

            if (flightDefinition == "one-way")
            {
                var queryOneway = await _context.Flight
                   .Include(af => af.CityAirporFrom)
                   .Include(af => af.CityAirporFrom.Country)
                   .Include(at => at.CityAirporTo)
                   .Include(ac => ac.Aircraft.Cabins)
                   .Include(ac => ac.Aircraft.FlightCompany)
                   .Include(ac => ac.TicketsMetaData)
                   .FilterOneWay(
                   locationFromIataCode,
                   locationToIataIataCode,
                   departureDate,
                   cabinClass
                   ).ToListAsync();

                response.Results = new ResponseData { QueryOneway = queryOneway };
            }

            if(flightDefinition == "roundtrip")
            {
                var queryOneway = await _context.Flight
                   .Include(af => af.CityAirporFrom)
                   .Include(af => af.CityAirporFrom.Country)
                   .Include(at => at.CityAirporTo)
                   .Include(ac => ac.Aircraft.Cabins)
                   .Include(ac => ac.Aircraft.FlightCompany)
                   .Include(ac => ac.TicketsMetaData)
                   .FilterOneWay(
                   locationFromIataCode,
                   locationToIataIataCode,
                   departureDate,
                   cabinClass
                   ).ToListAsync();

                var queryReturn = await _context.Flight
                  .Include(af => af.CityAirporFrom)
                   .Include(af => af.CityAirporFrom.Country)
                   .Include(at => at.CityAirporTo)
                   .Include(ac => ac.Aircraft.Cabins)
                   .Include(ac => ac.Aircraft.FlightCompany)
                   .Include(ac => ac.TicketsMetaData)
                  .FilterRoundTrip(
                  locationFromIataCode,
                  locationToIataIataCode,
                  returningDate,
                  cabinClass
                  ).ToListAsync();

                response.Results = new ResponseData {
                    QueryOneway = queryOneway,
                    QueryReturn = queryReturn
                };
            }

            return response;
        }



    }

}
