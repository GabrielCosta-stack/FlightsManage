using BilheticaAeronauticaWeb.Controllers.Api;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using BilheticaAeronauticaWeb.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Controllers
{
    public class StripeController : BaseApiController
    {
        private readonly IStripeHelper _stripeHelper;

        public StripeController(IStripeHelper stripeHelper)
        {
            _stripeHelper = stripeHelper;
        }

        [HttpPost]
        [Route("payment")]
        public async Task<IActionResult> Payment(StripePaymentModel model)
        {
            if(await _stripeHelper.PayAsync(model.CardNumber, model.ExpMonth, model.ExpYear, model.Cvv , model.ValueToPay))
            {
                return Ok("Payment done");
            }

            return BadRequest();
        }
    }
}
