using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class Country : IEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Code  { get; set; }

        [Required]
        public string Region { get; set; }

        public List<CityAirport> CityAirports { get; set; }

        public string ImageFlagFullPath => $"https://countryflagsapi.com/svg/{Code}";

        public string CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");


    }
}
