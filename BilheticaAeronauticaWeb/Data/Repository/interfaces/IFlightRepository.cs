using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Helper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository.interfaces
{
    public interface IFlightRepository : IGenericRepository<Flight>
    {
        IQueryable<Flight> GetAllWithInfo();
        Task<Flight> GetByIdWithInfo(int id);
        Task<List<FlightTicketPriceMetaData>> GetByIdWithTicketMetadata(int id);
        Task<ResponseHelper> GetBySearch(string locationFromIataCode,
            string locationToIataIataCode,
            string flightDefinition,
            string departureDate,
            string returningDate,
            string cabinClass);



    }
}
