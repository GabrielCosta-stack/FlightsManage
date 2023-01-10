using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class FlightCompany : IEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string CompanyName { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string Country { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string IataDesignator { get; set; }
        [Required]
        [MaxLength(10, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string ICAOCode { get; set; }


        [Required]
        [MaxLength(50, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string Region { get; set; }

        public string ImageId { get; set; }

        public string ImageFullPath => ImageId;

        public string CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");

    }
}
