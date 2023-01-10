using System.Collections.Generic;

namespace BilheticaAeronauticaWeb.Models
{
    public class CabinTypeModel
    {
        public string Class { get; set; }

        public int Lines { get; set; }

        public List<string> Columns { get; set; } = new();
    }
}
