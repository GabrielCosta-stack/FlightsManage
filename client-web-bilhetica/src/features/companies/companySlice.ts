import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../api/agent";
import {
    FlightCompany,
    FlightCompanyParams,
} from "../../app/models/flightCompany";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";

interface FlightCompanyState {
    flightCompaniesLoaded: boolean;
    isFlightCompanyUpdating: boolean;
    flightCompanyNamesLoaded: boolean;
    flightCompanies: any[];
    flightCompanyNames: any[];
    status: string;
    flightCompanyToEdit: FlightCompany;
    isEditChanged: boolean | null;
    flightCompanyParams: FlightCompanyParams;
    metaData: MetaData | null;
}

const flightCompanyAdapter = createEntityAdapter<FlightCompany>();

const getAxiosParams = (flightCompanyParams: FlightCompanyParams) => {
    const params = new URLSearchParams();
    params.append("pageNumber", flightCompanyParams.pageNumber.toString());
    params.append("pageSize", flightCompanyParams.pageSize.toString());

    return params;
};

export const fetchFlightCompanyNamesAsync = createAsyncThunk(
    "flightCompany/fetchFlightCompanyNamesAsync",
    async (_, thunkAPI) => {
        try {
            const response = await agent.FlightCompany.listNames();
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchFlightCompaniesAsync = createAsyncThunk<
    FlightCompany[],
    void,
    { state: RootState }
>("flightCompany/fetchFlightCompaniesAsync", async (_, thunkAPI) => {
    // thunkApi needs RootState needs the because the getState()
    const params = getAxiosParams(
        thunkAPI.getState().flightComapny.flightCompanyParams
    );
    try {
        const response = await agent.FlightCompany.list(params);
        thunkAPI.dispatch(setMetadata(response.metaData));
        return response.items;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const createFlightCompanyAsync = createAsyncThunk<void, FieldValues>(
    "flightCompany/createFlightCompanyAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.FlightCompany.create(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchFlightCompanyByIdAsync = createAsyncThunk<
    FlightCompany,
    number
>("flightCompany/fetchFlightCompanyByIdAsync", async (fcId, thunkAPI) => {
    try {
        const response = await agent.FlightCompany.details(fcId);
        return response;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const updateFlightCompanyAsync = createAsyncThunk<void, FieldValues>(
    "flightCompany/updateFlightCompanyAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.FlightCompany.update(data);
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteFlightCompanyAsync = createAsyncThunk<void, number>(
    "flightCompany/deleteFlightCompanyAsync",
    async (fcId, thunkAPI) => {
        try {
            const response = await agent.FlightCompany.delete(fcId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

const initParams = () => {
    return {
        pageNumber: 1,
        pageSize: 10,
    };
};

const initFlightCompanyToEdit = () => {
    return {
        id: 0,
        companyName: "",
        country: "",
        region: "",
        imageId: "",
        createdDate: "",
        icaoCode: "",
        iataDesignator: "",
    };
};
export const flightCompanySlice = createSlice({
    name: "flightCompany",
    initialState: flightCompanyAdapter.getInitialState<FlightCompanyState>({
        flightCompaniesLoaded: false,
        isFlightCompanyUpdating: false,
        flightCompanyNamesLoaded: false,
        flightCompanies: [],
        flightCompanyNames: [],
        status: "idle",
        flightCompanyToEdit: initFlightCompanyToEdit(),
        isEditChanged: false,
        flightCompanyParams: initParams(),
        metaData: null,
    }),
    reducers: {
        changeFlightCompanyLoadedState(state, action) {
            state.flightCompaniesLoaded = action.payload;
        },
        setPageNumber: (state, action) => {
            state.flightCompaniesLoaded = false;
            state.flightCompanyParams = {
                ...state.flightCompanyParams,
                ...action.payload,
            };
        },
        setMetadata(state, action) {
            state.metaData = action.payload;
        },
        setFlightCompanyToEdit(state, action) {
            state.flightCompanyToEdit = {
                ...action.payload,
            };
        },
        editFlightCompanyChangeState(state, action) {
            state.isEditChanged = action.payload;
        },
    },
    extraReducers: (builder) => {
        //------------ FETCH FLIGHT COMPANIES --------------------
        builder.addCase(fetchFlightCompaniesAsync.pending, (state) => {
            state.status = "pendingFetchFlightCompanies";
        });
        builder.addCase(
            fetchFlightCompaniesAsync.fulfilled,
            (state, action) => {
                flightCompanyAdapter.setAll(state, action.payload);
                state.status = "idle";
                state.flightCompaniesLoaded = true;
            }
        );
        builder.addCase(fetchFlightCompaniesAsync.rejected, (state) => {
            state.status = "idle";
            state.flightCompaniesLoaded = true;
        });
        //---------------------------------------------

        //------------ FETCH FLIGHT COMPANY NAMES --------------------
        builder.addCase(fetchFlightCompanyNamesAsync.pending, (state) => {
            state.status = "pendingFetchFlightCompanyNamesAsync";
        });
        builder.addCase(
            fetchFlightCompanyNamesAsync.fulfilled,
            (state, action) => {
                state.status = "idle";
                state.flightCompanyNames = action.payload;
                state.flightCompanyNamesLoaded = true;
            }
        );
        builder.addCase(fetchFlightCompanyNamesAsync.rejected, (state) => {
            state.status = "idle";
            state.flightCompaniesLoaded = true;
        });
        //---------------------------------------------

        //------------ CREATE FLIGHT COMPANIES --------------------
        builder.addCase(createFlightCompanyAsync.pending, (state) => {
            state.status = "pendingFetchFlightCompanies";
        });
        builder.addCase(createFlightCompanyAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.flightCompaniesLoaded = false;
        });
        builder.addCase(createFlightCompanyAsync.rejected, (state) => {
            state.status = "idle";
            state.flightCompaniesLoaded = true;
        });
        //---------------------------------------------
        //------------ UPDATE ICAO --------------------
        builder.addCase(updateFlightCompanyAsync.pending, (state) => {
            state.status = "pendingUpdateFlightCompany";
        });
        builder.addCase(updateFlightCompanyAsync.fulfilled, (state) => {
            state.status = "idle";
            state.flightCompaniesLoaded = false;
        });
        builder.addCase(updateFlightCompanyAsync.rejected, (state) => {
            state.status = "idle";
        });

        //---------------------------------------------

        //------------ FLIGHT COMPANY BY ID  --------------------
        builder.addCase(fetchFlightCompanyByIdAsync.pending, (state) => {
            state.status = "pendingFetchFlightCompany";
        });
        builder.addCase(
            fetchFlightCompanyByIdAsync.fulfilled,
            (state, action) => {
                state.status = "idle";
            }
        );
        builder.addCase(
            fetchFlightCompanyByIdAsync.rejected,
            (state, action) => {
                state.status = "idle";
            }
        );
        //---------------------------------------------

        //------------ DELETE Flight Company --------------------
        builder.addCase(deleteFlightCompanyAsync.pending, (state) => {
            state.status = "pendingDeleteFlightCompany";
        });
        builder.addCase(deleteFlightCompanyAsync.fulfilled, (state) => {
            state.status = "idle";
            state.flightCompaniesLoaded = false;
        });
        builder.addCase(deleteFlightCompanyAsync.rejected, (state) => {
            state.status = "idle";
        });

        //---------------------------------------------
    },
});

export const {
    setPageNumber,
    setMetadata,
    setFlightCompanyToEdit,
    editFlightCompanyChangeState,
    changeFlightCompanyLoadedState,
} = flightCompanySlice.actions;

export const flightCompanySelectors = flightCompanyAdapter.getSelectors(
    (state: RootState) => state.flightComapny
);
export default flightCompanySlice.reducer;
