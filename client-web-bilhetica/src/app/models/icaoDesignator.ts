export interface IcaoDesignator {
    id: number;
    icaoCode: string;
    iataTypeCode: string;
    model: string;
    createdDate?: string;
}

export interface IcaoDesignatorParams {
    pageNumber: number;
    pageSize: number;
}
