namespace BilheticaAeronauticaWeb.Models
{
    public class StripePaymentModel
    {
         public string CardNumber { get; set; }
         public string ExpMonth { get; set; }
         public string ExpYear { get; set; }
         public string Cvv { get; set; }
         public int ValueToPay { get; set; } 
    }
}
