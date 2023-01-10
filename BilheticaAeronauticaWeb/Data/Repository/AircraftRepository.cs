using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class AircraftRepository : GenericRepository<Aircraft>, IAircraftRepository
    {
        private readonly DataContext _context;

        public AircraftRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public IQueryable<Aircraft> GetAllWithInfo()
        {
            return _context.Aircrafts
                .Include(a => a.FlightCompany)
                .Include(a => a.ICAOTypeDesignator)
                .Include(a => a.Cabins)
                
                .ThenInclude(c => 
                c.Seats.OrderBy( s => s.CabinId).OrderBy(s => s.Line).OrderBy(s => s.Column))
                .OrderBy(a => a.FlightCompany.CompanyName)
                .AsQueryable()
                .AsNoTracking();
                
                
                
        }

        public async Task<Aircraft> GetByIdWithCompanyAndICAO(int id)
        {
            var aircraft = await _context.Aircrafts
                .Include(a => a.ICAOTypeDesignator)
                .Include(a => a.FlightCompany)
                .Include(a => a.Cabins)
                .ThenInclude(s => s.Seats)
                .SingleOrDefaultAsync(i => i.Id == id);

            return aircraft;
        }

        public async Task<object> GetAicraftOptions()
        {
            var models = await _context.ICAOTypeDesignators.Select(m => new { id = m.Id, model = m.Model }).Distinct().ToListAsync();
            var flightCompanies = await _context.FlightCompanies.Select(fc => new {id = fc.Id, companyName = fc.CompanyName}).Distinct().ToListAsync();
           

            return new {models = models, flightCompanies = flightCompanies};
        }

        public async Task<List<Aircraft>> GetAircraftToUpdate(int ICAOTypeDesignatorId, int FlightCompanyId)
        {


            var aircrafts = await  _context.Aircrafts
                .Include(a => a.Cabins)
                .ThenInclude(c => c.Seats)
                .Where(a => a.ICAOTypeDesignatorId == ICAOTypeDesignatorId && a.FlightCompanyId == FlightCompanyId)
 
                .ToListAsync();
            
            return aircrafts;
        }


    }
}

