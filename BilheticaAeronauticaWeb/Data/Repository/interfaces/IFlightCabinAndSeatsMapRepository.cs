using BilheticaAeronauticaWeb.Data.Entities;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Repository.interfaces
{
    public interface IFlightCabinAndSeatsMapRepository : IGenericRepository<FlightCabinAndSeatsMap>
    {
        Task<FlightCabinAndSeatsMap> GetByIdWithInfo(int id);
    }
}
