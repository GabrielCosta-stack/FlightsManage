using BilheticaAeronauticaWeb.Controllers.Api;
using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using BilheticaAeronauticaWeb.Extensions;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using BilheticaAeronauticaWeb.Models;
using BilheticaAeronauticaWeb.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using BilheticaAeronauticaWeb.Data.Repository;
using Microsoft.EntityFrameworkCore;

namespace BilheticaAeronauticaWeb.Controllers
{
    public class FlightsController : BaseApiController
    {
        private readonly IFlightRepository _flightRepository;
        private readonly IConverterHelper _converterHelper;
        private readonly IFlightTicketMetadataRepository _flightTicketMetadataRepository;
        private readonly ICityAirportRepository _cityAirportRepository;
        private readonly IAircraftRepository _aircraftRepository;
        private readonly IFlightCabinAndSeatsMapRepository _flightCabinAndSeatsMapRepository;
        private readonly IFlightCabinMapRepository _flightCabinMapRepository;
        private readonly IFlightSeatMapRepository _flightSeatMapRepository;

        public FlightsController(IFlightRepository flightRepository,
            IConverterHelper converterHelper,
            IFlightTicketMetadataRepository flightTicketMetadataRepository,
            ICityAirportRepository cityAirportRepository,
            IAircraftRepository aircraftRepository,
            IFlightCabinAndSeatsMapRepository flightCabinAndSeatsMapRepository,
            IFlightCabinMapRepository flightCabinMapRepository,
            IFlightSeatMapRepository flightSeatMapRepository)
        {
            _flightRepository = flightRepository;
            _converterHelper = converterHelper;
            _flightTicketMetadataRepository = flightTicketMetadataRepository;
            _cityAirportRepository = cityAirportRepository;
            _aircraftRepository = aircraftRepository;
            _flightCabinAndSeatsMapRepository = flightCabinAndSeatsMapRepository;
            _flightCabinMapRepository = flightCabinMapRepository;
            _flightSeatMapRepository = flightSeatMapRepository;
        }

        [HttpGet]
        [Route("getflights")]
        public async Task<ActionResult<PagedList<Flight>>> Index([FromQuery] FlightsParams flightsParams)
        {
            var query = _flightRepository.GetAllWithInfo();

            var flights = await PagedList<Flight>.ToPagedList(
                query, flightsParams.PageNumber,
                flightsParams.PageSize);

            Response.AddPaginationHeader(flights.MetaData);

            return flights;
        }

        [HttpPost]
        [Route("createflight")]
        public async Task<IActionResult> CreateFlight(FlightCreateModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (model.TicketsMetaData.Count == 0)
                return BadRequest();

            var flight = _converterHelper.ToFlight(model, true);

            await _flightRepository.CreateAsync(flight);

            if(flight != null)
            {
                var aircraft = await _aircraftRepository.GetByIdWithCompanyAndICAO(model.AircraftId);

                if (aircraft == null)
                    return NotFound();

                //aircraft.AttachedToFlight = 1;

                //await _aircraftRepository.UpdateAsync(aircraft);

                FlightCabinAndSeatsMap flightCabinAndSeatsMap = new FlightCabinAndSeatsMap();

                flightCabinAndSeatsMap.FlightId = flight.Id;

                await _flightCabinAndSeatsMapRepository.CreateAsync(flightCabinAndSeatsMap);

                

                foreach (Cabin cabin in aircraft.Cabins)
                {
                    FlightCabinMap flightCabinMap = new FlightCabinMap();

                    flightCabinMap.Class = cabin.Class;
                    flightCabinMap.FlightCabinAndSeatsMapId = flightCabinAndSeatsMap.Id;

                    await _flightCabinMapRepository.CreateAsync(flightCabinMap);

                    foreach (Seat seat in cabin.Seats)
                    {
                        FlightSeatMap flightSeatMap = new FlightSeatMap();

                        flightSeatMap.Column = seat.Column;
                        flightSeatMap.Line = seat.Line;
                        flightSeatMap.FlightCabinMapId = flightCabinMap.Id;

                        await _flightSeatMapRepository.CreateAsync(flightSeatMap);
                    }
                }


            }

            foreach (var TkMetaData in model.TicketsMetaData)
            {
                FlightTicketPriceMetaData ftpm = new FlightTicketPriceMetaData();

                ftpm.FlightId = flight.Id;
                ftpm.AdultPrice = TkMetaData.AdultPrice;
                ftpm.CabinClass = TkMetaData.CabinClass;

                await _flightTicketMetadataRepository.CreateAsync(ftpm);
            }


            return Ok();
        }

        [HttpGet]
        [Route("getflightbyid/{id}")]
        public async Task<IActionResult> GetById(int? id)
        {
            if (id == null)
                return NotFound();

            var flightCompany = await _flightRepository.GetByIdWithInfo(id.Value);

            if (flightCompany == null)
                return NotFound();

            return Ok(flightCompany);
        }

        [Route("getairportsbyregion")]
        public  ActionResult<List<Country>> Index([FromQuery] FlightAirportParams flightAirportParams)
        {

            var query = _cityAirportRepository.GetAllByRegionWithInfo(flightAirportParams.Region);
            
            return Ok(query);
        }

        [HttpPut]
        [Route("updateflight")]
        public async Task<IActionResult> UpdateFlight(FlightCreateModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            if (model.TicketsMetaData.Count == 0)
                return BadRequest();

            

            if (!await _flightRepository.ExistAsync(model.Id.Value))
                return NotFound();

            try
            {
                var flightAircraft = await _flightRepository.GetByIdAsync(model.Id.Value);
                

                if (flightAircraft != null)
                {
                    var flight = _converterHelper.ToFlight(model, false);
                    
                    if (flightAircraft.AircraftId != flight.AircraftId)
                    {
                        var aircraftAttachedFirst = await _aircraftRepository.GetByIdAsync(flightAircraft.AircraftId);

                        //aircraftAttachedFirst.AttachedToFlight = 0;

                        //await _aircraftRepository.UpdateAsync(aircraftAttachedFirst);

                        var aircraftAttachedOnUpdate = await _aircraftRepository.GetByIdAsync(flight.AircraftId);

                        aircraftAttachedOnUpdate.AttachedToFlight = 1;

                        await _aircraftRepository.UpdateAsync(aircraftAttachedOnUpdate);


                        var listTicketMatadata = await _flightRepository.GetByIdWithTicketMetadata(flight.Id);

                        foreach (var ticket in listTicketMatadata)
                        {
                            await _flightTicketMetadataRepository.DeleteAsync(ticket);
                        }

                        foreach (var newTicketMetadata in model.TicketsMetaData)
                        {
                            FlightTicketPriceMetaData ftpm = new FlightTicketPriceMetaData();

                            ftpm.FlightId = flight.Id;
                            ftpm.AdultPrice = newTicketMetadata.AdultPrice;
                            ftpm.CabinClass = newTicketMetadata.CabinClass;

                            await _flightTicketMetadataRepository.CreateAsync(ftpm);
                        }
                    }

                    if (flightAircraft.AircraftId == flight.AircraftId)
                    {

                        foreach (var tk in model.TicketsMetaData)
                        {
                            var convertTk = _converterHelper.ToTicketMetadata(tk, false);



                            convertTk.FlightId = flight.Id;




                            await _flightTicketMetadataRepository.UpdateAsync(convertTk);
                        }
                    }

                    await _flightRepository.UpdateAsync(flight);
                }
            }
            catch (Exception ex)
            {

                throw;
            }
            

            return Ok();
        }

        [Route("getflightsbysearch")]
        public async Task<ActionResult<dynamic>> GetFlightsBySearch([FromQuery] FlightsBySearchModel model)
        {

            var result = await _flightRepository.GetBySearch(
                model.LocationFrom,
                model.LocationTo,
                model.FlightDefinition,
                model.Dep,
                model.Ret,
                model.CabinClass
                );



            if ((model.FlightDefinition == "roundtrip" && result.Results.QueryOneway.Count == 0) ||
                (model.FlightDefinition == "roundtrip" && result.Results.QueryReturn.Count == 0) ||
                (model.FlightDefinition == "one-way" && result.Results.QueryOneway.Count == 0))
            {
                return StatusCode(404, new { Title = "There is no results for this search" });
            }

            return result;
        }

        [HttpGet]
        [Route("getflightseatmapbyid/{id}")]
        public async Task<ActionResult<FlightCabinAndSeatsMap>> GetFlightSeatmap(int? id)
        {
            if (id == null)
                return NotFound();

            var cabinAndSeatsMap = await _flightCabinAndSeatsMapRepository.GetByIdWithInfo(id.Value);

            if (cabinAndSeatsMap == null)
                return NotFound();

            return Ok(cabinAndSeatsMap);


        }

        [HttpDelete]
        [Route("deleteflight/{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();


            var flight = await _flightRepository.GetByIdAsync(id.Value);

            if (flight == null)
                return NotFound();


            try
            {
                await _flightRepository.DeleteAsync(flight);

                return Ok("Flight successfully deleted");

            }
            catch (DbUpdateException ex)
            {
                string ErrorMessage = "";

                if (ex.InnerException.Message.Contains("DELETE"))
                {
                    ErrorMessage = $"Flight is being used, it cannot be deleted";

                }

                return BadRequest(new ProblemDetails { Title = ErrorMessage });


            }
        }
    }
}
