using BilheticaAeronauticaWeb.Data.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;

namespace BilheticaAeronauticaWeb.Data.Mocks
{
    public class FlightCompanyMock : IMock<FlightCompany>
    {
        public IEnumerable<FlightCompany> GetAll()
        {
            

            var listFlightCompanies = new List<FlightCompany>();

            listFlightCompanies.Add(new FlightCompany {
                CompanyName = "TAP Portugal",
                Country = "Portugal",
                Region = "Europe",
                ICAOCode = "TAP",
                IataDesignator = "TP"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Turkish Airlines",
                Country = "Turkey",
                Region = "Europe",
                ICAOCode = "THY",
                IataDesignator = "TK"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Ukraine International Airlines",
                Country = "Ukraine",
                Region = "Europe",
                ICAOCode = "AUI",
                IataDesignator = "PS"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "SWISS",
                Country = "Switzerland",
                Region = "Europe",
                ICAOCode = "SWR",
                IataDesignator = "LX"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "SAS",
                Country = "Sweden",
                Region = "Europe",
                ICAOCode = "SAS",
                IataDesignator = "SK"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Poste Air Cargo",
                Country = "Italy",
                Region = "Europe",
                ICAOCode = "MSA",
                IataDesignator = "M4"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Qazaq Air",
                Country = "Kazakhstan",
                Region = "Europe",
                ICAOCode = "QAZ",
                IataDesignator = "IQ"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Luxair",
                Country = "Luxembourg",
                Region = "Europe",
                ICAOCode = "LGL",
                IataDesignator = "LG"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Olympic Air",
                Country = "Greece",
                Region = "Europe",
                ICAOCode = "OAL",
                IataDesignator = "OA"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Martinair Cargo",
                Country = "Netherlands",
                Region = "Europe",
                ICAOCode = "MPH",
                IataDesignator = "MP"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Finnair",
                Country = "Finland",
                Region = "Europe",
                ICAOCode = "FIN",
                IataDesignator = "AY"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "French Bee",
                Country = "France",
                Region = "Europe",
                ICAOCode = "FBU",
                IataDesignator = "BF"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "German Airways",
                Country = "Germany",
                Region = "Europe",
                ICAOCode = "GER",
                IataDesignator = "ZQ"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "FLYONE",
                Country = "Turkey",
                Region = "Europe",
                ICAOCode = "FHY",
                IataDesignator = "5F"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Croatia Airlines",
                Country = "Croatia",
                Region = "Europe",
                ICAOCode = "CTN",
                IataDesignator = "OU"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Cyprus Airways",
                Country = "Cyprus",
                Region = "Europe",
                ICAOCode = "CYP",
                IataDesignator = "CY"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "DHL Air",
                Country = "United Kingdom",
                Region = "Europe",
                ICAOCode = "DHK",
                IataDesignator = "D0"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Air Baltic",
                Country = "Latvia",
                Region = "Europe",
                ICAOCode = "BTI",
                IataDesignator = "BT"

            });

          

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Carpatair",
                Country = "Romania",
                Region = "Europe",
                ICAOCode = "V3",
                IataDesignator = "V3"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Brussels Airlines",
                Country = "Belgium",
                Region = "Europe",
                ICAOCode = "BEL",
                IataDesignator = "SN"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "CityJet",
                Country = "Ireland",
                Region = "Europe",
                ICAOCode = "BCY",
                IataDesignator = "WX"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Azerbaijan Airlines",
                Country = "Azerbaijan",
                Region = "Europe",
                ICAOCode = "AHY",
                IataDesignator = "J2"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Wamos Air",
                Country = "Spain",
                Region = "Europe",
                ICAOCode = "PLM",
                IataDesignator = "EB"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Air Malta",
                Country = "Malta",
                Region = "Europe",
                ICAOCode = "AMC",
                IataDesignator = "KM"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "ANA",
                Country = "Japan",
                Region = "Asia & Pacific",
                ICAOCode = "ANA",
                IataDesignator = "NH"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Asiana Airlines",
                Country = "Korea",
                Region = "Asia & Pacific",
                ICAOCode = "AAR",
                IataDesignator = "OZ"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Air Tahiti",
                Country = "French Polynesia",
                Region = "Asia & Pacific",
                ICAOCode = "VTA",
                IataDesignator = "VT"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Air New Zealand",
                Country = "New Zealand",
                Region = "Asia & Pacific",
                ICAOCode = "ANZ",
                IataDesignator = "NZ"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Air India",
                Country = "India",
                Region = "Asia & Pacific",
                ICAOCode = "AIC",
                IataDesignator = "AI"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Bamboo Airways",
                Country = "Vietnam",
                Region = "Asia & Pacific",
                ICAOCode = "BAV",
                IataDesignator = "QH"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Bangkok Airways",
                Country = "Thailand",
                Region = "Asia & Pacific",
                ICAOCode = "BKP",
                IataDesignator = "PG"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Cebu Pacific",
                Country = "Philippines",
                Region = "Asia & Pacific",
                ICAOCode = "CEB",
                IataDesignator = "5J"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Malaysia Airlines",
                Country = "Malaysia",
                Region = "Asia & Pacific",
                ICAOCode = "MAS",
                IataDesignator = "MH"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Qantas",
                Country = "Australia",
                Region = "Asia & Pacific",
                ICAOCode = "QFA",
                IataDesignator = "QF"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "SriLankan Airlines",
                Country = "Sri Lanka",
                Region = "Asia & Pacific",
                ICAOCode = "ALK",
                IataDesignator = "UL"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Azul Brazilian Airlines",
                Country = "Brazil",
                Region = "South America",
                ICAOCode = "AZU",
                IataDesignator = "AD"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Avianca",
                Country = "Colombia",
                Region = "South America",
                ICAOCode = "AVA",
                IataDesignator = "AV"

            });
            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "LATAM Airlines Group",
                Country = "Chile",
                Region = "South America",
                ICAOCode = "LAN",
                IataDesignator = "LA"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "LATAM Airlines Paraguay",
                Country = "Paraguay",
                Region = "South America",
                ICAOCode = "LAP",
                IataDesignator = "PZ"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "LATAM Airlines Peru",
                Country = "Peru",
                Region = "South America",
                ICAOCode = "LPE",
                IataDesignator = "LP"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "National Airlines",
                Country = "United States",
                Region = "North America",
                ICAOCode = "NCR",
                IataDesignator = "N8"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Ravn Alaska",
                Country = "United States",
                Region = "North America",
                ICAOCode = "RVF",
                IataDesignator = "7H"

            });
            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "WestJet",
                Country = "Canada",
                Region = "North America",
                ICAOCode = "WJA",
                IataDesignator = "WS"

            });
            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Volaris",
                Country = "Mexico",
                Region = "North America",
                ICAOCode = "VOI",
                IataDesignator = "Y4*"

            });
            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Air Algérie",
                Country = "Algeria",
                Region = "Africa",
                ICAOCode = "DAH",
                IataDesignator = "AH"

            });
            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Air Peace",
                Country = "Nigeria",
                Region = "Africa",
                ICAOCode = "APK",
                IataDesignator = "P4"

            });
            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Airlink",
                Country = "South Africa",
                Region = "Africa",
                ICAOCode = "LNK",
                IataDesignator = "4Z"

            });
            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Badr Airlines",
                Country = "Sudan",
                Region = "Africa",
                ICAOCode = "J4",
                IataDesignator = "J4"

            });
            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "LAM",
                Country = "Mozambique",
                Region = "Africa",
                ICAOCode = "LAM",
                IataDesignator = "TM"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Royal Air Maroc",
                Country = "	Morocco",
                Region = "Africa",
                ICAOCode = "RAM",
                IataDesignator = "AT"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "TAAG Angola Airlines",
                Country = "Angola",
                Region = "Africa",
                ICAOCode = "DTA",
                IataDesignator = "DT"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Tunisair",
                Country = "Tunisia",
                Region = "Africa",
                ICAOCode = "TAR",
                IataDesignator = "TU"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Tassili Airlines",
                Country = "Algeria",
                Region = "Africa",
                ICAOCode = "DTH",
                IataDesignator = "SF"

            });

            listFlightCompanies.Add(new FlightCompany
            {
                CompanyName = "Air Cairo",
                Country = "Egypt",
                Region = "Africa",
                ICAOCode = "MSC",
                IataDesignator = "SM"

            });

            return listFlightCompanies;
        }
    }
}
