import { faGlobe, faCity, faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import AppNotification from "../../app/notifications/AppNotification";
import {
    fetchFlightAircraftsAsync,
    fetchFlightAirportsAsync,
    createFlightAsync,
    setAirportsLoadedState,
    fetchFlightByIdAsync,
    setFlightAircraftsPageNumber,
    updateFlightAsync,
} from "./flightsSlice";
import {
    removeCreateMode,
    removeEditMode,
    setAdminMenuDisplay,
} from "../menu/menuSlice";

import "./flights.scss";
import TableFlightAircraftRow from "./TableFlightAircraftRow";
import { Aircraft } from "../../app/models/aircraft";
import DateTimePicker from "react-datetime-picker";
import { TicketMetadata, FlightData, Flight } from "../../app/models/flights";
import {
    removeNotificationComponent,
    showNotification,
} from "../../app/notifications/appNotificationSlice";
import Paginator from "../../components/Paginator";

interface AirportState {
    airportName: string;
    city: string;
    countryCode: string;
    countryId?: number;
    createdDate?: string;
    iataCode: string;
    id?: number;
}

// interface TicketMetadata {
//     cabinClass: string;
//     adultPrice: number;
// }

// interface FlightData {
//     CityAirporFromId : number;
//     CityAirporToId : number;
//     AircraftId: number;
//     DepartureTime : string;
//     DepartureDate : string;
//     TicketsMetaData : TicketMetadata[];
// }

const FlightsForm = () => {
    const dispatch = useAppDispatch();
    const { isEditMode, isCreateMode } = useAppSelector(
        (state) => state.adminMenu
    );
    const {
        flightAirportsLoaded,
        flightAircraftsLoaded,
        flightCityAirports,
        flightAircrafts,
        metaDataAircrafts,
    } = useAppSelector((state) => state.flights);

    const MAX = 100;
    const [rangeValue, setRangeValue] = useState(0);
    const [airports, setAirports] = useState<any[]>([]);
    const [aircrafts, setAircrafts] = useState<any[]>([]);
    const [citiesFrom, setCitiesFrom] = useState<any[]>([]);
    const [airportFrom, setAirportFrom] = useState<AirportState | null>(null);
    const [citiesTo, setCitiesTo] = useState<any[]>([]);
    const [airportTo, setAirportTo] = useState<AirportState | null>(null);
    const [flightAircraft, setFlightAircraft] = useState<Aircraft | null>(null);
    const [ticketsMetadata, setTicketsMetadata] = useState<
        TicketMetadata[] | null
    >(null);

    const [calendarDateUi, setCalendarDateUi] = useState(new Date());
    const [departureDate, setDepartureDate] = useState("");
    const [departureTime, setDepartureTime] = useState("");

    useEffect(() => {
        if (!flightAirportsLoaded) {
            dispatch(fetchFlightAirportsAsync());
        }

        if (flightAirportsLoaded) {
            if (flightCityAirports.length > 0) {
                setAirports(flightCityAirports);
            }
        }
    }, [flightAirportsLoaded, flightAircraftsLoaded]);

    useEffect(() => {
        if (!flightAircraftsLoaded) {
            dispatch(fetchFlightAircraftsAsync());
        }

        if (flightAircraftsLoaded) {
            if (flightAircrafts.length > 0) {
                setAircrafts(flightAircrafts);
            }
        }
    }, [flightAircraftsLoaded]);

    useEffect(() => {}, [
        citiesTo,
        airportTo,
        citiesFrom,
        airportFrom,
        ticketsMetadata,
    ]);

    useEffect(() => {
        if (isEditMode) {
            const { id } = JSON.parse(
                localStorage.getItem("idToFetchAndEdit")!
            );

            dispatch(fetchFlightByIdAsync(id))
                .unwrap()
                .then((result: any) => {
                    console.log(result);
                    setAirportTo(result.cityAirporTo);
                    setAirportFrom(result.cityAirporFrom);

                    setTicketsMetadata(result.ticketsMetaData);

                    const aircraftToEditMode: Aircraft = {
                        id: result.aircraft.id,
                        flightCompanyId: result.aircraft.flightCompanyId,
                        flightCompany: result.aircraft.flightCompany,
                        icaoTypeDesignatorId:
                            result.aircraft.icaoTypeDesignatorId,
                        icaoTypeDesignator: result.aircraft.icaoTypeDesignator,
                        cabins: null,
                        attachedToFlight: result.aircraft.attachedToFlight,
                        createdDate: result.aircraft.createdDate,
                    };

                    setFlightAircraft(aircraftToEditMode);
                    setDepartureDate(result.departureDate);
                    setDepartureTime(result.departureTime);

                    const [day, month, year] = result.departureDate.split("/");
                    const [hours, minutes, seconds] =
                        result.departureTime.split(":");

                    const date = new Date(
                        +year,
                        +month - 1,
                        +day,
                        +hours,
                        +minutes,
                        +seconds
                    );

                    setCalendarDateUi(date);
                })
                .catch((error: any) => {});
        }
        return () => {
            if (isEditMode) dispatch(removeEditMode(false));
            if (isCreateMode) dispatch(removeCreateMode(false));
            if (localStorage.getItem("idToFetchAndEdit") !== null) {
                localStorage.removeItem("idToFetchAndEdit");
            }
        };
    }, []);

    const handleCityToOptions = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value.length > 0) {
            const countries = airports.filter(
                (a) => a.code === event.target.value
            );

            countries.forEach((country) => {
                if (country.cityAirports.length > 0) {
                    setCitiesTo(country.cityAirports);
                }
            });
        } else {
            if (airportTo) setAirportTo(null);

            setCitiesTo([]);
        }
    };

    const handleAirportToOptions = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value.length > 0) {
            var airportSelected = citiesTo.filter((airport) => {
                return airport.iataCode === event.target.value;
            });

            setAirportTo(airportSelected[0]);
        } else {
            setAirportTo(null);
        }
    };

    const handleCityFromOptions = (event: ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value.length > 0) {
            const countries = airports.filter(
                (a) => a.code === event.target.value
            );

            countries.forEach((country) => {
                if (country.cityAirports.length > 0) {
                    setCitiesFrom(country.cityAirports);
                }
            });
        } else {
            if (airportFrom) setAirportFrom(null);

            setCitiesFrom([]);
        }
    };

    const handleAirportFromOptions = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        if (event.target.value.length > 0) {
            var airportSelected = citiesFrom.filter((airport) => {
                return airport.iataCode === event.target.value;
            });

            setAirportFrom(airportSelected[0]);
        } else {
            setAirportFrom(null);
        }
    };

    const handleAicraftToFlight = (aircraft: Aircraft) => {
        if (aircraft) {
            setFlightAircraft(aircraft);
            console.log(flightAircraft);

            const newArray: TicketMetadata[] = [];

            aircraft.cabins?.forEach((cabin) => {
                newArray.push({
                    cabinClass: cabin.class,
                    adultPrice: 0,
                });
            });

            setTicketsMetadata(newArray);
        }
    };

    const getBackgroundSize = () => {
        return { backgroundSize: `${(rangeValue * 100) / MAX}% 100%` };
    };

    const handleRangeInputPrice = (
        e: React.FormEvent<HTMLInputElement>,
        _class: string
    ) => {
        const indexTicketMetadata = ticketsMetadata?.findIndex(
            (c) => c.cabinClass === _class
        );

        if (indexTicketMetadata === -1 || indexTicketMetadata === undefined)
            return;

        let newArray = [...ticketsMetadata!];

        newArray[indexTicketMetadata].adultPrice = Number(
            e.currentTarget.value
        );

        setRangeValue(Number(e.currentTarget.value));
    };

    const handleDateTimePicker = (flightDate: Date) => {
        setCalendarDateUi(flightDate);
        setDepartureDate(flightDate.toLocaleDateString());
        setDepartureTime(flightDate.toLocaleTimeString());
    };

    const handleCreateFlight = () => {
        if (!airportFrom) {
            dispatch(
                showNotification({
                    message: "Airport From is missing",
                    type: "is-danger",
                    open: true,
                })
            );

            return;
        }

        if (!airportTo) {
            dispatch(
                showNotification({
                    message: "Airport To is missing",
                    type: "is-danger",
                    open: true,
                })
            );

            return;
        }

        if (!flightAircraft) {
            dispatch(
                showNotification({
                    message: "Aircraft is missing",
                    type: "is-danger",
                    open: true,
                })
            );

            return;
        }

        if (!departureTime || !departureDate) {
            dispatch(
                showNotification({
                    message: "Departure Time and Date are missing",
                    type: "is-danger",
                    open: true,
                })
            );

            return;
        }

        if (isCreateMode) {
            const flightData: FlightData = {
                CityAirporFromId: airportFrom?.id!,
                CityAirporToId: airportTo?.id!,
                AircraftId: flightAircraft?.id!,
                DepartureTime: departureTime,
                DepartureDate: departureDate,
                TicketsMetaData: ticketsMetadata!,
            };
            dispatch(createFlightAsync(flightData))
                .unwrap()
                .then(() => {
                    dispatch(setAdminMenuDisplay("flights"));
                });
        }

        if (isEditMode) {
            const { id } = JSON.parse(
                localStorage.getItem("idToFetchAndEdit")!
            );
            const flightData: FlightData = {
                Id: isEditMode ? id : null,
                CityAirporFromId: airportFrom?.id!,
                CityAirporToId: airportTo?.id!,
                AircraftId: flightAircraft?.id!,
                DepartureTime: departureTime,
                DepartureDate: departureDate,
                TicketsMetaData: ticketsMetadata!,
            };
            console.log(flightData);
            dispatch(updateFlightAsync(flightData))
                .unwrap()
                .then(() => {
                    dispatch(setAdminMenuDisplay("flights"));
                });
        }
    };

    return (
        <AdminPanelContent>
            <div className='box is-shadowless is-size-6 is-uppercase has-text-weight-medium'>
                {isEditMode ? "Edit" : "Add"} {"Flight"}
            </div>

            <div className='mb-5 is-flex is-justify-content-right'>
                <button
                    onClick={() => {
                        dispatch(setAdminMenuDisplay("flights"));
                    }}
                    className='button is-link is-outlined is-small '
                    type='button'>
                    <span className='icon'>
                        <i className='mdi mdi-arrow-left'></i>
                    </span>
                    <span>Back</span>
                </button>
            </div>
            <AppNotification />
            <div className='box is-shadowless'>
                <div
                    className={`message ${
                        airportFrom || airportTo || flightAircraft
                            ? "is-primary"
                            : "is-danger"
                    }`}>
                    <div className='message-header'>
                        <p>
                            {airportFrom || airportTo || flightAircraft
                                ? "Airport Selected"
                                : "Select Your Airport"}
                        </p>
                    </div>

                    <div
                        className={`message-body is-dark ${
                            airportFrom || airportTo || flightAircraft
                                ? "is-block"
                                : "is-hidden"
                        }`}>
                        <div className='box'>
                            <DateTimePicker
                                onChange={handleDateTimePicker}
                                value={calendarDateUi}
                            />
                        </div>
                        <div
                            className={`table-container ${
                                airportFrom ? "is-block" : "is-hidden"
                            }`}>
                            <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                                <thead>
                                    <tr>
                                        <th>Airport From</th>
                                        <th>City</th>
                                        <th>Iata Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{airportFrom?.airportName}</td>
                                        <td>{airportFrom?.city}</td>
                                        <td>{airportFrom?.iataCode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div
                            className={`table-container ${
                                airportTo ? "is-block" : "is-hidden"
                            }`}>
                            <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                                <thead>
                                    <tr>
                                        <th>Airport To</th>
                                        <th>City</th>
                                        <th>Iata Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{airportTo?.airportName}</td>
                                        <td>{airportTo?.city}</td>
                                        <td>{airportTo?.iataCode}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div
                            className={`table-container ${
                                flightAircraft ? "is-block" : "is-hidden"
                            }`}>
                            <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                                <thead>
                                    <tr>
                                        <th>Aircraft Id</th>
                                        <th>Company</th>
                                        <th>Model</th>
                                        <th>Icao Code</th>
                                        <th>Iata Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{flightAircraft?.id}</td>
                                        <td>
                                            {
                                                flightAircraft?.flightCompany
                                                    ?.companyName
                                            }
                                        </td>
                                        <td>
                                            {
                                                flightAircraft
                                                    ?.icaoTypeDesignator?.model
                                            }
                                        </td>
                                        <td>
                                            {
                                                flightAircraft
                                                    ?.icaoTypeDesignator
                                                    ?.icaoCode
                                            }
                                        </td>
                                        <td>
                                            {
                                                flightAircraft
                                                    ?.icaoTypeDesignator
                                                    ?.iataTypeCode
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div
                            className={`table-container ${
                                ticketsMetadata ? "is-block" : "is-hidden"
                            }`}>
                            <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                                <thead>
                                    <tr>
                                        <th>Cabin Class</th>
                                        <th>
                                            Price{" "}
                                            <span className='icon'>
                                                <i className='mdi mdi-currency-eur'></i>
                                            </span>
                                        </th>
                                        <th>Set Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ticketsMetadata?.length! > 0 &&
                                        ticketsMetadata?.map((cabin) => (
                                            <tr key={cabin.cabinClass}>
                                                <td>{cabin.cabinClass}</td>
                                                <td>{cabin.adultPrice}</td>
                                                <td>
                                                    <input
                                                        type='range'
                                                        min='0'
                                                        max={100}
                                                        onChange={(e) => {
                                                            handleRangeInputPrice(
                                                                e,
                                                                cabin.cabinClass
                                                            );
                                                        }}
                                                        style={getBackgroundSize()}
                                                        value={cabin.adultPrice}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='field is-grouped is-justify-content-right'>
                            <div className='control'>
                                <button className='button is-link is-light '>
                                    Cancel
                                </button>
                            </div>
                            <div className='control'>
                                <button
                                    onClick={handleCreateFlight}
                                    className='button is-link '>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='columns'>
                <div className='column'>
                    <div className='control has-icons-left'>
                        <div className='select is-fullwidth'>
                            <select onChange={handleCityFromOptions}>
                                <option value=''>-- Country From--</option>
                                {airports.length > 0 ? (
                                    airports.map((country) => (
                                        <option
                                            key={country.id}
                                            value={country.code}>
                                            {country.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value=''>
                                        -- Nothing Found --
                                    </option>
                                )}
                            </select>
                        </div>
                        <span className='icon is-left'>
                            <FontAwesomeIcon icon={faGlobe} />
                        </span>
                    </div>
                </div>
                <div className='column'>
                    <div className='control has-icons-left'>
                        <div className='select is-fullwidth'>
                            <select onChange={handleAirportFromOptions}>
                                <option value=''>-- City From --</option>
                                {citiesFrom.length > 0 ? (
                                    citiesFrom.map((city) => (
                                        <option
                                            key={city.id}
                                            value={city.iataCode}>
                                            {city.city} ({city.iataCode})
                                        </option>
                                    ))
                                ) : (
                                    <option value=''>
                                        -- Nothing Found --
                                    </option>
                                )}
                            </select>
                        </div>
                        <span className='icon is-left'>
                            <FontAwesomeIcon icon={faCity} />
                        </span>
                    </div>
                </div>
            </div>

            <div className='columns'>
                <div className='column'>
                    <div className='control has-icons-left'>
                        <div className='select is-fullwidth'>
                            <select onChange={handleCityToOptions}>
                                <option value=''>-- Country To--</option>
                                {airports.length > 0 ? (
                                    airports.map((country) => (
                                        <option
                                            key={country.id}
                                            value={country.code}>
                                            {country.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value=''>
                                        -- Nothing Found --
                                    </option>
                                )}
                            </select>
                        </div>
                        <span className='icon is-left'>
                            <FontAwesomeIcon icon={faGlobe} />
                        </span>
                    </div>
                </div>
                <div className='column'>
                    <div className='control has-icons-left'>
                        <div className='select is-fullwidth'>
                            <select onChange={handleAirportToOptions}>
                                <option value=''>-- City To --</option>
                                {citiesTo.length > 0 ? (
                                    citiesTo.map((city) => (
                                        <option
                                            key={city.id}
                                            value={city.iataCode}>
                                            {city.city} ({city.iataCode})
                                        </option>
                                    ))
                                ) : (
                                    <option value=''>
                                        -- Nothing Found --
                                    </option>
                                )}
                            </select>
                        </div>
                        <span className='icon is-left'>
                            <FontAwesomeIcon icon={faCity} />
                        </span>
                    </div>
                </div>
            </div>
            <div className='container'>
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
                                        Id
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Model
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Company Name
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Country
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Region
                                    </th>

                                    <th className='is-uppercase is-size-7-touch'>
                                        Created
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {aircrafts.length > 0 ? (
                                    aircrafts.map((aircraft) => (
                                        <TableFlightAircraftRow
                                            key={aircraft.id}
                                            aircraft={aircraft}
                                            handleAicraftToFlight={
                                                handleAicraftToFlight
                                            }
                                        />
                                    ))
                                ) : (
                                    <tr className='is-empty'>
                                        <td colSpan={7}>
                                            <section className='section'>
                                                <div className='content has-text-grey has-text-centered'>
                                                    <p>
                                                        <span className='icon is-large'>
                                                            <i className='mdi mdi-emoticon-sad mdi-48px'></i>
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Nothing's there&hellip;
                                                    </p>
                                                </div>
                                            </section>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {aircrafts.length > 0 && (
                            <Paginator
                                metaData={metaDataAircrafts!}
                                onPageChange={(page: number) =>
                                    dispatch(
                                        setFlightAircraftsPageNumber({
                                            pageNumber: page,
                                        })
                                    )
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </AdminPanelContent>
    );
};

export default FlightsForm;
