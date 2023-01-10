export interface Airport {
    id: number;
    name: string;
    code: string;
    region: string;
    cityAirports: any[];
    imageFlagFullPath: string;
    createdDate: string;
}

export interface AirportParams {
    pageNumber: number;
    pageSize: number;
    region?: string;
}

export interface AirportSearchParams {
    searchTerm: string;
}

export interface AiportsBySearch {
    id: number;
    countryId: number;
    country: null;
    airportName: string;
    iataCode: string;
    city: string;
    countryCode: string;
    createdDate: string;
}
