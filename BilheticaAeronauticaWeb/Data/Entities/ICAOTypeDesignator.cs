using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    [Table("ICAOTypeDesignator")]
    public class ICAOTypeDesignator : IEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string ICAOCode { get; set; }

        [Required]
        [MaxLength(10, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string IATATypeCode { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]
        public string Model { get; set; }

        public string CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");
    }
}
