import AdminPanelContent from "../../app/layout/AdminPanelContent";

import {
    flightCompanySelectors,
    fetchFlightCompaniesAsync,
} from "../companies/companySlice";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect } from "react";
import TableFlightCompanies from "./TableFlightCompanies";
import LoadingComponent from "../../components/LoadingComponent";
import AppNotification from "../../app/notifications/AppNotification";

const Companies = () => {
    const dispatch = useAppDispatch();
    const flightCompanies = useAppSelector(flightCompanySelectors.selectAll);

    const { flightCompaniesLoaded } = useAppSelector(
        (state) => state.flightComapny
    );

    useEffect(() => {
        if (!flightCompaniesLoaded) dispatch(fetchFlightCompaniesAsync());
    }, [flightCompaniesLoaded]);

    if (!flightCompaniesLoaded)
        return (
            <AdminPanelContent>
                <LoadingComponent message='Loading Flight Companies' />
            </AdminPanelContent>
        );

    return (
        <AdminPanelContent>
            <h1 className='is-size-6 is-uppercase has-text-weight-medium'>
                Flight Companies
            </h1>
            <AppNotification />
            <TableFlightCompanies flightCompanies={flightCompanies} />
        </AdminPanelContent>
    );
};

export default Companies;
