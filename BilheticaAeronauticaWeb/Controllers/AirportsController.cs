using BilheticaAeronauticaWeb.Controllers.Api;
using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using BilheticaAeronauticaWeb.Extensions;
using BilheticaAeronauticaWeb.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Controllers
{
    public class AirportsController : BaseApiController
    {
        private readonly ICityAirportRepository _cityAirportRepository;

        public AirportsController(ICityAirportRepository cityAirportRepository)
        {
            _cityAirportRepository = cityAirportRepository;
        }

        [Route("getairports")]
        public async Task<ActionResult<PagedList<Country>>> Index([FromQuery] AirportParams airportParams)
        {
            var query = _cityAirportRepository.GetAllWithInfo(airportParams.Region);

            var airports = await PagedList<Country>.ToPagedList(
                query, airportParams.PageNumber,
                airportParams.PageSize);

            Response.AddPaginationHeader(airports.MetaData);

            return airports;
        }

        [HttpGet("airportOptions")]
        public async Task<IActionResult> GetAiportOptions()
        {
            return Ok(await _cityAirportRepository.GetAirportOptions());
        }

        [HttpGet("cityAirports")]
        public async Task<ActionResult<List<CityAirport>>> GetCityAirports(string searchTerm)
        {
            
            if(string.IsNullOrEmpty(searchTerm))
                return Ok(new List<CityAirport>());

            return await _cityAirportRepository.GetAllCityAirports(searchTerm);
        }

    }
}
