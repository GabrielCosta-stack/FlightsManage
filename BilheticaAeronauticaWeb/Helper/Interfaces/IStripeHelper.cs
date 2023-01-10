using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Helper.Interfaces
{
    public interface IStripeHelper
    {
      Task<dynamic> PayAsync(string cardNumber, string expMonth, string expYear, string cvc, int amountToPay);
    }
}
