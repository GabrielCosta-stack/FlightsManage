import { createSlice } from "@reduxjs/toolkit";

interface MenuAdminSate {
    tabOpen: string | null;
    isEditMode: boolean;
    isCreateMode: boolean;
}

const initialState: MenuAdminSate = {
    tabOpen:
        localStorage.getItem("adminComponentToDisplay") === null
            ? "dashboard"
            : localStorage.getItem("adminComponentToDisplay"),

    isEditMode: localStorage.getItem("isEditMode") === null ? false : true,
    isCreateMode: localStorage.getItem("isCreateMode") === null ? false : true,
};

export const menuAdminSlice = createSlice({
    name: "adminMenu",
    initialState,
    reducers: {
        setAdminMenuDisplay(state, action) {
            localStorage.setItem("adminComponentToDisplay", action.payload);
            state.tabOpen = action.payload;
        },

        removeAdminComponentToLoadFromLocalstorage(state) {
            localStorage.removeItem("adminComponentToDisplay");
            state.tabOpen = "dashboard";
        },

        setEditMode(state, action) {
            state.isEditMode = action.payload;
            localStorage.setItem(
                "isEditMode",
                JSON.stringify({
                    isEditMode: "true",
                })
            );
        },

        setCreateMode(state, action) {
            state.isCreateMode = action.payload;
            localStorage.setItem(
                "isCreateMode",
                JSON.stringify({
                    isCreateMode: "true",
                })
            );
        },

        removeCreateMode(state, action) {
            state.isCreateMode = action.payload;
            localStorage.removeItem("isCreateMode");
        },

        removeEditMode(state, action) {
            state.isEditMode = action.payload;
            localStorage.removeItem("isEditMode");
        },

        setDataToEditOnLocalstorage(state, action) {
            //const { Id, Model, IataTypeCode, IcaoCode } = action.payload;
            localStorage.setItem(
                "dataToEdit",
                JSON.stringify({
                    ...action.payload,
                })
            );
        },
        removeDataToEditFromLocalStorage() {
            localStorage.removeItem("dataToEdit");
        },
    },
});

export const {
    setAdminMenuDisplay,
    removeAdminComponentToLoadFromLocalstorage,
    setDataToEditOnLocalstorage,
    setEditMode,
    removeEditMode,
    removeDataToEditFromLocalStorage,
    setCreateMode,
    removeCreateMode,
} = menuAdminSlice.actions;

export default menuAdminSlice.reducer;
