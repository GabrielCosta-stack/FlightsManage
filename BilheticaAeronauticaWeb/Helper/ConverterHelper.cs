using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using BilheticaAeronauticaWeb.Models;
using System.Collections.Generic;

namespace BilheticaAeronauticaWeb.Helper
{
    public class ConverterHelper : IConverterHelper
    {

        public FlightTicketPriceMetaData ToTicketMetadata(TicketMetadataModel model, bool isNew)
        {
            return new FlightTicketPriceMetaData
            {
                Id = isNew ? 0 : (int)model.Id,
                AdultPrice = model.AdultPrice,
                CabinClass = model.CabinClass,
                
            };
        }
        public Flight ToFlight(FlightCreateModel model, bool isNew)
        {
            return new Flight {
                Id = isNew ? 0 : (int)model.Id,
                CityAirporFromId = model.CityAirporFromId,
                CityAirporToId = model.CityAirporToId,
                AircraftId = model.AircraftId,
                DepartureDate = model.DepartureDate,
                DepartureTime = model.DepartureTime
            };
        }
        public Aircraft ToAircraft(AircraftModel model, bool isNew)
        {
            return new Aircraft
            {
                Id = isNew ? 0 : (int)model.Id,
                ICAOTypeDesignatorId = model.ICAOTypeDesignatorId,
                FlightCompanyId = model.FlightCompanyId,
            };
        }

        public FlightCompany ToFlightCompany(FlightCompanyModel model, string imagePath, bool isNew)
        {
            return new FlightCompany {
                Id = isNew ? 0 : model.Id,
                CompanyName = model.CompanyName,
                Region = model.Region,
                Country = model.Country,
                ImageId = imagePath,
                ICAOCode = model.ICAOCode,
                IataDesignator = model.IataDesignator
            };
        }


        public ICAOTypeDesignator ToICAODesignator(ICAODesignatorModel model, bool isNew)
        {
            return new ICAOTypeDesignator {
                Id = isNew ? 0 : model.Id,
                Model = model.Model,
                IATATypeCode = model.IATATypeCode,
                ICAOCode = model.ICAOCode

            };
        }

        public FlightTicket ToFlightTicket(FlightTicketModel model, bool isNew)
        {
            return new FlightTicket {
                Id = isNew ? 0 : model.Id,
                
                From = model.From,
                To = model.To,
                CabinClass = model.CabinClass,
                Date = model.Date,
                Price = model.Price
            };
        }

        public User ToTeamMember(CreateTeamMemberModel model, string imagePath, bool isNew)
        {
            return new User {
                Id = model.Id,
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.UserName,
                UserName = model.UserName,
                Address = model.Address,
                PhoneNumber = model.PhoneNumber,
                ImageId = imagePath,
                EmailConfirmed = true
            };
        }

        public ICAODesignatorModel ToICAODesignatorModel(ICAOTypeDesignator icao)
        {
            throw new System.NotImplementedException();
        }

      
    }
}
