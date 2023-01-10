using System;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class Seat : IEntity
    {
        [Key]
        public int Id { get; set; }

        public int Line { get; set; }

        public string Column { get; set; }

        public int CabinId { get; set; }

        public Cabin Cabin { get; set; }

        public int Reserverd { get; set; } = 0;
        public string CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");
    }
}
