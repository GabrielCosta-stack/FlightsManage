using BilheticaAeronauticaWeb.Data.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository.interfaces
{
    public interface ICityAirportRepository : IGenericRepository<Aircraft>
    {
        public IQueryable<Country> GetAllWithInfo(string searchTerm);

        public Task<object> GetAirportOptions();

        public IQueryable<Country> GetAllByRegionWithInfo(string region);

        public Task<List<CityAirport>> GetAllCityAirports(string searchTerm);
    }
}
