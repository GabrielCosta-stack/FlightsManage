import { Fragment } from "react";
import { Airport } from "../../app/models/Airport";

interface Props {
    airport: Airport;
}

const TableAirportsRow = ({ airport }: Props) => {
    const handleToggleAirportDetails = (countryCode: string) => {
        const detailsTab = document.getElementById(
            `details-airport-${countryCode}`
        );
        detailsTab?.classList.toggle("is-hidden");
    };

    return (
        <Fragment>
            <tr>
                <td
                    onClick={() => handleToggleAirportDetails(airport.code)}
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
                            src={airport.imageFlagFullPath}
                            width='35'
                            className='is-rounded'
                        />
                    </div>
                </td>
                <td>{airport.name}</td>
                <td>{airport.code}</td>
                <td>{airport.region}</td>
                <td>{airport.createdDate}</td>
            </tr>

            <tr
                className='detail is-hidden'
                id={`details-airport-${airport.code}`}>
                <td colSpan={8}>
                    <div>
                        <table className='table is-fullwidth is-striped is-hoverable is-fullwidth'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Airport Name</th>
                                    <th>City</th>
                                    <th>Iata Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {airport.cityAirports.length > 0 ? (
                                    airport.cityAirports.map((airport) => (
                                        <tr key={airport.id}>
                                            <td></td>
                                            <td>{airport.airportName}</td>
                                            <td>{airport.city}</td>
                                            <td>{airport.iataCode}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <th>Nothing To Show...</th>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </td>
            </tr>
        </Fragment>
    );
};

export default TableAirportsRow;
