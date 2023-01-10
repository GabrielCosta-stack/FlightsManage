using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class Cabin : IEntity
    {
        [Key]
        public int Id { get; set; }

        public int AircraftId { get; set; }

        public Aircraft Aircraft { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "The Field {0} can contain {1} characters lenght.")]

        public string Class { get; set; }

        public List<Seat> Seats { get; set; }

        public string CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");
    }
}
