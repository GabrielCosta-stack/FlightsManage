using System.Collections.Generic;

namespace BilheticaAeronauticaWeb.Models
{
    public class UpdateColumnsModel
    {
        public int FlightCompanyId { get; set; }

        public int ICAOTypeDesignatorId { get; set; }

        public int Lines { get; set; }

        public string Class { get; set; }

        public List<string> Columns { get; set; } 
    }
}
