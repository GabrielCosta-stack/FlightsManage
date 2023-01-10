using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class ICAOTDesignatorsRepository : GenericRepository<ICAOTypeDesignator>, IICAOTDesignatorsRepository
    {
        private readonly DataContext _context;

        public ICAOTDesignatorsRepository(DataContext context) : base(context)
        {
            _context = context;
        }



    }
}
