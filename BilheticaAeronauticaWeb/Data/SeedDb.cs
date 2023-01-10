using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Mocks;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data
{
    public class SeedDb
    {
        private readonly DataContext _context;
        private readonly ICAOTypeDesignatorsMock _icaoTypeDesignators;
        private readonly FlightCompanyMock _flightCompanies;
        private readonly RegionMock _regions;
        private readonly CountryMock _countries;
        private readonly CityAirportMock _cityAirport;
        private readonly IUserHelper _userHelper;

        public SeedDb(
            DataContext context,
            ICAOTypeDesignatorsMock icaoTypeDesignators,
            FlightCompanyMock flightCompanies,
            RegionMock regions,
            CountryMock countries,
            CityAirportMock cityAirport,
            IUserHelper userHelper
            )
        {
            _context = context;
            _icaoTypeDesignators = icaoTypeDesignators;
            _flightCompanies = flightCompanies;
            _regions = regions;
            _countries = countries;
            _cityAirport = cityAirport;
            _userHelper = userHelper;
        }

        public async Task SeedAsync()
        {
            await _context.Database.EnsureCreatedAsync();

            await ICAOTypeDesignatorsAsync();
            await FlightCompanyAsync();
            await RegionsAsync();
            await CountriesAsync();
            await CreateUserRolesAsync();
            await CreateUsersAsync();

        }

        public async Task CreateUserRolesAsync()
        {
            await _userHelper.CheckRoleAsync("Admin");
            await _userHelper.CheckRoleAsync("TeamMember");
            await _userHelper.CheckRoleAsync("Customer");
        }

        public async Task CreateUsersAsync()
        {
            var adminUser = await _userHelper.GetUserByEmailAsync("admin@mail.com");

            if (adminUser == null)
            {
                adminUser = new User
                {
                    FirstName = "Gabriel",
                    LastName = "Costa",
                    Email = "admin@mail.com",
                    UserName = "admin@mail.com",
                    PhoneNumber = "22323232232",
                    Address = "Admin Address",
                    EmailConfirmed = true
                };

                var result = await _userHelper.AddUserAsync(adminUser, "123456");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create the user, in seeder class");
                }

                await _userHelper.AddUserToRoleAsync(adminUser, "Admin");  
            }

            var isAdminInRole = await _userHelper.IsUserInRoleAsync(adminUser, "Admin");

            if (!isAdminInRole)
            {
                await _userHelper.AddUserToRoleAsync(adminUser, "Admin");
            }

            // TEAM USER

            var teamUser = await _userHelper.GetUserByEmailAsync("team@mail.com");

            if (teamUser == null)
            {
                teamUser = new User
                {
                    FirstName = "Paulo",
                    LastName = "Amaral",
                    Email = "team@mail.com",
                    UserName = "team@mail.com",
                    PhoneNumber = "22323232232",
                    Address = "Admin Address",
                    EmailConfirmed = true
                };

                var result = await _userHelper.AddUserAsync(teamUser, "123456");

                if (result != IdentityResult.Success)
                {
                    throw new InvalidOperationException("Could not create the user, in seeder class");
                }

                await _userHelper.AddUserToRoleAsync(teamUser, "TeamMember");
            }

            var isTeamMemberInRole = await _userHelper.IsUserInRoleAsync(teamUser, "TeamMember");

            if (!isTeamMemberInRole)
            {
                await _userHelper.AddUserToRoleAsync(teamUser, "TeamMember");
            }
        }

        public async Task RegionsAsync()
        {
            if(!_context.Region.Any())
            {
                foreach (var region in _regions.GetAll())
                {
                    _context.Region.Add(region);
                }

                await _context.SaveChangesAsync();
            }
        }


        public async Task CountriesAsync()
        {
            if (!_context.Country.Any() && !_context.CityAirport.Any())
            {
                foreach (var country in _countries.GetAll())
                {
                    _context.Country.Add(country);

                    foreach ( var cityAirport in _cityAirport.GetAll())
                    {
                        if(cityAirport.CountryCode == country.Code)
                        {
                            cityAirport.Country = country;

                            _context.CityAirport.Add(cityAirport);
                        }

                    }
                }

                await _context.SaveChangesAsync();
            }
        }

        public async Task ICAOTypeDesignatorsAsync()
        {
            if (!_context.ICAOTypeDesignators.Any())
            {
                foreach (var icaoType in _icaoTypeDesignators.GetAll())
                {
                    _context.ICAOTypeDesignators.Add(icaoType);
                }

                await _context.SaveChangesAsync();
            }

        }

        public async Task FlightCompanyAsync()
        {
            if (!_context.FlightCompanies.Any())
            {
                foreach (var company in _flightCompanies.GetAll())
                {
                    _context.FlightCompanies.Add(company);
                }

                await _context.SaveChangesAsync();
            }
        }

       
    }
}
