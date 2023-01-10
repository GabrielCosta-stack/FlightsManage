
using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Models;

namespace BilheticaAeronauticaWeb.Helper.Interfaces
{
    public interface IConverterHelper
    {
        ICAOTypeDesignator ToICAODesignator (ICAODesignatorModel model, bool isNew);

        ICAODesignatorModel ToICAODesignatorModel(ICAOTypeDesignator icao);

        FlightCompany ToFlightCompany(FlightCompanyModel model, string imagePath, bool isNew);

        Aircraft ToAircraft(AircraftModel model, bool isNew);

        Flight ToFlight(FlightCreateModel model, bool isNew);

        FlightTicketPriceMetaData ToTicketMetadata(TicketMetadataModel model, bool isNew);

        FlightTicket ToFlightTicket(FlightTicketModel model, bool isNew);

        User ToTeamMember(CreateTeamMemberModel model, string imagePath, bool isNew);
    }
}
