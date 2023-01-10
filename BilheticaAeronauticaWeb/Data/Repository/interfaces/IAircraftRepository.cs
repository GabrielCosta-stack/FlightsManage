using BilheticaAeronauticaWeb.Data.Entities;

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository.interfaces
{
    public interface IAircraftRepository : IGenericRepository<Aircraft>
    {
        public IQueryable<Aircraft> GetAllWithInfo();

        public Task<Aircraft> GetByIdWithCompanyAndICAO(int id);

        public Task<object> GetAicraftOptions();

        public Task<List<Aircraft>> GetAircraftToUpdate(int ICAOTypeDesignatorId, int FlightCompanyId);
    }
}
