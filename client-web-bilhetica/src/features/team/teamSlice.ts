import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { RootState } from "../../app/store/configureStore";

interface TeamMember {
    Firstname: string;
    Lastname: string;
    UserName: string;
    Role: string;
    Address: string;
    PhoneNumber: string;
    ImageId: string;
}

interface TeamState {
    teamMembersLoaded: boolean;
    teamMembers: [];
    status: string;
}

export const fetchTeamMembersAsync = createAsyncThunk<
    TeamMember[],
    void,
    { state: RootState }
>("team/fetchTeamMembersAsync", async (_, thunkAPI) => {
    try {
        const response = await agent.Team.list();

        return response;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
    }
});

const teamAdapter = createEntityAdapter<TeamMember>();

export const teamSlice = createSlice({
    name: "team",
    initialState: teamAdapter.getInitialState<TeamState>({
        teamMembersLoaded: false,
        teamMembers: [],
        status: "idle",
    }),
    reducers: {
        changeTeamMemberLoadedState(state, action) {
            state.teamMembersLoaded = action.payload;
        },
        setIdToEditMode(state, action) {
            localStorage.setItem(
                "idToFetchAndEdit",
                JSON.stringify({
                    id: action.payload,
                })
            );
        },
    },
    extraReducers: (builder) => {
        //------------ FETCH ICAOS --------------------
        builder.addCase(fetchTeamMembersAsync.pending, (state) => {
            state.status = "pendingfetchTeamMembersAsync";
        });
        builder.addCase(fetchTeamMembersAsync.fulfilled, (state, action) => {
            teamAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.teamMembersLoaded = true;
        });
        builder.addCase(fetchTeamMembersAsync.rejected, (state) => {
            state.status = "idle";
            state.teamMembersLoaded = true;
        });
        //---------------------------------------------
    },
});

export const { changeTeamMemberLoadedState, setIdToEditMode } =
    teamSlice.actions;

export const teamSelectors = teamAdapter.getSelectors(
    (state: RootState) => state.team
);
export default teamSlice.reducer;
