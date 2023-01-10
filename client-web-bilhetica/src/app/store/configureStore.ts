import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { icaoSlice } from "../../features/icao/icaoSlice";
import { menuAdminSlice } from "../../features/menu/menuSlice";
import { flightCompanySlice } from "../../features/companies/companySlice";
import { aircraftsSlice } from "../../features/aircrafts/aircraftSlice";
import { notificationSlice } from "../notifications/appNotificationSlice";
import { airportsSlice } from "../../features/airports/AirportSlice";
import { flightsSlice } from "../../features/flights/flightsSlice";
import { accountSlice } from "../../pages/account/accountSlice";
import { teamSlice } from "../../features/team/teamSlice";

export const store = configureStore({
    reducer: {
        icao: icaoSlice.reducer,
        adminMenu: menuAdminSlice.reducer,
        flightComapny: flightCompanySlice.reducer,
        aircrafts: aircraftsSlice.reducer,
        notification: notificationSlice.reducer,
        airports: airportsSlice.reducer,
        flights: flightsSlice.reducer,
        account: accountSlice.reducer,
        team: teamSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
