import {
    faCircle,
    faPenToSquare,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Aircraft } from "../../app/models/aircraft";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setAdminMenuDisplay, setEditMode } from "../menu/menuSlice";
import {
    fetchAircraftByIdAsync,
    setAircraftEdit,
} from "../aircrafts/aircraftSlice";

interface Props {
    aircraft: Aircraft;
}

const TableAircraftRow = ({ aircraft }: Props) => {
    const dispatch = useAppDispatch();

    const handleToggleAircraftDetails = (aircraftId: number) => {
        const detailsTab = document.getElementById(
            `details-aircraft-${aircraftId}`
        );
        detailsTab?.classList.toggle("is-hidden");
    };

    const handleToggleCabinDetails = (cabinId: number) => {
        const detailsTab = document.getElementById(`details-cabins-${cabinId}`);
        detailsTab?.classList.toggle("is-hidden");
    };

    const handleEdit = () => {
        dispatch(setEditMode(true));
        dispatch(fetchAircraftByIdAsync(aircraft.id))
            .unwrap()
            .then(() => {
                dispatch(setAdminMenuDisplay("aircraftsform"));
                dispatch(
                    setAircraftEdit({
                        flightCompanyId: aircraft.flightCompanyId,
                        icaoTypeDesignatorId: aircraft.icaoTypeDesignatorId,
                        cabins: aircraft.cabins,
                        icaoTypeDesignator: aircraft.icaoTypeDesignator?.model,
                    })
                );
            })
            .catch(() => {});
        // dispatch(fetchFlightCompanyByIdAsync(id))
        //     .unwrap()
        //     .then(() => {
        //         dispatch(setAdminMenuDisplay("flightcompanyform"));
        //         dispatch(
        //             setDataToEditOnLocalstorage({
        //                 id: id,
        //                 companyName: companyName,
        //                 country: country,
        //                 region: region,
        //                 imageId: imageId,
        //                 createdDate: createdDate,
        //                 icaoCode: icaoCode,
        //                 iataDesignator: iataDesignator,
        //             })
        //         );
        //     })
        //     .catch((error: any) => {
        //         openDialogHandler({
        //             title: "Edit",
        //             message: `Flight company ${companyName} does not exist in database, refresh the page`,
        //         });
        //     });
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

                <td data-label={aircraft.icaoTypeDesignator?.model}>
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
                            onClick={handleEdit}
                            className='button is-small is-primary is-outlined '
                            type='button'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </span>
                        </button>
                        <button
                            onClick={() => {}}
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
                                                                <td
                                                                    onClick={() =>
                                                                        handleToggleCabinDetails(
                                                                            cabin.id
                                                                        )
                                                                    }
                                                                    className='is-chevron-cell'>
                                                                    <a role='button'>
                                                                        <span className='icon is-expanded'>
                                                                            <i className='mdi mdi-chevron-right mdi-24px'></i>
                                                                        </span>
                                                                    </a>
                                                                </td>
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
                                                            <tr
                                                                id={`details-cabins-${cabin.id}`}
                                                                className='detail is-hidden'>
                                                                <td colSpan={8}>
                                                                    <div className='detail-container'>
                                                                        <article className='media'>
                                                                            <div className='media-content'>
                                                                                <div className='content'>
                                                                                    <table className='table is-fullwidth is-hoverable is-fullwidth'>
                                                                                        <thead>
                                                                                            <tr>
                                                                                                <th></th>
                                                                                                <th>
                                                                                                    Line
                                                                                                </th>
                                                                                                <th>
                                                                                                    Column
                                                                                                </th>
                                                                                                <th>
                                                                                                    Seat
                                                                                                    Number
                                                                                                </th>
                                                                                                <th>
                                                                                                    Reserved
                                                                                                </th>
                                                                                            </tr>
                                                                                        </thead>
                                                                                        <tbody>
                                                                                            {cabin
                                                                                                .seats
                                                                                                .length >
                                                                                                0 &&
                                                                                                cabin.seats.map(
                                                                                                    (
                                                                                                        seat: any
                                                                                                    ) => (
                                                                                                        <tr
                                                                                                            key={
                                                                                                                seat.id
                                                                                                            }>
                                                                                                            <td></td>
                                                                                                            <td
                                                                                                                data-label={
                                                                                                                    seat.line
                                                                                                                }>
                                                                                                                {
                                                                                                                    seat.line
                                                                                                                }
                                                                                                            </td>
                                                                                                            <td
                                                                                                                data-label={
                                                                                                                    seat.column
                                                                                                                }>
                                                                                                                {
                                                                                                                    seat.column
                                                                                                                }
                                                                                                            </td>

                                                                                                            <td>
                                                                                                                {
                                                                                                                    seat.line
                                                                                                                }{" "}
                                                                                                                {
                                                                                                                    seat.column
                                                                                                                }{" "}
                                                                                                            </td>
                                                                                                            <td
                                                                                                                data-label={
                                                                                                                    seat.reserverd
                                                                                                                }>
                                                                                                                <span className='icon'>
                                                                                                                    <FontAwesomeIcon
                                                                                                                        className={`${
                                                                                                                            seat.reserverd ==
                                                                                                                            0
                                                                                                                                ? "has-text-danger"
                                                                                                                                : ""
                                                                                                                        } `}
                                                                                                                        icon={
                                                                                                                            faCircle
                                                                                                                        }
                                                                                                                    />
                                                                                                                </span>
                                                                                                            </td>
                                                                                                        </tr>
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

export default TableAircraftRow;
