using System;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class CityAirport : IEntity
    {
        [Key]
        public int Id { get; set; }

        public int CountryId { get; set; }

        public Country Country { get; set; }

        [Required]
        [MaxLength(200, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string AirportName { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string IataCode { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string City { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string CountryCode { get; set; }


        [Required]
        public string CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");


    }
}
