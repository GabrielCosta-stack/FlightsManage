import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flight } from "../../app/models/flights";
import { useAppDispatch } from "../../app/store/configureStore";
import { setAdminMenuDisplay, setEditMode } from "../menu/menuSlice";
import { useDialogContext } from "../../components/ConfirmDialogContext";
import {
    changeFlightsLoadedState,
    fetchFlightByIdAsync,
    setIdToEditMode,
} from "./flightsSlice";
import { Fragment } from "react";
import agent from "../../api/agent";

interface Props {
    flight: Flight;
}

const TableFlightRow = ({ flight }: Props) => {
    const dispatch = useAppDispatch();
    const { openDialogHandler, closeDialogHandler } = useDialogContext();
    const handleEdit = () => {
        dispatch(setEditMode(true));
        dispatch(fetchFlightByIdAsync(flight.id!))
            .unwrap()
            .then(() => {
                dispatch(setAdminMenuDisplay("flightsform"));
                dispatch(setIdToEditMode(flight.id));
            })
            .catch((error: any) => {
                openDialogHandler({
                    title: "Edit",
                    message: `Flight does not exist in database, refresh the page`,
                });
            });
    };

    const handleToggleFlightDetails = (flightId: number) => {
        const detailsTab = document.getElementById(
            `details-flight-${flightId}`
        );
        detailsTab?.classList.toggle("is-hidden");
    };

    const handleToggleAirportFromDetails = (cityAirporFromId: number) => {
        const detailsTab = document.getElementById(
            `details-airportfrom-${cityAirporFromId}`
        );
        detailsTab?.classList.toggle("is-hidden");
    };

    const handleToggleAirportToDetails = (cityAirporToId: number) => {
        const detailsTab = document.getElementById(
            `details-airportto-${cityAirporToId}`
        );
        console.log(cityAirporToId);
        detailsTab?.classList.toggle("is-hidden");
    };

    const handleDelete = (id: number) => {
        agent.Flight.delete(id)
            .then(() => {
                dispatch(changeFlightsLoadedState(false));
            })
            .catch((error) => console.log(error));
    };

    return (
        <Fragment>
            <tr>
                <td
                    onClick={() => handleToggleFlightDetails(flight?.id!)}
                    className='is-chevron-cell'>
                    <a role='button'>
                        <span className='icon is-expanded'>
                            <i className='mdi mdi-chevron-right mdi-24px'></i>
                        </span>
                    </a>
                </td>
                <td className='is-image-cell'>
                    <div>
                        <img
                            src={
                                flight.aircraft.flightCompany.imageId
                                    ? flight.aircraft.flightCompany.imageId
                                    : "./logo-default.svg"
                            }
                            width='35'
                            className='is-rounded'
                        />
                    </div>
                </td>
                <td>{flight.aircraft?.flightCompany?.companyName}</td>
                <td>{flight?.cityAirporFrom?.airportName}</td>

                <td>{flight?.cityAirporTo?.airportName}</td>
                <td>
                    <p>{flight?.departureDate}</p>
                    <small className='has-text-grey'>
                        {flight?.departureTime}
                    </small>
                </td>
                <td className='is-actions-cell'>
                    <div className='buttons is-right'>
                        <button
                            onClick={handleEdit}
                            className='button is-small is-primary is-outlined '
                            type='button'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </span>
                        </button>
                        <button
                            onClick={() => {
                                handleDelete(flight.id!);
                            }}
                            className='button is-small is-danger is-outlined'
                            data-target='sample-modal'
                            type='button'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </span>
                        </button>
                    </div>
                </td>
            </tr>
            <tr
                id={`details-flight-${flight?.id}`}
                className='detail is-hidden'>
                <td colSpan={8}>
                    <div className='detail-container'>
                        <div className='content'>
                            <table className='table is-fullwidth is-hoverable is-fullwidth'>
                                <tbody>
                                    <tr>
                                        <td
                                            onClick={() =>
                                                handleToggleAirportFromDetails(
                                                    flight?.id!
                                                )
                                            }
                                            className='is-chevron-cell'>
                                            <a role='button'>
                                                <span className='icon is-expanded'>
                                                    <i className='mdi mdi-chevron-right mdi-24px'></i>
                                                </span>
                                            </a>
                                        </td>
                                        <td>Airport From</td>
                                    </tr>
                                    <tr
                                        id={`details-airportfrom-${flight?.id}`}
                                        className='detail is-hidden'>
                                        <td colSpan={8}>
                                            <div className='detail-container'>
                                                <div className='content'>
                                                    <table className='table is-fullwidth is-hoverable is-fullwidth'>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    Iata Code
                                                                </th>
                                                                <th></th>
                                                                <th>Country</th>
                                                                <th>
                                                                    Country Code
                                                                </th>
                                                                <th>Region</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    {
                                                                        flight
                                                                            .cityAirporFrom
                                                                            .iataCode
                                                                    }
                                                                </td>
                                                                <td className='is-image-cell'>
                                                                    <div>
                                                                        <img
                                                                            src={
                                                                                flight
                                                                                    .cityAirporFrom
                                                                                    .country
                                                                                    .imageFlagFullPath
                                                                            }
                                                                            width='35'
                                                                            className='is-rounded'
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        flight
                                                                            .cityAirporFrom
                                                                            .country
                                                                            .name
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        flight
                                                                            .cityAirporFrom
                                                                            .country
                                                                            .code
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        flight
                                                                            .cityAirporFrom
                                                                            .country
                                                                            .region
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            onClick={() =>
                                                handleToggleAirportToDetails(
                                                    flight?.id!
                                                )
                                            }
                                            className='is-chevron-cell'>
                                            <a role='button'>
                                                <span className='icon is-expanded'>
                                                    <i className='mdi mdi-chevron-right mdi-24px'></i>
                                                </span>
                                            </a>
                                        </td>
                                        <td>Airport To</td>
                                    </tr>
                                    <tr
                                        id={`details-airportto-${flight?.id}`}
                                        className='detail is-hidden'>
                                        <td colSpan={8}>
                                            <div className='detail-container'>
                                                <div className='content'>
                                                    <table className='table is-fullwidth is-hoverable is-fullwidth'>
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    Iata Code
                                                                </th>
                                                                <th></th>
                                                                <th>Country</th>
                                                                <th>
                                                                    Country Code
                                                                </th>
                                                                <th>Region</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    {
                                                                        flight
                                                                            .cityAirporTo
                                                                            .iataCode
                                                                    }
                                                                </td>
                                                                <td className='is-image-cell'>
                                                                    <div>
                                                                        <img
                                                                            src={
                                                                                flight
                                                                                    .cityAirporTo
                                                                                    .country
                                                                                    .imageFlagFullPath
                                                                            }
                                                                            width='35'
                                                                            className='is-rounded'
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        flight
                                                                            .cityAirporTo
                                                                            .country
                                                                            .name
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        flight
                                                                            .cityAirporTo
                                                                            .country
                                                                            .code
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        flight
                                                                            .cityAirporTo
                                                                            .country
                                                                            .region
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </td>
            </tr>
        </Fragment>
    );
};

export default TableFlightRow;
