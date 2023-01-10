using BilheticaAeronauticaWeb.Controllers.Api;
using BilheticaAeronauticaWeb.Data.Entities;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using BilheticaAeronauticaWeb.Extensions;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using BilheticaAeronauticaWeb.Models;
using BilheticaAeronauticaWeb.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Controllers
{
    public class FlightCompaniesController : BaseApiController
    {
        private readonly IFlightCompanyRepository _flightCompanyRepository;
        private readonly IImageHelper _imageHelper;
        private readonly IConverterHelper _converterHelper;

        public FlightCompaniesController(
            IFlightCompanyRepository flightCompanyRepository,
            IImageHelper imageHelper,
            IConverterHelper converterHelper
            )
        {
            _flightCompanyRepository = flightCompanyRepository;
            _imageHelper = imageHelper;
            _converterHelper = converterHelper;
        }

        [Route("getflightcompanies")]
        public async Task<ActionResult<PagedList<FlightCompany>>> Index([FromQuery] FlightCompanyParams flightCompanyParams)
        {
            var query = _flightCompanyRepository.GetAll().OrderBy(fc => fc.CompanyName).AsQueryable();

            var flightCompanies = await PagedList<FlightCompany>.ToPagedList(
                query, flightCompanyParams.PageNumber,
                flightCompanyParams.PageSize);

            Response.AddPaginationHeader(flightCompanies.MetaData);

            return flightCompanies;
        }

        [HttpPost]
        [Route("createflightcompany")]
        public async Task<IActionResult> Create([FromForm] FlightCompanyModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var imagePath = string.Empty;
            if (model.ImageFile != null && model.ImageFile.Length > 0)
            {
                imagePath = await _imageHelper.UploadImageAsync(model.ImageFile, "companyLogo");

            }

            var flightCompany = _converterHelper.ToFlightCompany(model, imagePath, true);

            await _flightCompanyRepository.CreateAsync(flightCompany);


            return Ok("Aircraft successfully created");
        }

        [HttpGet]
        [Route("getflightcompanyid/{id}")]
        public async Task<IActionResult> GetById(int? id)
        {
            if (id == null)
                return NotFound();

            var flightCompany = await _flightCompanyRepository.GetByIdAsync(id.Value);

            if (flightCompany == null)
                return NotFound();

            return Ok(flightCompany);
        }

        // PUT values to EDIT
        [HttpPut]
        [Route("updateflightcompany")]
        public async Task<IActionResult> Edit([FromForm] FlightCompanyModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var imagePath = string.Empty;

                    if (model.ImageFile != null && model.ImageFile.Length > 0)
                    {
                        imagePath = await _imageHelper.UploadImageAsync(model.ImageFile, "companyLogo");
                    }
                    var flightCompany = _converterHelper.ToFlightCompany(model, imagePath, false);

                    await _flightCompanyRepository.UpdateAsync(flightCompany);

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await _flightCompanyRepository.ExistAsync(model.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            return Ok(model);
        }

        [HttpDelete]
        [Route("deleteflightcompany/{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
                return NotFound();


            var flightCompany = await _flightCompanyRepository.GetByIdAsync(id.Value);

            if (flightCompany == null)
                return NotFound();


            try
            {
                await _flightCompanyRepository.DeleteAsync(flightCompany);

                return Ok("Flight Company successfully deleted");

            }
            catch (DbUpdateException ex)
            {
                string ErrorMessage = "";

                if (ex.InnerException.Message.Contains("DELETE"))
                {
                    ErrorMessage = $"{flightCompany.CompanyName} is being used, it cannot be deleted";

                }

                return BadRequest(new ProblemDetails { Title = ErrorMessage });


            }
        }

        [Route("getflightcompanynames")]
        public async Task<ActionResult<List<object>>> companiestofilter()
        {

            return await _flightCompanyRepository.GetFlighCompanyNames();
        }

        [Route("getflightcompanyoptions")]
        public async Task<ActionResult<object>> FlightCompanyOptions()
        {

            return await _flightCompanyRepository.GetFlightCompanyOptions();
        }

        
    }
}
