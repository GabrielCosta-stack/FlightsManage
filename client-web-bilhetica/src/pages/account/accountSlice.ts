import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import agent from "../../api/agent";
import { User } from "../../app/models/user";
import { history } from "../..";
import { UserloginData } from "./LoginPage";

interface AccountState {
    user: User | null;
    status: string;
}

interface RecoverPasswordData {
    email: string;
}

let userdata: User | null = null;

if (localStorage.getItem("user") !== null) {
    userdata = JSON.parse(localStorage.getItem("user")!);
}

const initialState: AccountState = {
    status: "idle",
    user: userdata !== null ? userdata : null,
};

export const signInUser = createAsyncThunk<User, UserloginData>(
    "account/signInUser",
    async (data, thunkAPI) => {
        try {
            thunkAPI.dispatch(
                setUser(JSON.parse(localStorage.getItem("user")!))
            );
            const userDto = await agent.Account.login(data)!;

            localStorage.setItem("user", JSON.stringify(userDto));
            return userDto;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const forgotPassword = createAsyncThunk<void, RecoverPasswordData>(
    "account/forgotPassword",
    async (email, thunkAPI) => {
        try {
            const response = await agent.Account.recoverPassword(email);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem("user");
            history.push("/");
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signInUser.rejected, (state) => {
            state.status = "idle";
            state.user = null;
            localStorage.removeItem("user");

            history.push("/");
        });
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload;
        });

        builder.addCase(signInUser.pending, (state, action) => {
            state.status = "pendindloginUser";
        });
    },
});

export const { signOut, setUser } = accountSlice.actions;
