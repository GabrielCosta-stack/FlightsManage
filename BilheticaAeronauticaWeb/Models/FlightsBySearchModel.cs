

namespace BilheticaAeronauticaWeb.Models
{
    public class FlightsBySearchModel
    {
        public string LocationFrom { get; set; }
        public string LocationTo { get; set; }
        public string FlightDefinition { get; set; }

        public string Dep { get; set; }

        public string CabinClass { get; set; }

#nullable enable
        public string?Ret { get; set; }

        


    }
}
