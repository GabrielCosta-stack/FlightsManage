export interface FlightCompany {
    id: number;
    companyName: string;
    country: string;
    region: string;
    imageId?: string;
    imageFullPath?: string;
    createdDate: string;
    icaoCode: string;
    iataDesignator: string;
}

export interface FlightCompanyParams {
    pageNumber: number;
    pageSize: number;
}
