using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class CabinRepository : GenericRepository<Cabin>, ICabinRepository
    {
        private readonly DataContext _context;

        public CabinRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        
    }
}
