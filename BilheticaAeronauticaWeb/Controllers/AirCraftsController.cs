using BilheticaAeronauticaWeb.Controllers.Api;
using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using BilheticaAeronauticaWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using BilheticaAeronauticaWeb.RequestHelpers;
using BilheticaAeronauticaWeb.Extensions;

namespace BilheticaAeronauticaWeb.Controllers
{
    public class AirCraftsController : BaseApiController
    {
        private readonly IAircraftRepository _aircraftRepository;
        private readonly IConverterHelper _converterHelper;
        private readonly ICabinRepository _cabinRepository;
        private readonly ISeatRepository _seatRepository;

        public AirCraftsController(
            IAircraftRepository aircraftRepository,
            IConverterHelper converterHelper,
            ICabinRepository cabinRepository,
            ISeatRepository seatRepository
            )
        {
            _aircraftRepository = aircraftRepository;
            _converterHelper = converterHelper;
            _cabinRepository = cabinRepository;
            _seatRepository = seatRepository;
        }

        [Route("getaircrafts")]
        public async Task<ActionResult<PagedList<Aircraft>>> Index([FromQuery] AircraftParams aircraftParams)
        {
            var query = _aircraftRepository.GetAllWithInfo();

            var aircrafts = await PagedList<Aircraft>.ToPagedList(
                query, aircraftParams.PageNumber,
                aircraftParams.PageSize);

            Response.AddPaginationHeader(aircrafts.MetaData);

            return aircrafts;
        }

        [HttpPost]
        [Route("createaircraft")]
        public async Task<IActionResult> Create(AircraftModel model)
        {
            List<AircraftModel> aircraftsList = new();

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (model.Cabins.Count == 0)
                return BadRequest(new ProblemDetails { Title = "Cabin info must be provided" });

            for (int i = 0; i < model.ModelsQuantity; i++)
            {
                aircraftsList.Add(new AircraftModel
                {
                    FlightCompanyId = model.FlightCompanyId,
                    ICAOTypeDesignatorId = model.ICAOTypeDesignatorId,

                });
            }

            foreach (var device in aircraftsList)
            {
                var aircraft = _converterHelper.ToAircraft(device, true);

                await _aircraftRepository.CreateAsync(aircraft);

                Cabin cabin;
                Seat seat;

                foreach (CabinTypeModel ctm in model.Cabins)
                {
                    cabin = new Cabin();

                    cabin.Class = ctm.Class;
                    cabin.AircraftId = aircraft.Id;

                    await _cabinRepository.CreateAsync(cabin);

                    if (ctm.Lines > 0)
                    {
                        foreach (string column in ctm.Columns)
                        {
                            for (int i = 1; i <= ctm.Lines; i++)
                            {
                                seat = new Seat();

                                seat.CabinId = cabin.Id;
                                seat.Line = i;
                                seat.Column = column;

                                await _seatRepository.CreateAsync(seat);
                            }
                        }

                    }
                }

            }






            return Ok(aircraftsList.Count);
        }

        [HttpGet]
        [Route("getaircraftbyid/{id}")]
        public async Task<IActionResult> GetById(int? id)
        {
            if (id == null)
                return NotFound();

            var aircraft = await _aircraftRepository.GetByIdWithCompanyAndICAO(id.Value);

            if (aircraft == null)
                return NotFound();

            return Ok(aircraft);
        }

        [HttpPut]
        [Route("deletecabinupdate")]
        public async Task<IActionResult> DeleteCabinUpdate(CabinDeleteUpdateModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                   var aircrafts = await _aircraftRepository.GetAircraftToUpdate(model.ICAOTypeDesignatorId, model.FlightCompanyId);

                    foreach (var aircraft in aircrafts)
                    {
                        foreach (var cabin in aircraft.Cabins.ToList())
                        {
                            if(cabin.Class == model.Class)
                            {
                                await _cabinRepository.DeleteAsync(cabin);
                            }
                        }
                    }
                        
                    return Ok();
                   
                   
                }
                catch (DbUpdateConcurrencyException ex)
                {
                  
                   throw;
                   
                }

                
            }
            return Ok();

        }

        [HttpPut]
        [Route("updatecolumns")]
        public async Task<IActionResult> UpdateCabinsColumns(UpdateColumnsModel model)
        {
            var aircrafts = await _aircraftRepository.GetAircraftToUpdate(model.ICAOTypeDesignatorId, model.FlightCompanyId);

            foreach (var item in aircrafts)
            {
                if (item.Cabins.Count > 0)
                {
                    foreach (var cabin in item.Cabins.ToList())
                    {
                        if (cabin.Class == model.Class)
                        {
                           
                            List<string> existingColumns = new();
                            
                            foreach (var seat in cabin.Seats.ToList())
                            {  
                                if (!model.Columns.Contains(seat.Column))
                                {
                                    await _seatRepository.DeleteAsync(seat);

                                }

                                if (!existingColumns.Contains(seat.Column))
                                    existingColumns.Add(seat.Column);
                            }

                            var maxLineValue = cabin.Seats.Select(x => x.Line).DefaultIfEmpty(1).Max();

                            List<Seat> seatList = cabin.Seats.Select(s => s).ToList();

                            foreach (var col in model.Columns)
                            {
                                int seatLineMax = seatList.Where(s => s.Column == col).Select(s => s.Line).DefaultIfEmpty(-1).Max();

                                if(seatLineMax < model.Lines && seatLineMax != -1)
                                {
                                    for (int i = seatLineMax; i < model.Lines; i++)
                                    {
                                        Seat newSeat = new Seat();
                                        newSeat.Column = col;
                                        newSeat.Line = i + 1;
                                        newSeat.CabinId = cabin.Id;

                                        await _seatRepository.CreateAsync(newSeat);
                                    }
                                }

                                if (seatLineMax > model.Lines && seatLineMax != -1)
                                {
                                    Console.WriteLine(seatLineMax);

                                    for (int i = maxLineValue; i > model.Lines; i--)
                                    { 
                                        _seatRepository.RemoveSeatByLineAsync(i);
                                    }
                                }
                               
                                if(seatLineMax == -1)
                                {
                                    for (int i = 1; i <= model.Lines; i++)
                                    {
                                        Seat newSeat = new Seat();
                                        newSeat.Column = col;
                                        newSeat.Line = i;
                                        newSeat.CabinId = cabin.Id;

                                        await _seatRepository.CreateAsync(newSeat);
                                    }
                                }

                            }

                        }

                    }
                }
            }

            return Ok();
        }

        [HttpPut]
        [Route("createcabinupdate")]
        public async Task<IActionResult> CreateCabinUpdate(CabinCreateUpdateModel model)
        {
         
            if (ModelState.IsValid)
            {
                try
                {
                    var aircrafts = await _aircraftRepository.GetAircraftToUpdate(model.ICAOTypeDesignatorId, model.FlightCompanyId);

                    foreach (var device in aircrafts)
                    {
                        Cabin cabin;
                        Seat seat;

                        foreach (CabinTypeModel ctm in model.Cabins)
                        {
                            cabin = new Cabin();

                            cabin.Class = ctm.Class;
                            cabin.AircraftId = device.Id;

                            await _cabinRepository.CreateAsync(cabin);

                            if (ctm.Lines > 0)
                            {
                                foreach (string column in ctm.Columns)
                                {
                                    for (int i = 1; i <= ctm.Lines; i++)
                                    {
                                        seat = new Seat();

                                        seat.CabinId = cabin.Id;
                                        seat.Line = i;
                                        seat.Column = column;

                                        await _seatRepository.CreateAsync(seat);
                                    }
                                }

                            }
                        }

                    }

                    return Ok();


                }
                catch (DbUpdateConcurrencyException ex)
                {

                    throw;

                }


            }
            return Ok();

        }

        [HttpDelete]
        [Route("deleteaircraft/{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();


            var icaoDesignator = await _aircraftRepository.GetByIdAsync(id.Value);

            if (icaoDesignator == null)
                return NotFound();

            try
            {
                await _aircraftRepository.DeleteAsync(icaoDesignator);

                return Ok("Aicraft successfully deleted");

            }
            catch (DbUpdateException ex)
            {
                throw new InvalidOperationException(ex.Message);
            }


        }
        [HttpGet("aircraftOptions")]
        public async Task<IActionResult> GetAircraftOptions()
        {
            return Ok(await _aircraftRepository.GetAicraftOptions());
        }

        //[HttpGet("getaircraftsToUpdate")]
        //public async Task<IActionResult> GetAircrafCount(AircraftQuantityRequest data)
        //{
        //    return Ok(await _aircraftRepository.GetAircraftCount(data.ICAOTypeDesignatorId, data.FlightCompanyId));
        //}
    }
}




   
