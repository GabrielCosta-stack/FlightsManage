using BilheticaAeronauticaWeb.Helper.Interfaces;
using Stripe;
using System;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Helper
{
    public class StripeHelper : IStripeHelper
    {
        public async Task<dynamic> PayAsync(string cardNumber, string expMonth, string expYear, string cvc, int amountToPay)
        {
            bool result = false;
            try
            {
                StripeConfiguration.ApiKey = "sk_test_51LH263EBG1oJ0cd7ABy7J0Wb0klY7UsYQ5hNZSTn5qqz3HasB1KQAmpN8rQmtEFnq1R49nbYqQzMdhQjobCRoPzp008Qg9Ahhi";

                var optionsToken = new TokenCreateOptions
                {
                    Card = new TokenCardOptions
                    {
                        Number = cardNumber,
                        ExpMonth = expMonth,
                        ExpYear = expYear,
                        Cvc = cvc
                    }
                };

                var serviceToken = new TokenService();
                Token stripeToken = await serviceToken.CreateAsync(optionsToken);

                var options = new ChargeCreateOptions
                {
                    Amount = amountToPay,
                    Currency = "eur",
                    Description = "TESTE STRIPE BILHETICA WEB",

                    Source = stripeToken.Id
                };

                var service = new ChargeService();

                Charge charge = await service.CreateAsync(options);

                if (charge.Paid)
                {
                    result = true;
                }

            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }

            return result;
        }
    }
}
