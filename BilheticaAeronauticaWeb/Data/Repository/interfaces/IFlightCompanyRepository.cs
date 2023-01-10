using BilheticaAeronauticaWeb.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository.interfaces
{
    public interface IFlightCompanyRepository : IGenericRepository<FlightCompany>
    {
        Task<List<object>> GetFlighCompanyNames();
        Task<object> GetFlightCompanyOptions();
    }
}
