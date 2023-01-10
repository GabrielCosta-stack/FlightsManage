import {
    faCircle,
    faPenToSquare,
    faPlaneCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Aircraft } from "../../app/models/aircraft";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

interface Props {
    aircraft: Aircraft;
    handleAicraftToFlight: (aircraft: Aircraft) => void;
}

const TableFlightAircraftRow = ({ aircraft, handleAicraftToFlight }: Props) => {
    const dispatch = useAppDispatch();

    const handleToggleAircraftDetails = (aircraftId: number) => {
        const detailsTab = document.getElementById(
            `details-aircraft-${aircraftId}`
        );
        detailsTab?.classList.toggle("is-hidden");
    };

    return (
        <Fragment>
            <tr>
                <td
                    onClick={() => handleToggleAircraftDetails(aircraft.id)}
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
                                aircraft.flightCompany?.imageId
                                    ? aircraft.flightCompany?.imageId
                                    : "./logo-default.svg"
                            }
                            width='35'
                            className='is-rounded'
                        />
                    </div>
                </td>

                <td>{aircraft.id}</td>
                <td data-label={aircraft.flightCompany}>
                    {aircraft.icaoTypeDesignator?.model}
                </td>
                <td data-label={aircraft.flightCompany?.companyName}>
                    {aircraft.flightCompany?.companyName}
                </td>
                <td data-label={aircraft.flightCompany?.country}>
                    {aircraft.flightCompany?.country}
                </td>
                <td data-label={aircraft.flightCompany?.region}>
                    {aircraft.flightCompany?.region}
                </td>

                <td data-label='Created'>
                    <small className='has-text-grey is-abbr-like'>
                        {aircraft.createdDate}
                    </small>
                </td>
                <td className='is-actions-cell'>
                    <div className='buttons is-right'>
                        <button
                            onClick={() => {
                                handleAicraftToFlight(aircraft);
                            }}
                            className='button is-small is-primary is-outlined '
                            type='button'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faPlaneCircleCheck} />
                            </span>
                        </button>
                    </div>
                </td>
            </tr>
            <tr
                id={`details-aircraft-${aircraft.id}`}
                className='detail is-hidden'>
                <td colSpan={8}>
                    <div className='detail-container'>
                        <article className='media'>
                            <div className='media-content'>
                                <div className='content'>
                                    <table className='table is-fullwidth is-hoverable is-fullwidth'>
                                        <thead>
                                            <tr>
                                                <td></td>
                                                <th>Cabin Class</th>
                                                <th>Seats Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {aircraft.cabins!.length > 0 &&
                                                aircraft.cabins?.map(
                                                    (cabin) => (
                                                        <Fragment
                                                            key={cabin.id}>
                                                            <tr>
                                                                <td></td>
                                                                <td data-label='Name'>
                                                                    {
                                                                        cabin.class
                                                                    }
                                                                </td>
                                                                <td data-label='Company'>
                                                                    {
                                                                        cabin
                                                                            .seats
                                                                            .length
                                                                    }
                                                                </td>
                                                            </tr>
                                                        </Fragment>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </article>
                    </div>
                </td>
            </tr>
        </Fragment>
    );
};

export default TableFlightAircraftRow;
