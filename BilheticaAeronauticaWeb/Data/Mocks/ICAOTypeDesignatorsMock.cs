using BilheticaAeronauticaWeb.Data.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Data.Mocks
{
    public class ICAOTypeDesignatorsMock : IMock<ICAOTypeDesignator>
    {
        


        public IEnumerable<ICAOTypeDesignator> GetAll()
        {
            

            var listICAOTypes = new List<ICAOTypeDesignator>();

            listICAOTypes.Add(
                new ICAOTypeDesignator {
                    ICAOCode = "A310",
                    IATATypeCode = "313",
                    Model = "Airbus A310-300",
                   

                });
            listICAOTypes.Add(
            new ICAOTypeDesignator
            {
                ICAOCode = "A318",
                IATATypeCode = "318",
                Model = "Airbus A318",
              

            });
            listICAOTypes.Add(
            new ICAOTypeDesignator
            {
                ICAOCode = "IL62",
                IATATypeCode = "IL6",
                Model = "Ilyushin IL62",
               

            });
            listICAOTypes.Add(
            new ICAOTypeDesignator
            {
                ICAOCode = "RJ70",
                IATATypeCode = "AR7",
                Model = "Avro RJ70",
               

            });
            listICAOTypes.Add(
            new ICAOTypeDesignator
            {
                ICAOCode = "T134",
                IATATypeCode = "TU3",
                Model = "Tupolev Tu-134",
                

            });
            listICAOTypes.Add(
             new ICAOTypeDesignator
             {
                 ICAOCode = "E195",
                 IATATypeCode = "E95",
                 Model = "Embraer 195",
                

             });
            
            return listICAOTypes;
        }

    }
}
