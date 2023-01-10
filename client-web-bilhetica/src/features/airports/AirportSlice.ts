import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import agent from "../../api/agent";
import {
    AiportsBySearch,
    Airport,
    AirportParams,
    AirportSearchParams,
} from "../../app/models/Airport";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";

interface AirportState {
    name: string;
    code: string;
    region: string;
    cityAirports: any[];
    flightCityAirportsSearch: any[];
    regions: any[];
    imageFlagFullPath: string;
    createdDate: string;
    airportsLoaded: boolean;
    regionsLoaded: boolean;
    status: string;
    airportParams: AirportParams;
    airportSearchTerm: AirportSearchParams;
    airportBySearchLoaded: boolean;
    metaData: MetaData | null;
}

const getAxiosParams = (airportParams: AirportParams) => {
    const params = new URLSearchParams();
    params.append("pageNumber", airportParams.pageNumber.toString());
    params.append("pageSize", airportParams.pageSize.toString());

    if (airportParams.region) params.append("region", airportParams.region);

    return params;
};

const getAxiosAirportSearchParams = (
    airportSearchParams: AirportSearchParams
) => {
    const params = new URLSearchParams();
    params.append("searchTerm", airportSearchParams.searchTerm.toString());
    return params;
};

export const fetchAirportsAsync = createAsyncThunk<
    Airport[],
    void,
    { state: RootState }
>("airports/fetchAirportsAsync", async (_, thunkAPI) => {
    try {
        const params = getAxiosParams(
            thunkAPI.getState().airports.airportParams
        );
        const response = await agent.Airport.list(params);
        thunkAPI.dispatch(setMetadata(response.metaData));
        return response.items;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const fetchAirportsBySearchTermAsync = createAsyncThunk<
    AiportsBySearch[],
    void,
    { state: RootState }
>("airports/fetchAirportsBySearchTermAsync", async (_, thunkAPI) => {
    try {
        const params = getAxiosAirportSearchParams(
            thunkAPI.getState().airports.airportSearchTerm
        );
        const response = await agent.Airport.listBySearchTerm(params);
        return response;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const fetchAiportsOptionsAsync = createAsyncThunk(
    "airports/fetchAiportsOptionsAsync",
    async (_, thunkAPI) => {
        try {
            const response = await agent.Airport.fetchOptions();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

const airportsAdapter = createEntityAdapter<Airport>();

const initParams = () => {
    return {
        pageNumber: 1,
        pageSize: 10,
        region: "All",
    };
};

const initSearchParams = () => {
    return {
        searchTerm: "",
    };
};

export const airportsSlice = createSlice({
    name: "airports",
    initialState: airportsAdapter.getInitialState<AirportState>({
        name: "",
        code: "",
        region: "",
        cityAirports: [],
        regions: [],
        flightCityAirportsSearch: [],
        imageFlagFullPath: "",
        createdDate: "",
        airportsLoaded: false,
        regionsLoaded: false,
        status: "",
        airportParams: initParams(),
        airportSearchTerm: initSearchParams(),
        airportBySearchLoaded: true,
        metaData: null,
    }),
    reducers: {
        setAirportSearchTerm(state, action) {
            state.airportSearchTerm = {
                ...state.airportSearchTerm,
                ...action.payload,
            };
            state.airportBySearchLoaded = false;
        },
        clearAirportsSearch(state) {
            state.flightCityAirportsSearch = [];
        },
        clearSearchTerm(state) {
            state.airportSearchTerm = initSearchParams();
        },
        setMetadata(state, action) {
            state.metaData = action.payload;
        },
        setPageNumber(state, action) {
            state.airportsLoaded = false;
            state.airportParams = {
                ...state.airportParams,
                ...action.payload,
            };
        },
        setProductParams: (state, action) => {
            state.airportsLoaded = false;
            state.airportParams = {
                ...state.airportParams,
                ...action.payload,
                pageNumber: 1,
            };
        },
        changeAirportsLoadedState(state, action) {
            state.airportsLoaded = action.payload;
        },
    },
    extraReducers: (builder) => {
        //------------ FETCH AIRPORTS --------------------
        builder.addCase(fetchAirportsAsync.pending, (state) => {
            state.status = "pendingFetchAircrafts";
        });
        builder.addCase(fetchAirportsAsync.fulfilled, (state, action) => {
            airportsAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.airportsLoaded = true;
        });
        builder.addCase(fetchAirportsAsync.rejected, (state) => {
            state.status = "idle";
            state.airportsLoaded = true;
        });
        //---------------------------------------------

        //------------ FETCH AIRPORTS BY SEARCHTERM --------------------
        builder.addCase(fetchAirportsBySearchTermAsync.pending, (state) => {
            state.status = "pendingFetchAirportsBySearchTermAsync";
        });
        builder.addCase(
            fetchAirportsBySearchTermAsync.fulfilled,
            (state, action) => {
                state.airportBySearchLoaded = true;
                state.flightCityAirportsSearch = action.payload;
            }
        );
        builder.addCase(fetchAirportsBySearchTermAsync.rejected, (state) => {
            state.status = "idle";
            state.airportBySearchLoaded = true;
        });
        //---------------------------------------------

        //------------ FETCH AIRPORTS OPTIONS --------------------
        builder.addCase(fetchAiportsOptionsAsync.pending, (state) => {
            state.status = "pendingFetchAircraftsOptions";
        });
        builder.addCase(fetchAiportsOptionsAsync.fulfilled, (state, action) => {
            state.regions = action.payload.regions;
            state.status = "idle";
            state.regionsLoaded = true;
        });
        builder.addCase(fetchAiportsOptionsAsync.rejected, (state) => {
            state.status = "idle";
            state.regionsLoaded = true;
        });
        //---------------------------------------------
    },
});

export const {
    setMetadata,
    setPageNumber,
    setProductParams,
    setAirportSearchTerm,
    clearAirportsSearch,
    clearSearchTerm,
    changeAirportsLoadedState,
} = airportsSlice.actions;

export const airportsSelectors = airportsAdapter.getSelectors(
    (state: RootState) => state.airports
);
export default airportsSlice.reducer;
