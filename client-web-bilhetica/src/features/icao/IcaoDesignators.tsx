import { useEffect } from "react";

import AdminPanelContent from "../../app/layout/AdminPanelContent";

import { fetchIcaosAsync, icaoSelectors } from "./icaoSlice";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

import TableIcao from "./TableIcao";
import LoadingComponent from "../../components/LoadingComponent";
import AppNotification from "../../app/notifications/AppNotification";

const IcaoDesignators = () => {
    const dispatch = useAppDispatch();
    const icaos = useAppSelector(icaoSelectors.selectAll);
    const { icaosLoaded } = useAppSelector((state) => state.icao);

    useEffect(() => {
        if (!icaosLoaded) dispatch(fetchIcaosAsync());
    }, [icaosLoaded]);

    if (!icaosLoaded)
        return (
            <AdminPanelContent>
                <LoadingComponent message='Loading icao designators' />
            </AdminPanelContent>
        );

    return (
        <AdminPanelContent>
            <h1 className='is-size-6 is-uppercase has-text-weight-medium'>
                ICAO DESIGNATORS
            </h1>
            <div className='notification is-info'>
                An ICAO Aircraft Type Designator consists of not more than four
                characters and is used in flight plans and associated air
                traffic services messages. Each designator is, in principle,
                derived from the manufacturer’s product designation or from a
                commonly used military type number. Only one designator is
                assigned per aircraft type unless a variant has a difference in
                a performance that is potentially significant for air traffic
                services, or when no shared designator can be assigned for some
                other reason.
            </div>
            <AppNotification />
            <TableIcao icaos={icaos} />
        </AdminPanelContent>
    );
};

export default IcaoDesignators;
