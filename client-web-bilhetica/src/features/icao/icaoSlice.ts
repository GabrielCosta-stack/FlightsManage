import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import {
    IcaoDesignator,
    IcaoDesignatorParams,
} from "../../app/models/icaoDesignator";
import { RootState } from "../../app/store/configureStore";
import agent from "../../api/agent";
import { FieldValues } from "react-hook-form";
import { MetaData } from "../../app/models/pagination";

interface IcaoState {
    icaosLoaded: boolean;
    isIcaoUpdating: boolean;
    icaoDesignators: [];
    status: string;
    icaoToEdit: IcaoDesignator;
    isEditChanged: boolean | null;
    icaoDesignatorParams: IcaoDesignatorParams;
    metaData: MetaData | null;
}

const icaoAdapter = createEntityAdapter<IcaoDesignator>();

const getAxiosParams = (icaoDesignatorParams: IcaoDesignatorParams) => {
    const params = new URLSearchParams();
    params.append("pageNumber", icaoDesignatorParams.pageNumber.toString());
    params.append("pageSize", icaoDesignatorParams.pageSize.toString());

    return params;
};

export const updateIcaoAsync = createAsyncThunk<void, FieldValues>(
    "icao/updateIcaoAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.ICAODesignator.update(data);
            return response.items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const createIcaoAsync = createAsyncThunk<void, FieldValues>(
    "icao/createIcaoAsync",
    async (data, thunkAPI) => {
        try {
            const response = await agent.ICAODesignator.create(data);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchIcaosAsync = createAsyncThunk<
    IcaoDesignator[],
    void,
    { state: RootState }
>("icao/fetchIcaosAsync", async (_, thunkAPI) => {
    // thunkApi needs RootState needs the because the getState()
    const params = getAxiosParams(
        thunkAPI.getState().icao.icaoDesignatorParams
    );
    try {
        const response = await agent.ICAODesignator.list(params);
        thunkAPI.dispatch(setMetadata(response.metaData));
        return response.items;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

export const fetchIcaoByIdAsync = createAsyncThunk<IcaoDesignator, number>(
    "icao/fetchIcaoByIdAsync",
    async (icaoId, thunkAPI) => {
        try {
            const response = await agent.ICAODesignator.details(icaoId);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const deleteIcaoAsync = createAsyncThunk<void, number>(
    "icao/deleteIcaoAsync",
    async (icaoId, thunkAPI) => {
        try {
            const response = await agent.ICAODesignator.delete(icaoId);
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

const initIcaoToEdit = () => {
    return {
        id: 0,
        model: "",
        iataTypeCode: "",
        icaoCode: "",
    };
};

export const icaoSlice = createSlice({
    name: "icao",
    initialState: icaoAdapter.getInitialState<IcaoState>({
        icaosLoaded: false,
        isIcaoUpdating: false,
        icaoDesignators: [],
        status: "idle",
        icaoToEdit: initIcaoToEdit(),
        isEditChanged: false,
        icaoDesignatorParams: initParams(),
        metaData: null,
    }),
    reducers: {
        setPageNumber: (state, action) => {
            state.icaosLoaded = false;
            state.icaoDesignatorParams = {
                ...state.icaoDesignatorParams,
                ...action.payload,
            };
        },
        setMetadata(state, action) {
            state.metaData = action.payload;
        },
        setIcaoToEdit(state, action) {
            state.icaoToEdit = {
                ...action.payload,
            };
        },
        editIcaoChangeState(state, action) {
            state.isEditChanged = action.payload;
        },

        changeIcaoLoadedState(state, action) {
            state.icaosLoaded = action.payload;
        },
    },
    extraReducers: (builder) => {
        //------------ FETCH ICAOS --------------------
        builder.addCase(fetchIcaosAsync.pending, (state) => {
            state.status = "pendingFetchIcaos";
        });
        builder.addCase(fetchIcaosAsync.fulfilled, (state, action) => {
            icaoAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.icaosLoaded = true;
        });
        builder.addCase(fetchIcaosAsync.rejected, (state) => {
            state.status = "idle";
            state.icaosLoaded = true;
        });
        //---------------------------------------------
        //------------ FETCH BY ID ICAOS --------------------
        builder.addCase(fetchIcaoByIdAsync.pending, (state) => {
            state.status = "pendingFetchIcaos";
        });
        builder.addCase(fetchIcaoByIdAsync.fulfilled, (state, action) => {
            icaoAdapter.upsertOne(state, action.payload);
            state.status = "idle";
            state.icaosLoaded = true;
        });
        builder.addCase(fetchIcaoByIdAsync.rejected, (state, action) => {
            state.status = "idle";
        });
        //---------------------------------------------
        //------------ CREATE ICAOS --------------------
        builder.addCase(createIcaoAsync.pending, (state) => {
            state.status = "pendingFetchIcaos";
        });
        builder.addCase(createIcaoAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.icaosLoaded = false;
        });
        builder.addCase(createIcaoAsync.rejected, (state, action) => {
            state.status = "idle";
        });
        //---------------------------------------------

        //------------ UPDATE ICAO --------------------
        builder.addCase(updateIcaoAsync.pending, (state) => {
            state.status = "pendingUpdateIcao";
        });
        builder.addCase(updateIcaoAsync.fulfilled, (state) => {
            state.status = "idle";
            state.icaosLoaded = false;
        });
        builder.addCase(updateIcaoAsync.rejected, (state) => {
            state.status = "idle";
        });

        //---------------------------------------------

        //------------ DELETE ICAO --------------------
        builder.addCase(deleteIcaoAsync.pending, (state) => {
            state.status = "pendingDeleteIcao";
        });
        builder.addCase(deleteIcaoAsync.fulfilled, (state) => {
            state.status = "idle";
            state.icaosLoaded = false;
        });
        builder.addCase(deleteIcaoAsync.rejected, (state) => {
            state.status = "idle";
        });

        //---------------------------------------------
    },
});

export const {
    setIcaoToEdit,
    editIcaoChangeState,
    changeIcaoLoadedState,
    setMetadata,
    setPageNumber,
} = icaoSlice.actions;

export const icaoSelectors = icaoAdapter.getSelectors(
    (state: RootState) => state.icao
);
export default icaoSlice.reducer;
