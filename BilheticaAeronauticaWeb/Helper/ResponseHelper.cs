using BilheticaAeronauticaWeb.Data.Repository;

namespace BilheticaAeronauticaWeb.Helper
{
    public class ResponseHelper
    {
        public bool? IsSuccess { get; set; }

        public ResponseData Results { get; set; }
#nullable enable
        public string? Message { get; set; }

    }
}
