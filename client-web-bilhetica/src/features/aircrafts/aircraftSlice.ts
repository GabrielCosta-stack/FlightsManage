import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import agent from "../../api/agent";
import {
    Aircraft,
    AircraftCreate,
    AircraftCreateCabin,
    AircraftDeleteCabin,
    AircraftParams,
    AircraftUpdateCabinColumns,
} from "../../app/models/aircraft";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";

interface AircraftState {
    aircraftsLoaded: boolean;
    isAircraftsUpdating: boolean;
    aircrafts: any[];
    models: any[];
    flightCompanies: any[];
    status: string;
    aircraftToEdit: Aircraft;
    isEditChanged: boolean | null;
    aircraftsOptionsLoaded: boolean;
    aircraftParams: AircraftParams;
    metaData: MetaData | null;
}

const getAxiosParams = (flightCompanyParams: AircraftParams) => {
    const params = new URLSearchParams();
    params.append("pageNumber", flightCompanyParams.pageNumber.toString());
    params.append("pageSize", flightCompanyParams.pageSize.toString());

    return params;
};

const aircraftsAdapter = createEntityAdapter<Aircraft>();

export const fetchAircraftsAsync = createAsyncThunk<
    Aircraft[],
    void,
    { state: RootState }
>("aircrafts/fetchAircraftsAsync", async (_, thunkAPI) => {
    const params = getAxiosParams(thunkAPI.getState().aircrafts.aircraftParams);
    try {
        const response = await agent.Aircraft.list(params);
        thunkAPI.dispatch(setMetadata(response.metaData));
        return response.items;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const fetchAircraftsOptionsAsync = createAsyncThunk(
    "aircrafts/fetchAircraftsOptionsAsync",
    async (_, thunkAPI) => {
        try {
            const response = await agent.Aircraft.fetchOptions();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const createAircraftAsync = createAsyncThunk<void, AircraftCreate>(
    "aircrafts/createAircraftAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.Aircraft.create(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchAircraftByIdAsync = createAsyncThunk<Aircraft, number>(
    "aircrafts/fetchAircraftByIdAsync",
    async (aId, thunkAPI) => {
        try {
            const response = await agent.Aircraft.details(aId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deleteCabinAsync = createAsyncThunk<void, AircraftDeleteCabin>(
    "aircrafts/deleteAircraftAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.Aircraft.deleteCabinUpdate(data);
            return response;
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const createCabinAsync = createAsyncThunk<void, AircraftCreateCabin>(
    "aircrafts/deleteAircraftAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.Aircraft.createCabinUpdate(data);
            return response;
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const updateCabinColumns = createAsyncThunk<
    void,
    AircraftUpdateCabinColumns
>("aircrafts/updateAircraftCabinColumnsAsync", async (data, thunkAPI) => {
    try {
        const response = await agent.Aircraft.updateCabinColumns(data);
        return response;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

const initParams = () => {
    return {
        pageNumber: 1,
        pageSize: 10,
    };
};

export const aircraftsSlice = createSlice({
    name: "aircrafts",
    initialState: aircraftsAdapter.getInitialState<AircraftState>({
        aircraftsLoaded: false,
        isAircraftsUpdating: false,
        aircrafts: [],
        models: [],
        flightCompanies: [],
        status: "idle",
        aircraftToEdit: {
            id: 0,
            flightCompanyId: 0,
            flightCompany: null,
            icaoTypeDesignatorId: 0,
            icaoTypeDesignator: null,
            cabins: [],
            attachedToFlight: 0,
            createdDate: "",
        },
        isEditChanged: false,
        aircraftsOptionsLoaded: false,
        aircraftParams: initParams(),
        metaData: null,
    }),
    reducers: {
        editAircraftChangeState(state, action) {
            state.isEditChanged = action.payload;
        },
        setPageNumber: (state, action) => {
            state.aircraftsLoaded = false;
            state.aircraftParams = {
                ...state.aircraftParams,
                ...action.payload,
            };
        },
        setMetadata(state, action) {
            state.metaData = action.payload;
        },
        setAircraftEdit(state, action) {
            state.aircraftToEdit = {
                ...action.payload,
            };
        },
        changeAircraftLoadedState(state, action) {
            state.aircraftsLoaded = action.payload;
        },
    },
    extraReducers: (builder) => {
        //------------ CREATE AIRCRAFT --------------------
        builder.addCase(createAircraftAsync.pending, (state) => {
            state.status = "pendingFetchAircrafts";
        });
        builder.addCase(createAircraftAsync.fulfilled, (state, action) => {
            state.aircraftsLoaded = false;
        });
        builder.addCase(createAircraftAsync.rejected, (state) => {
            state.status = "idle";
            state.aircraftsLoaded = true;
        });
        //---------------------------------------------
        //------------ FETCH AIRCRAFTS --------------------
        builder.addCase(fetchAircraftsAsync.pending, (state) => {
            state.status = "pendingFetchAircrafts";
        });
        builder.addCase(fetchAircraftsAsync.fulfilled, (state, action) => {
            aircraftsAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.aircraftsLoaded = true;
        });
        builder.addCase(fetchAircraftsAsync.rejected, (state) => {
            state.status = "idle";
            state.aircraftsLoaded = true;
        });
        //---------------------------------------------

        //------------ FETCH AIRCRAFTS OPTIONS --------------------
        builder.addCase(fetchAircraftsOptionsAsync.pending, (state) => {
            state.status = "pendingFetchAircraftsOptions";
        });
        builder.addCase(
            fetchAircraftsOptionsAsync.fulfilled,
            (state, action) => {
                state.flightCompanies = action.payload.flightCompanies;
                state.models = action.payload.models;
                state.status = "idle";
                state.aircraftsOptionsLoaded = true;
            }
        );
        builder.addCase(fetchAircraftsOptionsAsync.rejected, (state) => {
            state.status = "idle";
            state.aircraftsOptionsLoaded = true;
        });
        //---------------------------------------------

        //------------ FLIGHT COMPANY BY ID  --------------------
        builder.addCase(fetchAircraftByIdAsync.pending, (state) => {
            state.status = "pendingFetchIcaos";
        });
        builder.addCase(fetchAircraftByIdAsync.fulfilled, (state, action) => {
            state.status = "idle";
        });
        builder.addCase(fetchAircraftByIdAsync.rejected, (state, action) => {
            state.status = "idle";
        });
        //---------------------------------------------

        //------------ Update Cabin Columns  --------------------
        builder.addCase(updateCabinColumns.pending, (state) => {
            state.status = "pendingFetchIcaos";
        });
        builder.addCase(updateCabinColumns.fulfilled, (state) => {
            state.status = "idle";
        });
        builder.addCase(updateCabinColumns.rejected, (state) => {
            state.status = "idle";
        });
        //---------------------------------------------
    },
});

export const {
    editAircraftChangeState,
    setPageNumber,
    setMetadata,
    setAircraftEdit,
    changeAircraftLoadedState,
} = aircraftsSlice.actions;

export const aircraftSelectors = aircraftsAdapter.getSelectors(
    (state: RootState) => state.aircrafts
);
export default aircraftsSlice.reducer;
