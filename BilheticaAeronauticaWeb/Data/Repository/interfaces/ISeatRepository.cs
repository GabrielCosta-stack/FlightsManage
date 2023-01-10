using BilheticaAeronauticaWeb.Data.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository.interfaces
{
    public interface ISeatRepository : IGenericRepository<Seat>
    {
        public void RemoveSeatByLineAsync(int lineNr);
  
    }
}
