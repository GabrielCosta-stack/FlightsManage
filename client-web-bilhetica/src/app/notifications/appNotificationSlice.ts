import { ActionTypes } from "@mui/base";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

interface NotificationState {
    message: string | null;
    type: string | null;
    open: boolean;
}

const initialState: NotificationState = {
    message: null,
    type: null,
    open: false,
};

export const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        showNotification(state, action) {
            const { message, type, open } = action.payload;
            state.message = message;
            state.type = type;
            state.open = open;
        },

        removeNotificationComponent(state) {
            state.open = false;
        },
    },
});

export const { showNotification, removeNotificationComponent } =
    notificationSlice.actions;

export default notificationSlice.reducer;
