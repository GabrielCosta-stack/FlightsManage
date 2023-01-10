using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository
{
    public class SeatRepository : GenericRepository<Seat>, ISeatRepository
    {
        private readonly DataContext _context;

        public SeatRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public void RemoveSeatByLineAsync(int lineNr)
        {
            var seatsToDelete = _context.Seats.Where(s => s.Line == lineNr);
            _context.Seats.RemoveRange(seatsToDelete);
            _context.SaveChanges();
        }

       
    }
}
