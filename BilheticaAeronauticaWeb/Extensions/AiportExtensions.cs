using BilheticaAeronauticaWeb.Data.Entities;
using System.Collections.Generic;
using System.Linq;

namespace BilheticaAeronauticaWeb.Extensions
{
    public static class AiportExtensions
    {

        public static IQueryable<Country> Filter(this IQueryable<Country> query, string region)
        {
            var regionsList = new List<string>();

            if(!string.IsNullOrEmpty(region))
                regionsList.AddRange(region.ToLower().Split(",").ToList());

            query = region switch
            {
                "All" => query.OrderBy(c => c.Name),
                _ => query.Where(p => regionsList.Count == 0 || regionsList.Contains(p.Region.ToLower()))
            };

            return query;
        }

        public static IQueryable<CityAirport> Search(this IQueryable<CityAirport> query, string searchTerm)
        {
            //if(string.IsNullOrEmpty(searchTerm))
            //{
            //    return query;
            //}

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.AirportName.ToLower().StartsWith(searchTerm));
        }
    }
}
