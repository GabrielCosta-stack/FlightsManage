using BilheticaAeronauticaWeb.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace BilheticaAeronauticaWeb.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        public DbSet<Aircraft> Aircrafts { get; set; }

        public DbSet<FlightCompany> FlightCompanies { get; set; }

        public DbSet<ICAOTypeDesignator> ICAOTypeDesignators { get; set; }

        public DbSet<Cabin> Cabins { get; set; }

        public DbSet<Seat> Seats { get; set; }

        public DbSet<CityAirport> CityAirport { get; set; }

        public DbSet<Country> Country { get; set; }

        public DbSet<Region> Region { get; set; }

        public DbSet<Flight> Flight { get; set; }

        public DbSet<FlightTicketPriceMetaData> FlightTicketPriceMetaData { get; set; }

        public DbSet<FlightCabinAndSeatsMap> FlightCabinAndSeatsMap { get; set; }

        public DbSet<FlightCabinMap> FlightCabinMap { get; set; }

        public DbSet<FlightSeatMap> FlightSeatMap { get; set; }

        public DbSet<FlightTicket> FlightTickets { get; set; }

        public DataContext (DbContextOptions<DataContext> options) : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            //foreach (var relationship in builder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            //{

            //    relationship.DeleteBehavior = DeleteBehavior.Restrict;
            //    Console.WriteLine(relationship);
            //}
           

            builder.Entity<Aircraft>()
                .HasOne(icao => icao.ICAOTypeDesignator)
                .WithMany()
                .HasForeignKey(icao => icao.ICAOTypeDesignatorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Aircraft>()
                .HasOne(company => company.FlightCompany)
                .WithMany()
                .HasForeignKey(company => company.FlightCompanyId)
                .OnDelete(DeleteBehavior.Restrict);

           

            builder.Entity<Flight>()
                .HasOne(airport => airport.CityAirporTo)
                .WithMany()
                .HasForeignKey(airport => airport.CityAirporToId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Flight>()
                .HasOne(airport => airport.CityAirporFrom)
                .WithMany()
                .HasForeignKey(airport => airport.CityAirporFromId)
                .OnDelete(DeleteBehavior.Restrict);

            //builder.Entity<FlightTicket>()
            //   .HasOne(flight => flight.Flight)
            //   .WithMany()
            //   .HasForeignKey(flight => flight.FlightId)
            //   .OnDelete(DeleteBehavior.Restrict);

           
            builder.Entity<FlightTicket>()
               .HasOne(flight => flight.User)
               .WithMany()
               .HasForeignKey(flight => flight.UserId)
               .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
        }
    }
}
