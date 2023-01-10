using BilheticaAeronauticaWeb.RequestHelpers;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace BilheticaAeronauticaWeb.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, MetaData metaData)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            // Configure in client, to recognize this header
            response.Headers.Add("Pagination", JsonSerializer.Serialize(metaData, options));
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}
