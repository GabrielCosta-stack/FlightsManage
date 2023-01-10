using BilheticaAeronauticaWeb.Data.Entities;
using System.Collections.Generic;

namespace BilheticaAeronauticaWeb.Data.Repository.interfaces
{
    public interface IFlightTicketMetadataRepository : IGenericRepository<FlightTicketPriceMetaData>
    {
        void RemoveRangeTicketPriceMetaData(List<FlightTicketPriceMetaData> list);
    }
}
