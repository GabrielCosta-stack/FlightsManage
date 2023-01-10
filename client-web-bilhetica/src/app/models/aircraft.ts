import { FlightCompany } from "./flightCompany";
import { IcaoDesignator } from "./icaoDesignator";

interface Cabin {
    Class: string;
    Lines: number;
    Columns: string[];
}

export interface Aircraft {
    id: number;
    flightCompanyId: number | undefined;
    flightCompany: FlightCompany | null;
    icaoTypeDesignatorId: number | undefined;
    icaoTypeDesignator: IcaoDesignator | null;
    cabins: any[] | null;
    attachedToFlight: number | undefined;
    createdDate?: string;
}

export interface AircraftCreate {
    flightCompanyId: number;
    icaoTypeDesignatorId: number;
    Cabins: Cabin[];
}

export interface AircraftDeleteCabin {
    FlightCompanyId: number | undefined;
    ICAOTypeDesignatorId: number | undefined;
    Class: string;
}

export interface AircraftCreateCabin {
    FlightCompanyId: number | undefined;
    ICAOTypeDesignatorId: number | undefined;
    Cabins: Cabin[];
}

export interface AircraftUpdate {
    flightCompanyId: number;
    icaoTypeDesignatorId: number;
    Cabins: Cabin[];
}

export interface AircraftUpdateCabinColumns {
    flightCompanyId: number;
    icaoTypeDesignatorId: number;
    lines: number;
    class: string;
    columns: string[];
}

export interface AircraftParams {
    pageNumber: number;
    pageSize: number;
}
