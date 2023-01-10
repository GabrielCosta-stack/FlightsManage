using BilheticaAeronauticaWeb.Controllers.Api;
using BilheticaAeronauticaWeb.Data;
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
using System.Text.Json;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Controllers
{
    public class ICAOTDesignatorsController : BaseApiController
    {
        private readonly IICAOTDesignatorsRepository _icaotDesignatorRepository;
        private readonly IConverterHelper _converterHelper;

        public ICAOTDesignatorsController(
            IICAOTDesignatorsRepository icaotDesignatorRepository,
            IConverterHelper converterHelper
            )
        {
            _icaotDesignatorRepository = icaotDesignatorRepository;
            _converterHelper = converterHelper;
        }

        [Route("geticaotypes")]
        public async Task<ActionResult<PagedList<ICAOTypeDesignator>>> Index([FromQuery]ICAOParams icaoParams)
        {
            var query = _icaotDesignatorRepository.GetAll().OrderBy(icao => icao.Model).AsQueryable();

            var icaoDesignators = await PagedList<ICAOTypeDesignator>.ToPagedList(
                query, icaoParams.PageNumber,
                icaoParams.PageSize);

            Response.AddPaginationHeader(icaoDesignators.MetaData);

            return icaoDesignators;
        }

        [HttpPost]
        [Route("createicaotypes")]
        public async Task<IActionResult> Create(ICAODesignatorModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var icaoDesignator = _converterHelper.ToICAODesignator(model, true);

            await _icaotDesignatorRepository.CreateAsync(icaoDesignator);

            return Ok("successfully created");
        }

        // GET values toward form to EDIT
        [HttpGet]
        [Route("geticaobyid/{id}")]
        public async Task<IActionResult> GetById(int? id)
        {
            if (id == null)
                return NotFound();

            var icaoDesignator = await _icaotDesignatorRepository.GetByIdAsync(id.Value);

            if (icaoDesignator == null)
                return NotFound();

            return Ok(icaoDesignator);
        }

        // PUT values to EDIT
        [HttpPut]
        [Route("updateicao")]
        public async Task<IActionResult> Edit(ICAODesignatorModel model)
        {
           if(ModelState.IsValid)
            {
                try
                {
                    var icaoDesignator = _converterHelper.ToICAODesignator(model, false);

                    await _icaotDesignatorRepository.UpdateAsync(icaoDesignator);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!await _icaotDesignatorRepository.ExistAsync(model.Id))
                    {
                        return NotFound();
                    } else
                    {
                        throw;
                    }
                }
            }

            return Ok(model);
        }

        [HttpDelete]
        [Route("deleteicao/{id}")]
        public async Task<IActionResult> Delete(int? id)
        {
            if(id == null)
                return NotFound();
         

            var icaoDesignator = await _icaotDesignatorRepository.GetByIdAsync(id.Value);

            if (icaoDesignator == null)
                return NotFound();


            try
            {
                await _icaotDesignatorRepository.DeleteAsync(icaoDesignator);

                return Ok("ICAO successfully deleted");

            } catch(DbUpdateException ex)
            {
                string ErrorMessage = "";

                if(ex.InnerException.Message.Contains("DELETE"))
                {
                    ErrorMessage = $"{icaoDesignator.Model} is being used, it cannot be deleted";
    
                }
          
                return BadRequest( new ProblemDetails { Title = ErrorMessage});
            }


        }
    }
}
