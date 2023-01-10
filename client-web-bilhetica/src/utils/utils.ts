import { isFulfilled } from "@reduxjs/toolkit";

export const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
};

export const formatFlightDate = (date: Date): string => {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return [day, month, year].join("/");
};

export const flightDefinition = (roundTrip: boolean, oneWay: boolean) => {
    if (roundTrip) {
        return "roundtrip";
    }

    if (oneWay) {
        return "one-way";
    }
};
