import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Aircraft, AircraftParams } from "../../app/models/aircraft";
import { Airport, AirportParams } from "../../app/models/Airport";
import {
    Flight,
    FlightsAirportParams,
    FlightSearchParams,
    FlightsParams,
} from "../../app/models/flights";
import { FlightData } from "../../app/models/flights";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";

interface FlightsState {
    name: string;
    region: string;
    flightCityAirports: any[];
    flightRegions: any[];
    flightAircrafts: any[];
    flights: any[];
    flightSearchResult: any;
    flightCountryImageFlagFullPath: string;
    createdDate: string;
    flightsLoaded: boolean;
    flightAirportsLoaded: boolean;
    flightRegionsLoaded: boolean;
    flightAircraftsLoaded: boolean;
    flighSearchResultsLoaded: boolean;
    status: string;
    flightsAirportParams: FlightsAirportParams;
    flightsAircraftParams: AircraftParams;
    flightsParams: FlightsParams;
    flightSearchParams: FlightSearchParams;
    metaDataAircrafts: MetaData | null;
    metaDataFlights: MetaData | null;
}

const getAxiosFlightAirportParams = (
    flightAirportParams: FlightsAirportParams
) => {
    const params = new URLSearchParams();

    params.append("region", flightAirportParams.region!);

    return params;
};

const getAxiosFlightAircraftParams = (flightAircraftParams: AircraftParams) => {
    const params = new URLSearchParams();
    params.append("pageNumber", flightAircraftParams.pageNumber.toString());
    params.append("pageSize", flightAircraftParams.pageSize.toString());

    return params;
};

const getAxiosFlightSearchParams = (flightSearchParams: FlightSearchParams) => {
    const params = new URLSearchParams();
    params.append("locationFrom", flightSearchParams.locationFrom.toString());
    params.append("locationTo", flightSearchParams.locationTo.toString());
    params.append(
        "flightDefinition",
        flightSearchParams.flightDefinition.toString()
    );
    params.append("cabinClass", flightSearchParams.cabinClass.toString());
    params.append("dep", flightSearchParams.dep.toString());

    if (flightSearchParams.ret) {
        params.append("ret", flightSearchParams.ret.toString());
    }

    return params;
};

export const fetchFlightSearchAsync = createAsyncThunk<
    Flight[],
    void,
    { state: RootState }
>("flights/fetchFlightSearchAsync", async (_, thunkAPI) => {
    try {
        const params = getAxiosFlightSearchParams(
            thunkAPI.getState().flights.flightSearchParams
        );
        const response = await agent.Flight.searchFlights(params);

        return response;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const fetchFlightAirportsAsync = createAsyncThunk<
    Airport[],
    void,
    { state: RootState }
>("flights/fetchFlightAirportsAsync", async (_, thunkAPI) => {
    try {
        const params = getAxiosFlightAirportParams(
            thunkAPI.getState().flights.flightsAirportParams
        );
        const response = await agent.Flight.listAllAiportsByRegion(params);
        //thunkAPI.dispatch(setMetadata(response.metaData));

        return response;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const fetchFlightAircraftsAsync = createAsyncThunk<
    Aircraft[],
    void,
    { state: RootState }
>("flights/fetchFlightAircraftsAsync", async (_, thunkAPI) => {
    const params = getAxiosFlightAircraftParams(
        thunkAPI.getState().flights.flightsAircraftParams
    );
    try {
        const response = await agent.Flight.listAircrafts(params);
        thunkAPI.dispatch(setAircraftsMetadata(response.metaData));

        return response.items;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const createFlightAsync = createAsyncThunk<void, FlightData>(
    "flights/createFlightAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.Flight.create(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const getAxiosFlightsParams = (flightAircraftParams: AircraftParams) => {
    const params = new URLSearchParams();
    params.append("pageNumber", flightAircraftParams.pageNumber.toString());
    params.append("pageSize", flightAircraftParams.pageSize.toString());

    return params;
};

export const fetchFlightsAsync = createAsyncThunk<
    Flight[],
    void,
    { state: RootState }
>("flights/fetchFlightsAsync", async (_, thunkAPI) => {
    try {
        const params = getAxiosFlightsParams(
            thunkAPI.getState().flights.flightsParams
        );
        const response = await agent.Flight.listFlights(params);

        thunkAPI.dispatch(setFlightsMetadata(response.metaData));

        return response.items;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const fetchFlightByIdAsync = createAsyncThunk<Flight, number>(
    "flight/fetchFlightByIdAsync",
    async (Id, thunkAPI) => {
        try {
            const response = await agent.Flight.details(Id);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const updateFlightAsync = createAsyncThunk<void, FlightData>(
    "flights/updateFlightAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.Flight.updateFlight(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const flightsAdapter = createEntityAdapter<Flight>();

const initFlightAirportParams = () => {
    return {
        region: "All",
    };
};

const initFlightAircraftParams = () => {
    return {
        pageNumber: 1,
        pageSize: 10,
    };
};

const initFlightsParams = () => {
    return {
        pageNumber: 1,
        pageSize: 10,
    };
};

const initFlightSearchParams = () => {
    return {
        locationFrom: "",
        locationTo: "",
        flightDefinition: "",
        cabinClass: "",
        dep: "",
        ret: "",
    };
};

export const flightsSlice = createSlice({
    name: "flights",
    initialState: flightsAdapter.getInitialState<FlightsState>({
        name: "",
        region: "",
        flightCityAirports: [],
        flightRegions: [],
        flightAircrafts: [],
        flightSearchResult: null,
        flights: [],
        flightCountryImageFlagFullPath: "",
        createdDate: "",
        flightAirportsLoaded: false,
        flightRegionsLoaded: false,
        flightAircraftsLoaded: false,
        flighSearchResultsLoaded: true,
        flightsLoaded: false,
        status: "",
        flightsAirportParams: initFlightAirportParams(),
        flightsAircraftParams: initFlightAircraftParams(),
        flightsParams: initFlightsParams(),
        flightSearchParams: initFlightSearchParams(),
        metaDataAircrafts: null,
        metaDataFlights: null,
    }),
    reducers: {
        clearFlightSearchResult(state) {
            state.flightSearchResult = null;
        },
        setFlightSearchParams(state, action) {
            state.flighSearchResultsLoaded = false;
            state.flightSearchParams = {
                ...state.flightSearchParams,
                ...action.payload,
            };
        },
        setIdToEditMode(state, action) {
            localStorage.setItem(
                "idToFetchAndEdit",
                JSON.stringify({
                    id: action.payload,
                })
            );
        },
        setFlightsMetadata(state, action) {
            state.metaDataFlights = action.payload;
        },
        setAircraftsMetadata(state, action) {
            state.metaDataAircrafts = action.payload;
        },
        setFlightAircraftsPageNumber(state, action) {
            state.flightAircraftsLoaded = false;
            state.flightsAircraftParams = {
                ...state.flightsAircraftParams,
                ...action.payload,
            };
        },

        setFlightPageNumber(state, action) {
            state.flightsLoaded = false;
            state.flightsParams = {
                ...state.flightsParams,
                ...action.payload,
            };
        },

        setAirportsLoadedState(state, action) {
            state.flightAirportsLoaded = action.payload;
        },
        changeFlightsLoadedState(state, action) {
            state.flightsLoaded = false;
        },
    },
    extraReducers: (builder) => {
        //------------ FETCH FLIGHTS --------------------
        builder.addCase(fetchFlightsAsync.pending, (state) => {
            state.status = "pendingfetchFlightsAsync";
        });
        builder.addCase(fetchFlightsAsync.fulfilled, (state, action) => {
            flightsAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.flightsLoaded = true;
        });
        builder.addCase(fetchFlightsAsync.rejected, (state) => {
            state.status = "idle";
            state.flightsLoaded = true;
        });
        //---------------------------------------------
        //------------ FETCH AIRPORTS --------------------
        builder.addCase(fetchFlightAirportsAsync.pending, (state) => {
            state.status = "pendingFetchFlightAirports";
        });
        builder.addCase(fetchFlightAirportsAsync.fulfilled, (state, action) => {
            state.flightCityAirports = action.payload;
            state.status = "idle";
            state.flightAirportsLoaded = true;
        });
        builder.addCase(fetchFlightAirportsAsync.rejected, (state) => {
            state.status = "idle";
            state.flightAirportsLoaded = true;
        });
        //---------------------------------------------

        //------------ FETCH FLIGHT AIRCRAFTS --------------------
        builder.addCase(fetchFlightAircraftsAsync.pending, (state) => {
            state.status = "pendingFetchAircrafts";
        });
        builder.addCase(
            fetchFlightAircraftsAsync.fulfilled,
            (state, action) => {
                state.flightAircrafts = action.payload;
                state.status = "idle";
                state.flightAircraftsLoaded = true;
            }
        );
        builder.addCase(fetchFlightAircraftsAsync.rejected, (state) => {
            state.status = "idle";
            state.flightAircraftsLoaded = true;
        });
        //---------------------------------------------
        //------------ FETCH SEARCH FLIGHTS --------------------
        builder.addCase(fetchFlightSearchAsync.pending, (state) => {
            state.status = "pendingfetchFlightsAsync";
        });
        builder.addCase(fetchFlightSearchAsync.fulfilled, (state, action) => {
            state.flightSearchResult = action.payload;
            state.status = "idle";
            state.flighSearchResultsLoaded = true;
        });
        builder.addCase(fetchFlightSearchAsync.rejected, (state) => {
            state.status = "idle";
            state.flighSearchResultsLoaded = true;
        });
        //---------------------------------------------
        //------------ CREATE FLIGHT --------------------
        builder.addCase(createFlightAsync.pending, (state) => {
            state.status = "pendingCreateFlightAsync";
        });
        builder.addCase(createFlightAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.flightsLoaded = false;
            state.flightAircraftsLoaded = false;
        });
        builder.addCase(createFlightAsync.rejected, (state, action) => {
            state.status = "idle";
        });
        //---------------------------------------------
        //------------ FLIGHT  BY ID  --------------------
        builder.addCase(fetchFlightByIdAsync.pending, (state) => {
            state.status = "pendingFetchFlights";
        });
        builder.addCase(fetchFlightByIdAsync.fulfilled, (state, action) => {
            state.status = "idle";
        });
        builder.addCase(fetchFlightByIdAsync.rejected, (state, action) => {
            state.status = "idle";
        });
        //---------------------------------------------

        //------------ UPDATE FLIGHT --------------------
        builder.addCase(updateFlightAsync.pending, (state) => {
            state.status = "pendingUpdateFlightAsync";
        });
        builder.addCase(updateFlightAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.flightsLoaded = false;
            state.flightAircraftsLoaded = false;
        });
        builder.addCase(updateFlightAsync.rejected, (state, action) => {
            state.status = "idle";
        });
        //---------------------------------------------
    },
});

export const {
    setAirportsLoadedState,
    setFlightAircraftsPageNumber,
    setAircraftsMetadata,
    setFlightsMetadata,
    setFlightPageNumber,
    setIdToEditMode,
    setFlightSearchParams,
    clearFlightSearchResult,
    changeFlightsLoadedState,
} = flightsSlice.actions;

export const flightsSelectors = flightsAdapter.getSelectors(
    (state: RootState) => state.flights
);

export default flightsSlice.reducer;
