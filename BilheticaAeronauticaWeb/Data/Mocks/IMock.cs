using System.Collections.Generic;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Mocks
{
    public interface IMock<T>
    {
        IEnumerable<T> GetAll();
        
    }
}
