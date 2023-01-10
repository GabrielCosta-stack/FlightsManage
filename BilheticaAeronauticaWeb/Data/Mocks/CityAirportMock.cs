using BilheticaAeronauticaWeb.Data.Entities;
using System.Collections.Generic;

namespace BilheticaAeronauticaWeb.Data.Mocks
{
    public class CityAirportMock : IMock<CityAirport>
    {
        public IEnumerable<CityAirport> GetAll()
        {
            var listCityAirports = new List<CityAirport>();

            listCityAirports.Add(new CityAirport{
                AirportName = "Kabul Intl",
                IataCode = "KBL",
                City = "Kabul",
                CountryCode = "AF"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Herat",
                IataCode = "HEA",
                City = "Herat",
                CountryCode = "AF"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Kandahar",
                IataCode = "KDH",
                City = "Kandahar",
                CountryCode = "AF"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Tirana Rinas",
                IataCode = "TIA",
                City = "Tirana",
                CountryCode = "AL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Pago Pago Intl",
                IataCode = "PPG",
                City = "Pago Pago",
                CountryCode = "AS"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Quatro de Fevereiro",
                IataCode = "LAD",
                City = "Luanda",
                CountryCode = "AO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Lubango",
                IataCode = "SDD",
                City = "Lubango",
                CountryCode = "AO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Clayton J. Lloyd International",
                IataCode = "AXA",
                City = "The Valley",
                CountryCode = "AI"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "V. C. Bird International",
                IataCode = "ANU",
                City = "Antigua",
                CountryCode = "AG"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Ministro Pistarini International",
                IataCode = "EZE",
                City = "Buenos Aires",
                CountryCode = "AR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Aeroparque Jorge Newbery",
                IataCode = "AEP",
                City = "Buenos Aires",
                CountryCode = "AR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Governor Francisco Gabrielli International",
                IataCode = "MDZ",
                City = "Mendoza",
                CountryCode = "AR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Zvartnots International Airport",
                IataCode = "EVN",
                City = "Yerevan",
                CountryCode = "AM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Shirak",
                IataCode = "LWN",
                City = "Gyumri",
                CountryCode = "AM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Queen Beatrix International",
                IataCode = "AUA",
                City = "Oranjestad",
                CountryCode = "AW"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Adelaide",
                IataCode = "ADL",
                City = "Adelaide",
                CountryCode = "AU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Brisbane",
                IataCode = "BNE",
                City = "Brisbane",
                CountryCode = "AU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Melbourne",
                IataCode = "MEL",
                City = "Melbourne",
                CountryCode = "AU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Sydney",
                IataCode = "SYD",
                City = "Sydney",
                CountryCode = "AU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Graz",
                IataCode = "GRZ",
                City = "Graz",
                CountryCode = "AT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Klagenfurt",
                IataCode = "KLU",
                City = "Klagenfurt",
                CountryCode = "AT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Vienna International",
                IataCode = "VIE",
                City = "Vienna",
                CountryCode = "AT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Linz",
                IataCode = "LNZ",
                City = "Linz",
                CountryCode = "AT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Heydar Aliyev International",
                IataCode = "GYD",
                City = "Baku",
                CountryCode = "AZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Ganja International ",
                IataCode = "KVD",
                City = "Ganja",
                CountryCode = "AZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Qabala International",
                IataCode = "GBB",
                City = "Qabala",
                CountryCode = "AZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Lynden Pindling International",
                IataCode = "NAS",
                City = "Nassau",
                CountryCode = "BS"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Chub Cay International",
                IataCode = "CCZ",
                City = "Chub Cay",
                CountryCode = "BS"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Grand Bahama International",
                IataCode = "FPO",
                City = "Freeport",
                CountryCode = "BS"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Shah Amanat International",
                IataCode = "CGP",
                City = "Chittagong",
                CountryCode = "BD"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Shahjalal International",
                IataCode = "DAC",
                City = "Dhaka",
                CountryCode = "BD"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Grantley Adams International",
                IataCode = "BGI",
                City = "Bridgetown",
                CountryCode = "BB"
            });

           

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Hrodna",
                IataCode = "GNA",
                City = "Grodno",
                CountryCode = "BY"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Gomel",
                IataCode = "GME",
                City = "Gomel",
                CountryCode = "BY"
            });

      
            listCityAirports.Add(new CityAirport
            {
                AirportName = "Antwerp International",
                IataCode = "ANR",
                City = "Antwerp",
                CountryCode = "BE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Brussels",
                IataCode = "BRU",
                City = "Brussels",
                CountryCode = "BE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Philip S. W. Goldson International",
                IataCode = "BZE",
                City = "Belize City",
                CountryCode = "BZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Cadjehoun",
                IataCode = "COO",
                City = "Cotonou",
                CountryCode = "BJ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "L.F. Wade International",
                IataCode = "BDA",
                City = "St. George's",
                CountryCode = "BM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Paro",
                IataCode = "PBH",
                City = "Paro",
                CountryCode = "BT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "El Alto International",
                IataCode = "LPB",
                City = "La Paz",
                CountryCode = "BO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Jorge Wilstermann International",
                IataCode = "CBB",
                City = "Cochabamba",
                CountryCode = "BO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Banja Luka International",
                IataCode = "BNX",
                City = "Banja Luka",
                CountryCode = "BA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Sarajevo International",
                IataCode = "SJJ",
                City = "Sarajevo",
                CountryCode = "BA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Tuzla International",
                IataCode = "TZL",
                City = "Tuzla",
                CountryCode = "BA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Santa Maria",
                IataCode = "AJU",
                City = "Aracaju",
                CountryCode = "BR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Val de Cães International",
                IataCode = "BEL",
                City = "Belém",
                CountryCode = "BR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Tancredo Neves International",
                IataCode = "CNF",
                City = "Belo Horizonte",
                CountryCode = "BR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Brasília International",
                IataCode = "BSB",
                City = "Brasília",
                CountryCode = "BR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Burgas",
                IataCode = "BOJ",
                City = "Burgas",
                CountryCode = "BG"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Plovdiv",
                IataCode = "PDV",
                City = "Plovdiv",
                CountryCode = "BG"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Sofia",
                IataCode = "SOF",
                City = "Sofia",
                CountryCode = "BG"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "",
                IataCode = "",
                City = "",
                CountryCode = "BF"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Bobo-Dioulasso",
                IataCode = "BOY",
                City = "Bobo-Dioulasso",
                CountryCode = "BF"
            });
            listCityAirports.Add(new CityAirport
            {
                AirportName = "Thomas Sankara International Airport",
                IataCode = "OUA",
                City = "Ouagadougou",
                CountryCode = "BF"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Phnom Penh International Airport",
                IataCode = "PNH",
                City = "Phnom Penh",
                CountryCode = "KH"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Siem Reap International",
                IataCode = "REP",
                City = "Siem Reap",
                CountryCode = "KH"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Sihanouk International",
                IataCode = "KOS",
                City = "Sihanoukville",
                CountryCode = "KH"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "",
                IataCode = "",
                City = "",
                CountryCode = "CM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Douala International",
                IataCode = "DLA",
                City = "Douala",
                CountryCode = "CM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Yaoundé Nsimalen International",
                IataCode = "NSI",
                City = "Yaoundé",
                CountryCode = "CM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "John C. Munro Hamilton International",
                IataCode = "YHM",
                City = "Hamilton",
                CountryCode = "CA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Montréal–Trudeau International",
                IataCode = "YUL",
                City = "Montreal",
                CountryCode = "CA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "St. John's International",
                IataCode = "YYT",
                City = "St. John's",
                CountryCode = "CA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Toronto Pearson International",
                IataCode = "YYZ",
                City = "Toronto",
                CountryCode = "CA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "",
                IataCode = "",
                City = "",
                CountryCode = "CV"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Aristides Pereira International",
                IataCode = "BVC",
                City = "Boa Vista",
                CountryCode = "CV"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Cesária Évora",
                IataCode = "VXE",
                City = "São Vicente",
                CountryCode = "CV"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Charles Kirkconnell International",
                IataCode = "CYB",
                City = "Cayman Brac",
                CountryCode = "KY"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Owen Roberts International",
                IataCode = "GCM",
                City = "Georgetown",
                CountryCode = "KY"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Bangui M'Poko International",
                IataCode = "BGF",
                City = "Bangui",
                CountryCode = "CF"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "",
                IataCode = "",
                City = "",
                CountryCode = "CL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Andrés Sabella Gálvez International",
                IataCode = "ANF",
                City = "Antofagasta",
                CountryCode = "CL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Arturo Merino Benítez International",
                IataCode = "SCL",
                City = "Santiago",
                CountryCode = "CL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Beijing Capital International",
                IataCode = "PEK",
                City = "Beijing",
                CountryCode = "CN"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Chengdu Shuangliu International",
                IataCode = "CTU",
                City = "Chengdu",
                CountryCode = "CN"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Shanghai Hongqiao International",
                IataCode = "SHA",
                City = "Shanghai",
                CountryCode = "CN"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Sanya Phoenix International",
                IataCode = "SYX",
                City = "Sanya",
                CountryCode = "CN"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "El Edén International",
                IataCode = "AXM",
                City = "Armenia",
                CountryCode = "CO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Ernesto Cortissoz International",
                IataCode = "BAQ",
                City = "Barranquilla",
                CountryCode = "CO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Alfonso Bonilla Aragón International",
                IataCode = "CLO",
                City = "Cali",
                CountryCode = "CO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Gustavo Artunduaga Paredes",
                IataCode = "FLA",
                City = "Florencia",
                CountryCode = "CO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Daniel Oduber Quirós International",
                IataCode = "LIR",
                City = "Liberia",
                CountryCode = "CR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Juan Santamaría International",
                IataCode = "SJO",
                City = "San José",
                CountryCode = "CR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Brač",
                IataCode = "BWK",
                City = "Brač",
                CountryCode = "HR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Dubrovnik",
                IataCode = "DBV",
                City = "Dubrovnik",
                CountryCode = "HR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Osijek",
                IataCode = "OSI",
                City = "Osijek",
                CountryCode = "HR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "José Martí International",
                IataCode = "HAV",
                City = "Havana",
                CountryCode = "CU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Jardines del Rey",
                IataCode = "CCC",
                City = "Cayo Coco",
                CountryCode = "CU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Ignacio Agramonte International",
                IataCode = "CMW",
                City = "Camagüey",
                CountryCode = "CU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Larnaca International",
                IataCode = "LCA",
                City = "Larnaca",
                CountryCode = "CY"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Paphos International",
                IataCode = "PFO",
                City = "Paphos",
                CountryCode = "CY"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Václav Havel Airport Prague",
                IataCode = "PRG",
                City = "Prague",
                CountryCode = "CZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Leoš Janáček Airport Ostrava",
                IataCode = "OSR",
                City = "Ostrava",
                CountryCode = "CZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Aalborg",
                IataCode = "AAL",
                City = "Aalborg",
                CountryCode = "DK"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Aarhus",
                IataCode = "AAR",
                City = "Aarhus",
                CountryCode = "DK"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Douglas–Charles",
                IataCode = "DOM",
                City = "Roseau",
                CountryCode = "DM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Punta Cana International",
                IataCode = "PUJ",
                City = "Punta Cana",
                CountryCode = "DO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "La Romana International",
                IataCode = "LRM",
                City = "La Romana",
                CountryCode = "DO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Mariscal Lamar International",
                IataCode = "CUE",
                City = "Cuenca",
                CountryCode = "EC"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Mariscal Sucre International",
                IataCode = "UIO",
                City = "Quito",
                CountryCode = "EC"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Pärnu",
                IataCode = "EPU",
                City = "Pärnu",
                CountryCode = "EE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Lennart Meri Tallinn",
                IataCode = "TLL",
                City = "Tallinn",
                CountryCode = "EE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Addis Ababa Bole International",
                IataCode = "ADD",
                City = "Addis Ababa",
                CountryCode = "ET"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Dire Dawa",
                IataCode = "DIR",
                City = "Dire Dawa",
                CountryCode = "ET"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Vágar",
                IataCode = "FAE",
                City = "Vágar",
                CountryCode = "FO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Nadi International",
                IataCode = "NAN",
                City = "Nadi",
                CountryCode = "FJ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Helsinki-Vantaa",
                IataCode = "HEL",
                City = "Helsinki",
                CountryCode = "FI"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Savonlinna",
                IataCode = "SVL",
                City = "Savonlinna",
                CountryCode = "FI"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Kuopio",
                IataCode = "KUO",
                City = "Kuopio",
                CountryCode = "FI"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Bergerac Dordogne Périgord",
                IataCode = "EGC",
                City = "Bergerac",
                CountryCode = "FR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Bordeaux–Mérignac",
                IataCode = "BOD",
                City = "Bordeaux",
                CountryCode = "FR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Lyon–Saint Exupéry",
                IataCode = "LYS",
                City = "Lyon",
                CountryCode = "FR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Banjul International",
                IataCode = "BJL",
                City = "Banjul",
                CountryCode = "GM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Berlin Brandenburg",
                IataCode = "BER",
                City = "Berlin",
                CountryCode = "DE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Frankfurt-Hahn",
                IataCode = "HHN",
                City = "Frankfurt",
                CountryCode = "DE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Hamburg",
                IataCode = "HAM",
                City = "Hamburg",
                CountryCode = "DE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Hanover",
                IataCode = "HAJ",
                City = "Hanover",
                CountryCode = "DE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Athens International",
                IataCode = "ATH",
                City = "Athens",
                CountryCode = "GR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Corfu International",
                IataCode = "CFU",
                City = "Corfu",
                CountryCode = "GR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Kos International",
                IataCode = "KGS",
                City = "Kos",
                CountryCode = "GR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Skiathos International",
                IataCode = "JSI",
                City = "Skiathos",
                CountryCode = "GR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "La Aurora International",
                IataCode = "GUA",
                City = "Guatemala City",
                CountryCode = "GT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Mundo Maya International",
                IataCode = "FRS",
                City = "Flores",
                CountryCode = "GT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Osvaldo Vieira International",
                IataCode = "OXB",
                City = "Bissau",
                CountryCode = "GW"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Bubaque",
                IataCode = "BQE",
                City = "Bubaque",
                CountryCode = "GW"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Cap-Haïtien International",
                IataCode = "CAP",
                City = "Cap-Haïtien",
                CountryCode = "HT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Toussaint Louverture International",
                IataCode = "PAP",
                City = "Port-au-Prince",
                CountryCode = "HT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Hong Kong International",
                IataCode = "HKG",
                City = "Hong Kong",
                CountryCode = "HK"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Debrecen International",
                IataCode = "DEB",
                City = "Debrecen",
                CountryCode = "HU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Budapest Ferenc Liszt International",
                IataCode = "BUD",
                City = "Budapest",
                CountryCode = "HU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Hévíz-Balaton",
                IataCode = "SOB",
                City = "Hévíz",
                CountryCode = "HU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Akureyri",
                IataCode = "AEY",
                City = "Akureyri",
                CountryCode = "IS"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Reykjavík",
                IataCode = "RKV",
                City = "Reykjavík",
                CountryCode = "IS"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Indira Gandhi International",
                IataCode = "DEL",
                City = "Delhi",
                CountryCode = "IN"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Dabolim",
                IataCode = "GOI",
                City = "Goa",
                CountryCode = "IN"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Rajiv Gandhi International",
                IataCode = "HYD",
                City = "Hyderabad",
                CountryCode = "IN"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Chhatrapati Shivaji Maharaj International",
                IataCode = "BOM",
                City = "Mumbai",
                CountryCode = "IN"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "City of Derry",
                IataCode = "LDY",
                City = "Derry",
                CountryCode = "IE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "George Best Belfast City",
                IataCode = "BHD",
                City = "Belfast",
                CountryCode = "IE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Norman Manley International",
                IataCode = "KIN",
                City = "Kingston",
                CountryCode = "JM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Sangster International",
                IataCode = "MBJ",
                City = "Montego Bay",
                CountryCode = "JM"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Bologna",
                IataCode = "BLQ",
                City = "Bologna",
                CountryCode = "IT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Fontanarossa",
                IataCode = "CTA",
                City = "Catania",
                CountryCode = "IT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Peretola",
                IataCode = "FLR",
                City = "Florence",
                CountryCode = "IT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Naples International",
                IataCode = "NAP",
                City = "Naples",
                CountryCode = "IT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Fukuoka",
                IataCode = "FUK",
                City = "Fukuoka",
                CountryCode = "JP"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Nagasaki",
                IataCode = "NGS",
                City = "Nagasaki",
                CountryCode = "JP"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Kansai International ",
                IataCode = "KIX",
                City = "Osaka",
                CountryCode = "JP"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Jersey",
                IataCode = "JER",
                City = "Jersey",
                CountryCode = "JE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Jeju International",
                IataCode = "CJU",
                City = "Jeju",
                CountryCode = "KR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Incheon International",
                IataCode = "ICN",
                City = "Seoul",
                CountryCode = "KR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Palanga International",
                IataCode = "PLQ",
                City = "Palanga",
                CountryCode = "LT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Kaunas",
                IataCode = "KUN",
                City = "Kaunas",
                CountryCode = "LT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Findel",
                IataCode = "LUX",
                City = "Luxembourg City",
                CountryCode = "LU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Macau International",
                IataCode = "MFM",
                City = "Macau",
                CountryCode = "MO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Malta International",
                IataCode = "MLA",
                City = "Valletta",
                CountryCode = "MT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Cancún International",
                IataCode = "CUN",
                City = "Cancún",
                CountryCode = "MX"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Acapulco International",
                IataCode = "ACA",
                City = "Acapulco",
                CountryCode = "MX"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Miguel Hidalgo y Costilla Guadalajara International",
                IataCode = "GDL",
                City = "Guadalajara",
                CountryCode = "MX"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Maputo International",
                IataCode = "MPM",
                City = "Maputo",
                CountryCode = "MZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Beira",
                IataCode = "BEW",
                City = "Beira",
                CountryCode = "MZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Amsterdam Airport Schiphol",
                IataCode = "AMS",
                City = "Amsterdam",
                CountryCode = "NL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Eindhoven",
                IataCode = "EIN",
                City = "Eindhoven",
                CountryCode = "NL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Rotterdam The Hague",
                IataCode = "RTM",
                City = "Rotterdam",
                CountryCode = "NL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Wellington",
                IataCode = "WLG",
                City = "Wellington",
                CountryCode = "NZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Queenstown",
                IataCode = "ZQN",
                City = "Queenstown",
                CountryCode = "NZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Auckland",
                IataCode = "AKL",
                City = "Auckland",
                CountryCode = "NZ"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Bergen",
                IataCode = "BGO",
                City = "Bergen",
                CountryCode = "NO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Sandefjord Airport, Torp",
                IataCode = "TRF",
                City = "Oslo",
                CountryCode = "NO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Kristiansand Airport, Kjevik",
                IataCode = "KRS",
                City = "Kristiansand",
                CountryCode = "NO"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Faisalabad International",
                IataCode = "LYP",
                City = "Faisalabad",
                CountryCode = "PK"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Gwadar International",
                IataCode = "GWD",
                City = "Gwadar",
                CountryCode = "PK"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Silvio Pettirossi International",
                IataCode = "ASU",
                City = "Asunción",
                CountryCode = "PY"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Guaraní International",
                IataCode = "AGT",
                City = "Ciudad del Este",
                CountryCode = "PY"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Rodríguez Ballón International",
                IataCode = "AQP",
                City = "Arequipa",
                CountryCode = "PE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Jorge Chávez International",
                IataCode = "LIM",
                City = "Lima",
                CountryCode = "PE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Lublin",
                IataCode = "LUZ",
                City = "Lublin",
                CountryCode = "PL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Katowice",
                IataCode = "KTW",
                City = "Katowice",
                CountryCode = "PL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Warsaw Chopin",
                IataCode = "WAW",
                City = "Warsaw",
                CountryCode = "PL"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Faro",
                IataCode = "FAO",
                City = "Faro",
                CountryCode = "PT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Lisbon",
                IataCode = "LIS",
                City = "Lisbon",
                CountryCode = "PT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Francisco Sá Carneiro",
                IataCode = "OPO",
                City = "Porto",
                CountryCode = "PT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Madeira",
                IataCode = "FNC",
                City = "Funchal",
                CountryCode = "PT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "João Paulo II",
                IataCode = "PDL",
                City = "Ponta Delgada",
                CountryCode = "PT"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Lajes",
                IataCode = "TER",
                City = "Terceira Island",
                CountryCode = "PT"

            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Bryansk International",
                IataCode = "BZK",
                City = "Bryansk",
                CountryCode = "RU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Kazan",
                IataCode = "KZN",
                City = "Kazan",
                CountryCode = "RU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Chelyabinsk",
                IataCode = "	CEK",
                City = "Chelyabinsk",
                CountryCode = "RU"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "São Tomé International",
                IataCode = "TMS",
                City = "São Tomé",
                CountryCode = "ST"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Cape Town International",
                IataCode = "CPT",
                City = "Cape Town",
                CountryCode = "ZA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Lanseria International",
                IataCode = "HLA",
                City = "Johannesburg",
                CountryCode = "ZA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "East London",
                IataCode = "ELS",
                City = "East London",
                CountryCode = "ZA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Federico García Lorca Granada",
                IataCode = "GRX",
                City = "Granada",
                CountryCode = "ES"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "La Palma",
                IataCode = "SPC",
                City = "La Palma",
                CountryCode = "ES"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Madrid-Barajas",
                IataCode = "MAD",
                City = "Madrid",
                CountryCode = "ES"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Valencia",
                IataCode = "VLC",
                City = "Valencia",
                CountryCode = "ES"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Stockholm Bromma",
                IataCode = "BMA",
                City = "Stockholm",
                CountryCode = "SE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Sundsvall–Timrå",
                IataCode = "SDL",
                City = "Sundsvall",
                CountryCode = "SE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Åre Östersund",
                IataCode = "OSD",
                City = "Östersund",
                CountryCode = "SE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Zürich",
                IataCode = "ZRH",
                City = "Zürich",
                CountryCode = "CH"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Geneva",
                IataCode = "GVA",
                City = "Geneva",
                CountryCode = "CH"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Lugano",
                IataCode = "LUG",
                City = "Lugano",
                CountryCode = "CH"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Suvarnabhumi",
                IataCode = "BKK",
                City = "Bangkok",
                CountryCode = "TH"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Hat Yai International",
                IataCode = "HDY",
                City = "Hat Yai",
                CountryCode = "TH"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Esenboğa International",
                IataCode = "ESB",
                City = "Ankara",
                CountryCode = "TR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Yenişehir",
                IataCode = "YEI",
                City = "Bursa",
                CountryCode = "TR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Istanbul",
                IataCode = "IST",
                City = "Istanbul",
                CountryCode = "TR"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Chernivtsi International",
                IataCode = "CWC",
                City = "Chernivtsi",
                CountryCode = "UA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Odesa International",
                IataCode = "ODS",
                City = "Odesa",
                CountryCode = "UA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Zaporizhzhia International",
                IataCode = "OZH",
                City = "Zaporizhzhia",
                CountryCode = "UA"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Birmingham",
                IataCode = "BHX",
                City = "Birmingham",
                CountryCode = "GB"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Bristol",
                IataCode = "BRS",
                City = "Bristol",
                CountryCode = "GB"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "East Midlands",
                IataCode = "EMA",
                City = "Nottingham",
                CountryCode = "GB"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Heathrow",
                IataCode = "LHR",
                City = "London",
                CountryCode = "GB"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Luton",
                IataCode = "LTN",
                City = "London",
                CountryCode = "GB"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Gatwick",
                IataCode = "LGW",
                City = "London",
                CountryCode = "GB"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Manchester",
                IataCode = "MAN",
                City = "Manchester",
                CountryCode = "GB"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Logan International",
                IataCode = "BOS",
                City = "Boston",
                CountryCode = "US"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Midway International",
                IataCode = "MDW",
                City = "Chicago",
                CountryCode = "US"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Dallas/Fort Worth International",
                IataCode = "DFW",
                City = "Dallas",
                CountryCode = "US"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Denver International",
                IataCode = "DEN",
                City = "Denver",
                CountryCode = "US"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "George Bush Intercontinental",
                IataCode = "IAH",
                City = "Houston",
                CountryCode = "US"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Simón Bolívar International",
                IataCode = "CCS",
                City = "Caracas",
                CountryCode = "VE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Arturo Michelena International",
                IataCode = "VLN",
                City = "Valencia",
                CountryCode = "VE"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Robert Gabriel Mugabe International",
                IataCode = "HRE",
                City = "Harare",
                CountryCode = "ZW"
            });

            listCityAirports.Add(new CityAirport
            {
                AirportName = "Joshua Mqabuko Nkomo International",
                IataCode = "BUQ",
                City = "Bulawayo",
                CountryCode = "ZW"
            });

            

            return listCityAirports;
        }
    }
}
