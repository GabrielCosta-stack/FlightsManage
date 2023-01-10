using BilheticaAeronauticaWeb.Data.Entities;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Helper.Interfaces
{
    public interface ITokenHelper
    {
        Task<string> GenerateToken(User user);
    }
}
