using BilheticaAeronauticaWeb.Controllers.Api;
using Microsoft.AspNetCore.Mvc;
using System;

namespace BilheticaAeronauticaWeb.Controllers.Error
{
    public class ErrorsController : BaseApiController
    {
        [HttpGet]
        [Route("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        
        [HttpGet]
        [Route("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest( new ProblemDetails
            {
                Title = "This is a Bad Request"
            });
        }

        [HttpGet]
        [Route("unauthorised")]
        public IActionResult GetUnAuthorised()
        {
            return Unauthorized();
        }

        // FORMS
        [HttpGet]
        [Route("validation-error")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem 1", "This is the first error");
            ModelState.AddModelError("Problem 2", "This is the secound error");

            return ValidationProblem();
        }

        [HttpGet]
        [Route("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }
    }
}
