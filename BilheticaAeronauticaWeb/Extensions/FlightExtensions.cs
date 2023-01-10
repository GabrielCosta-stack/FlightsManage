using BilheticaAeronauticaWeb.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BilheticaAeronauticaWeb.Extensions
{
    public static class FlightExtensions
    {
        public static IQueryable<Flight> FilterOneWay(
            this IQueryable<Flight> query,
            string locationFromIataCode,
            string locationToIataIataCode,
            string departureDate,
            string cabinClass
            )
        {


            return query.Where(
                     f => f.CityAirporFrom.IataCode == locationFromIataCode
                     && f.CityAirporTo.IataCode == locationToIataIataCode
                     && f.DepartureDate == departureDate
                     && f.TicketsMetaData.Any(tk => tk.CabinClass == cabinClass)
                    ) ;

        }

        public static IQueryable<Flight> FilterRoundTrip(
           this IQueryable<Flight> query,
           string locationFromIataCode,
           string locationToIataIataCode,
           string returnDate,
           string cabinClass
           )
        {
            return query.Where(
                     f => f.CityAirporFrom.IataCode == locationToIataIataCode
                     && f.CityAirporTo.IataCode == locationFromIataCode
                     && f.DepartureDate == returnDate
                     && f.TicketsMetaData.Any(tk => tk.CabinClass == cabinClass));

        }
    }
}
