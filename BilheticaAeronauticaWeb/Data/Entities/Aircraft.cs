using Microsoft.AspNetCore.Rewrite;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace BilheticaAeronauticaWeb.Data.Entities
{
    public class Aircraft : IEntity
    {
        [Key]
        public int Id { get; set; }

        public int FlightCompanyId { get; set; }

        public FlightCompany FlightCompany { get; set; }

        public int ICAOTypeDesignatorId { get; set; }

        public ICAOTypeDesignator ICAOTypeDesignator { get; set; }

        public List<Cabin> Cabins { get; set; }

        public int AttachedToFlight { get; set; } = 0;

        public string CreatedDate { get; set; } = DateTime.Now.ToString("dd-MM-yyyy");


    }
}
