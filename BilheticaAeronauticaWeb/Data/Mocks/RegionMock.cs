using BilheticaAeronauticaWeb.Data.Entities;
using System.Collections.Generic;

namespace BilheticaAeronauticaWeb.Data.Mocks
{
    public class RegionMock : IMock<Region>
    {
        public IEnumerable<Region> GetAll()
        {
            var listRegions = new List<Region>();

            listRegions.Add(new Region { 
                Name = "Africa",
                Code = "AF"
            });

            listRegions.Add(new Region
            {
                Name = "North America",
                Code = "NA"
            });

         
            listRegions.Add(new Region
            {
                Name = "Asia & Pacific",
                Code = "APAC"
            });

      

            listRegions.Add(new Region
            {
                Name = "Europe",
                Code = "EU"
            });

            listRegions.Add(new Region
            {
                Name = "South America",
                Code = "SA"
            });


            return listRegions;
        }
    }
}
