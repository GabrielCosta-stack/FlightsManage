using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using BilheticaAeronauticaWeb.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class CityAirportRepository : GenericRepository<Aircraft>, ICityAirportRepository
    {
        private readonly DataContext _context;

        public CityAirportRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public  IQueryable<Country> GetAllWithInfo(string searchTerm)
        {
           return _context.Country
                .Include(a => a.CityAirports)
                .OrderBy(a => a.Name)
                .Filter(searchTerm)
                .AsQueryable()
                .AsNoTracking();
        }

        public async Task<object> GetAirportOptions()
        {
           
            var regions = await _context.Region.Select(r => new { regionName = r.Name, regionCode = r.Code }).Distinct().ToListAsync();

            return new { regions = regions };
        }

        public IQueryable<Country> GetAllByRegionWithInfo(string region)
        {
            return _context.Country
                 .Include(a => a.CityAirports)
                 .OrderBy(a => a.Name)
                 .Filter(region)
                 .AsQueryable()
                 .AsNoTracking();
        }

        public async Task<List<CityAirport>> GetAllCityAirports(string searchTerm)
        {
            var query = _context.CityAirport
                .Include(c => c.Country)
                 .OrderBy(a => a.AirportName)
                 .Search(searchTerm)
                 .AsQueryable();

            return await  query.ToListAsync();
        }




    }
}
