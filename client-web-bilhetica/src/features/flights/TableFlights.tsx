import {
    faArrowsRotate,
    faPenToSquare,
    faPlus,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../components/LoadingComponent";
import Paginator from "../../components/Paginator";
import { setAdminMenuDisplay, setCreateMode } from "../menu/menuSlice";
import {
    changeFlightsLoadedState,
    fetchFlightsAsync,
    flightsSelectors,
    setFlightPageNumber,
} from "./flightsSlice";
import TableFlightRow from "./TableFlightRow";

const TableFlights = () => {
    const dispatch = useAppDispatch();
    const { flightsLoaded, metaDataFlights } = useAppSelector(
        (state) => state.flights
    );
    const flights = useAppSelector(flightsSelectors.selectAll);

    useEffect(() => {
        if (!flightsLoaded) dispatch(fetchFlightsAsync());
    }, [flightsLoaded]);

    if (!flightsLoaded)
        return (
            <AdminPanelContent>
                <LoadingComponent message='Loading Flights' />
            </AdminPanelContent>
        );

    return (
        <section className='section'>
            <div className='container'>
                <div className='box is-shadowless is-flex is-justify-content-space-between'>
                    <button
                        onClick={() => {
                            dispatch(setAdminMenuDisplay("flightsform"));
                            dispatch(setCreateMode(true));
                        }}
                        className='button is-normal is-primary is-outlined'
                        type='button'>
                        <span className='icon'>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        <span>New</span>
                    </button>

                    <button
                        onClick={() => {
                            dispatch(changeFlightsLoadedState(false));
                        }}
                        className='button is-normal is-link is-outlined'
                        type='button'>
                        <span className='icon'>
                            <FontAwesomeIcon icon={faArrowsRotate} />
                        </span>
                        <span>Refresh</span>
                    </button>
                </div>
                <div className='table-container'>
                    <div className='table-wrapper has-mobile-cards'>
                        <table className='table is-fullwidth is-striped is-hoverable is-fullwidth'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Logo
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        COMPANY
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        APT/F
                                    </th>

                                    <th className='is-uppercase is-size-7-touch'>
                                        APT/T
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        DPT. D/T
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.length > 0 &&
                                    flights.map((flight) => (
                                        <TableFlightRow
                                            key={flight.id}
                                            flight={flight}
                                        />
                                    ))}
                            </tbody>
                        </table>
                        {flights.length > 0 && (
                            <Paginator
                                metaData={metaDataFlights!}
                                onPageChange={(page: number) =>
                                    dispatch(
                                        setFlightPageNumber({
                                            pageNumber: page,
                                        })
                                    )
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TableFlights;
