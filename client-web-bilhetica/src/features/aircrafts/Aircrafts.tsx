import AdminPanelContent from "../../app/layout/AdminPanelContent";
import TableAircraft from "./TableAircraft";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { aircraftSelectors, fetchAircraftsAsync } from "./aircraftSlice";
import { useEffect } from "react";
import LoadingComponent from "../../components/LoadingComponent";

const Aircrafts = () => {
    const dispatch = useAppDispatch();
    const aircrafts = useAppSelector(aircraftSelectors.selectAll);
    const { aircraftsLoaded } = useAppSelector((state) => state.aircrafts);

    useEffect(() => {
        if (!aircraftsLoaded) dispatch(fetchAircraftsAsync());
    }, [aircraftsLoaded]);

    if (!aircraftsLoaded)
        return (
            <AdminPanelContent>
                <LoadingComponent message='Loading aircrafts' />
            </AdminPanelContent>
        );

    return (
        <AdminPanelContent>
            <h1 className='is-size-6 is-uppercase has-text-weight-medium'>
                Aircrafts
            </h1>

            <TableAircraft aircrafts={aircrafts} />
        </AdminPanelContent>
    );
};

export default Aircrafts;
