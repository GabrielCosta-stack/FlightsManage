using BilheticaAeronauticaWeb.Controllers.Api;
using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using BilheticaAeronauticaWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Controllers
{
    public class TicketsController : BaseApiController
    {
        private readonly IFlightTicketRepository _flightTicketRepository;
        private readonly IConverterHelper _converterHelper;
        private readonly IFlightSeatMapRepository _flightSeatMapRepository;
        private readonly IFlightRepository _flightRepository;
        private readonly IUserHelper _userHelper;

        public TicketsController(
            IFlightTicketRepository flightTicketRepository,
            IConverterHelper converterHelper,
            IFlightSeatMapRepository flightSeatMapRepository,
            IFlightRepository flightRepository,
            IUserHelper userHelper)
        {
            _flightTicketRepository = flightTicketRepository;
            _converterHelper = converterHelper;
            _flightSeatMapRepository = flightSeatMapRepository;
            _flightRepository = flightRepository;
            _userHelper = userHelper;
        }

        [HttpPost]
        [Route("getusertickets")]
        public async Task<ActionResult<List<FlightTicket>>> Index(TicketListModel model)
        {
            if (string.IsNullOrEmpty(model.UserName))
                return BadRequest();

            var user = await _userHelper.GetUserByEmailAsync(model.UserName);

            if (user == null)
                return NotFound();

            var userTickets = _flightTicketRepository.GetAll().Where(t => t.UserId == user.Id).ToList();

            return Ok(userTickets);
        }

        [HttpPost]
        [Route("createflightticket")]
        public async Task<IActionResult> CreateFlightTicket(FlightTicketModel model)
        {
            var ticket = _converterHelper.ToFlightTicket(model, true);

            var flight = await _flightRepository.GetByIdWithInfo(model.FlightId);
            var flightSeatMap = await _flightSeatMapRepository.GetByIdAsync(model.FlightSeatMapId);

            var user = await _userHelper.GetUserByEmailAsync(model.UserName);

            if(flightSeatMap == null || flight == null || user == null)
            {
                return NotFound();
            }

            flightSeatMap.Reserverd = 1;

            ticket.From = flight.CityAirporFrom.AirportName;
            ticket.To = flight.CityAirporTo.AirportName;
            ticket.SeatNumber = flightSeatMap.SeatNumber;
            ticket.Date = flight.DepartureDate;
            ticket.User = user;


            await _flightSeatMapRepository.UpdateAsync(flightSeatMap);

            await _flightTicketRepository.CreateAsync(ticket);
            
            return Ok();
        }
    }
}
