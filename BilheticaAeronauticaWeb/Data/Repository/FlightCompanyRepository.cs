using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class FlightCompanyRepository : GenericRepository<FlightCompany>, IFlightCompanyRepository
    {
        private readonly DataContext _context;

        public FlightCompanyRepository(DataContext context) : base(context)
        {
            _context = context;
        }
        public async Task<List<dynamic>> GetFlighCompanyNames()
        {
           
            var flightCompanies = await _context.FlightCompanies.Select(fc => new { id = fc.Id, companyName = fc.CompanyName }).Distinct().ToListAsync<dynamic>();

            return flightCompanies;
        }
        public async Task<object> GetFlightCompanyOptions()
        {
           
            var countries = await _context.Country.Select(c => new { id = c.Id, country = c.Name }).Distinct().OrderBy(c => c.country).ToListAsync();
            var regions = await _context.Region.Select(r => new { id = r.Id, region = r.Name  }).Distinct().OrderBy(c => c.region).ToListAsync();

            return new { countries = countries, regions = regions };
        }
    }
}
