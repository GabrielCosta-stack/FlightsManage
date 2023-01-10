import { UseScrollTriggerOptions } from "@mui/material/useScrollTrigger/useScrollTrigger";

export interface Airport {}

export interface FlightsAirportParams {
    region?: string;
}

export interface FlightsParams {
    region?: string;
    pageNumber: number;
    pageSize: number;
}

export interface Flight {
    id?: number;
    cityAirporFromId: number;
    cityAirporToId: number;
    airportName: string;
    iataCode: string;
    city: string;
    countryCode: string;
    createdDate: string;
    departureTime: string;
    departureDate: string;
    cityAirporFrom: {
        id: number;
        countryId: number;
        airportName: string;
        iataCode: string;
        city: string;
        countryCode: string;
        createdDate: string;
        country: {
            id: number;
            name: string;
            code: string;
            region: string;
            cityAirports: any[];
            imageFlagFullPath: string;
            createdDate: string;
        };
    };
    cityAirporTo: {
        id: number;
        countryId: number;
        airportName: string;
        iataCode: string;
        city: string;
        countryCode: string;
        createdDate: string;
        country: {
            id: number;
            name: string;
            code: string;
            region: string;
            cityAirports: any[];
            imageFlagFullPath: string;
            createdDate: string;
        };
    };
    aircraft: {
        id: number;
        flightCompanyId: number;
        flightCompany: {
            id: number;
            companyName: string;
            country: string;
            iataDesignator: string;
            icaoCode: string;
            region: string;
            imageId: null;
            imageFullPath: string;
            createdDate: string;
        };
        icaoTypeDesignatorId: number;
        // icaoTypeDesignator: null,
        // cabins: null,
        attachedToFlight: number;
        createdDate: string;
    };
    ticketsMetaData: TicketMetadata[];
}

export interface FlightData {
    Id?: number;
    CityAirporFromId: number;
    CityAirporToId: number;
    AircraftId: number;
    DepartureTime: string;
    DepartureDate: string;
    TicketsMetaData: TicketMetadata[];
}

export interface TicketMetadata {
    cabinClass: string;
    adultPrice: number;
}

export interface FlightSearchParams {
    locationFrom: string;
    locationTo: string;
    flightDefinition: string;
    cabinClass: string;
    dep: string;
    ret: string;
}
