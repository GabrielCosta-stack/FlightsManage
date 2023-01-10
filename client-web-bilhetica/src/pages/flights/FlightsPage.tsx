import {
    faLocationDot,
    faCalendarDays,
    faPlaneDeparture,
    faPlaneArrival,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";

import "./flights-page.scss";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

import {
    fetchAirportsBySearchTermAsync,
    setAirportSearchTerm,
    clearAirportsSearch,
    clearSearchTerm,
} from "../../features/airports/AirportSlice";
import { flightDefinition, formatFlightDate } from "../../utils/utils";

const FlightsPage = () => {
    const monthsArray = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const calendarRef = useRef<HTMLDivElement>(null);
    const airportFromSearchRef = useRef<HTMLDivElement>(null);
    const airportToSearchRef = useRef<HTMLDivElement>(null);
    const airportFromInputSearchRef = useRef<HTMLDivElement>(null);
    const airportToInputSearchRef = useRef<HTMLDivElement>(null);

    const {
        airportSearchTerm,
        airportBySearchLoaded,
        flightCityAirportsSearch,
    } = useAppSelector((state) => state.airports);
    const dispatch = useAppDispatch();
    const [btnRoundtripBackground, setBtnRoundtripBackground] =
        useState<boolean>(true);
    const [btnOneWayBackground, setBtnOneWayBackground] =
        useState<boolean>(false);
    const [returnDate, setReturnDate] = useState(new Date());
    const [departingDate, setDepartingDate] = useState(new Date());
    const [dateValue, setDateValue] = useState(new Date());
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [dateType, setDateType] = useState<string | null>(null);
    const [cabinClass, setCabinClass] = useState<string | null>(null);
    const [airportInputType, setAirportInputType] = useState<string | null>(
        null
    );
    const [depatureMonthUI, setDepatureMonthUI] = useState("");
    const [returningMonthUI, setReturningMonthUI] = useState("");
    const [departingInputValue, setDepartingInputValue] = useState("");
    const [returningInputValue, setReturningInputValue] = useState("");
    const [isDepartingInputOpen, setIsDepartingInputOpen] =
        useState<boolean>(false);
    const [isReturningInputOpen, setIsReturningInputOpen] =
        useState<boolean>(false);

    const [fromInputValid, setFromInputValid] = useState<boolean>(true);
    const [toInputValid, setToInputValid] = useState<boolean>(true);

    useEffect(() => {
        if (!airportBySearchLoaded) {
            dispatch(fetchAirportsBySearchTermAsync());
        }
    }, [airportBySearchLoaded]);

    useEffect(() => {
        if (cabinClass == null) {
            setCabinClass("Economic");
        }
        const initialDate = new Date();
        setDepatureMonthUI(
            `${monthsArray[initialDate.getMonth()]} ${initialDate.getDate()}`
        );
        setDepartingDate(initialDate);

        setReturningMonthUI(
            `${monthsArray[dateValue.getMonth()]} ${dateValue.getDate() + 1}`
        );

        const initialDateDayIncrease = new Date();
        initialDateDayIncrease.setDate(initialDateDayIncrease.getDate() + 1);

        setReturnDate(initialDateDayIncrease);

        document.addEventListener("click", handleClickOutsideCalendar, true);
        document.addEventListener("click", handleClickOutsideAiportsFromSearch);
        document.addEventListener("click", handleClickOutsideAiportsToSearch);
    }, []);

    useEffect(() => {
        if (dateType?.trim() === "departureDate") {
            setDepatureMonthUI(
                `${monthsArray[dateValue.getMonth()]} ${dateValue.getDate()}`
            );

            setDepartingDate(dateValue);
        }

        if (dateType?.trim() === "returningDate") {
            setReturningMonthUI(
                `${monthsArray[dateValue.getMonth()]} ${dateValue.getDate()}`
            );

            setReturnDate(dateValue);
        }
    }, [dateValue]);

    const handleClickOutsideCalendar = ({ target }: MouseEvent): void => {
        if (!calendarRef.current?.contains(target as Node)) {
            setCalendarOpen(false);
        }
    };

    const handleClickOutsideAiportsFromSearch = ({
        target,
    }: MouseEvent): void => {
        if (
            !airportFromSearchRef.current?.contains(target as Node) &&
            !airportFromInputSearchRef.current?.contains(target as Node)
        ) {
            setIsDepartingInputOpen(false);
            dispatch(clearAirportsSearch());
            dispatch(clearSearchTerm());
        }
    };

    const handleClickOutsideAiportsToSearch = ({
        target,
    }: MouseEvent): void => {
        if (
            !airportToSearchRef.current?.contains(target as Node) &&
            !airportToInputSearchRef.current?.contains(target as Node)
        ) {
            setIsReturningInputOpen(false);
            dispatch(clearAirportsSearch());
            dispatch(clearSearchTerm());
        }
    };

    const handleBtnRoundtripBackground = () => {
        if (btnOneWayBackground) {
            setBtnOneWayBackground(false);
        }
        setBtnRoundtripBackground(true);
    };

    const handleBtnOneWayBackground = () => {
        if (btnRoundtripBackground) {
            setBtnRoundtripBackground(false);
        }
        setBtnOneWayBackground(true);
    };

    const handleOpenCalendar = () => {
        setCalendarOpen(!calendarOpen);
    };

    const handleOnClickDay = () => {
        setCalendarOpen(!calendarOpen);
        if (dateType?.trim() === "departureDate") {
            setDepartingDate(dateValue);
            setDepatureMonthUI(
                `${monthsArray[dateValue.getMonth()]} ${dateValue.getDate()}`
            );
            setDateValue(departingDate);
        }

        if (dateType?.trim() === "returningDate") {
            setReturningMonthUI(
                `${monthsArray[dateValue.getMonth()]} ${dateValue.getDate()}`
            );
            setReturnDate(dateValue);
            setDateValue(returnDate);
        }
    };

    const handleSetCityAirportFromInputValue = (airportCityAirport: string) => {
        if (airportInputType === "departingInput") {
            setDepartingInputValue(airportCityAirport);
            dispatch(clearAirportsSearch());
            setAirportInputType(null);
            setFromInputValid(true);
        }
    };

    const handleSetCityAirportToInputValue = (airportCityAirport: string) => {
        if (airportInputType === "returningInput") {
            setReturningInputValue(airportCityAirport);
            dispatch(clearAirportsSearch());
            setToInputValid(true);
        }
    };

    const handleAirportInputClear = () => {
        console.log(airportInputType);
        if (airportInputType === "departingInput") {
            setDepartingInputValue("");
        }

        if (airportInputType === "returningInput") {
            setReturningInputValue("");
        }
    };

    const handleSearchFlights = () => {
        if (departingInputValue.length === 0) {
            setFromInputValid(false);
        }

        if (returningInputValue.length === 0) {
            setToInputValid(false);
        }
    };

    return (
        <div className='container has-background-success p-6 mt-6'>
            <div className='columns is-justify-content-center'>
                <div className='column is-11 mt-6'>
                    <div className='box border-1 is-shadowless'>
                        <div className='columns is-justify-content-space-between'>
                            <div className='column is-two-fifths'>
                                <div className='buttons'>
                                    <button
                                        onClick={handleBtnRoundtripBackground}
                                        className={`button border-is-none ${
                                            btnRoundtripBackground
                                                ? "is-primary is-light"
                                                : "is-white"
                                        }`}>
                                        Roundtrip
                                    </button>
                                    <button
                                        onClick={handleBtnOneWayBackground}
                                        className={`button border-is-none ${
                                            btnOneWayBackground
                                                ? "is-primary is-light"
                                                : "is-white"
                                        }`}>
                                        One-way
                                    </button>
                                </div>
                            </div>
                            <div className='column is-4 is-flex is-justify-content-right'>
                                <div className='select is-primary'>
                                    <select
                                        onChange={(cabinClass) =>
                                            setCabinClass(
                                                cabinClass.target.value
                                            )
                                        }>
                                        <option>Economic</option>
                                        <option>Executive</option>
                                        <option>Premium</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div
                            ref={calendarRef}
                            className={`columns is-justify-content-right ${
                                calendarOpen ? "" : "is-hidden"
                            }`}>
                            {dateType === "departureDate" ? (
                                <div className='column is-half position-is-relative'>
                                    <Calendar
                                        locale='En'
                                        className='position-is-absolute'
                                        onChange={setDateValue}
                                        value={departingDate}
                                        onClickDay={handleOnClickDay}
                                    />
                                </div>
                            ) : (
                                <div className='column is-half position-is-relative'>
                                    <Calendar
                                        locale='En'
                                        className='position-is-absolute'
                                        onChange={setDateValue}
                                        value={returnDate}
                                        onClickDay={handleOnClickDay}
                                    />
                                </div>
                            )}
                        </div>
                        <div className='columns'>
                            <div className='column  is-4 position-is-relative'>
                                <div
                                    ref={airportFromSearchRef}
                                    className={`field   border-radius-1 p-1 ${
                                        !fromInputValid
                                            ? "border-fail"
                                            : "border-1"
                                    }`}>
                                    <p className='control has-icons-left has-icons-right'>
                                        <input
                                            readOnly
                                            value={departingInputValue || ""}
                                            className='input  is-medium input-border-none'
                                            type='text'
                                            placeholder='Leaving From'
                                            onClick={() => {
                                                setAirportInputType(
                                                    "departingInput"
                                                );
                                                setIsDepartingInputOpen(true);
                                            }}
                                        />
                                        <span className='icon is-small is-left'>
                                            <FontAwesomeIcon
                                                icon={faLocationDot}
                                            />
                                        </span>
                                    </p>
                                </div>
                                {!fromInputValid && (
                                    <p className='has-text-danger is-size-7'>
                                        field required
                                    </p>
                                )}
                                <div
                                    className={`border-1 border-radius-1 column position-is-absolute  is-fullwidth is-12 is-top-none has-background-white ${
                                        isDepartingInputOpen
                                            ? "is-block"
                                            : "is-hidden"
                                    }`}>
                                    <div ref={airportFromInputSearchRef}>
                                        <p className='is-flex '>
                                            <input
                                                readOnly={
                                                    departingInputValue.length ===
                                                    0
                                                        ? false
                                                        : true
                                                }
                                                value={
                                                    departingInputValue.length ===
                                                    0
                                                        ? airportSearchTerm.searchTerm ||
                                                          ""
                                                        : departingInputValue
                                                }
                                                onChange={(event) => {
                                                    dispatch(
                                                        setAirportSearchTerm({
                                                            searchTerm:
                                                                event.target
                                                                    .value,
                                                        })
                                                    );
                                                }}
                                                className='input  is-medium input-border-none'
                                                type='text'
                                                placeholder='Where are you Leaving From ?'
                                            />
                                            <button
                                                onClick={() =>
                                                    handleAirportInputClear()
                                                }
                                                className='button is-white'>
                                                <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                />
                                            </button>
                                        </p>
                                    </div>
                                    <div
                                        className={`${
                                            flightCityAirportsSearch.length > 0
                                                ? "is-block"
                                                : "is-hidden"
                                        }`}>
                                        <ul className='search-result box-shadow-1'>
                                            {flightCityAirportsSearch.map(
                                                (airport) => (
                                                    <li
                                                        onClick={() =>
                                                            handleSetCityAirportFromInputValue(
                                                                airport.iataCode
                                                            )
                                                        }
                                                        key={airport.id}
                                                        className='p-2'>
                                                        <div className='is-flex'>
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faPlaneDeparture
                                                                    }
                                                                />
                                                            </div>
                                                            <div className='ml-4 is-size-5 has-text-weight-bold'>
                                                                {
                                                                    airport.airportName
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <small className='ml-4'>
                                                                {
                                                                    airport.iataCode
                                                                }
                                                            </small>
                                                            {" - "}
                                                            {airport.city}
                                                        </div>
                                                        <div>
                                                            <small className='ml-4'>
                                                                {
                                                                    airport
                                                                        .country
                                                                        .name
                                                                }
                                                            </small>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className='column  is-4 position-is-relative '>
                                <div
                                    ref={airportToSearchRef}
                                    className={`field   border-radius-1 p-1 ${
                                        !toInputValid
                                            ? "border-fail"
                                            : "border-1"
                                    }`}>
                                    <p className='control has-icons-left has-icons-right'>
                                        <input
                                            readOnly
                                            value={returningInputValue || ""}
                                            className='input  is-medium input-border-none'
                                            type='text'
                                            placeholder='Going To'
                                            onClick={() => {
                                                setAirportInputType(
                                                    "returningInput"
                                                );
                                                setIsReturningInputOpen(true);
                                            }}
                                        />
                                        <span className='icon is-small is-left'>
                                            <FontAwesomeIcon
                                                icon={faLocationDot}
                                            />
                                        </span>
                                    </p>
                                </div>
                                {!toInputValid && (
                                    <p className='has-text-danger is-size-7'>
                                        field required
                                    </p>
                                )}
                                <div
                                    className={` border-1 border-radius-1 column position-is-absolute  is-fullwidth is-12 is-top-none has-background-white ${
                                        isReturningInputOpen
                                            ? "is-block"
                                            : "is-hidden"
                                    }`}>
                                    <div ref={airportToInputSearchRef}>
                                        <p className='is-flex'>
                                            <input
                                                readOnly={
                                                    returningInputValue.length ===
                                                    0
                                                        ? false
                                                        : true
                                                }
                                                value={
                                                    returningInputValue.length ===
                                                    0
                                                        ? airportSearchTerm.searchTerm ||
                                                          ""
                                                        : returningInputValue
                                                }
                                                onChange={(event) => {
                                                    dispatch(
                                                        setAirportSearchTerm({
                                                            searchTerm:
                                                                event.target
                                                                    .value,
                                                        })
                                                    );
                                                }}
                                                className='input  is-medium input-border-none'
                                                type='text'
                                                placeholder='Where are you Going To ?'
                                            />
                                            <button
                                                onClick={() =>
                                                    handleAirportInputClear()
                                                }
                                                className='button is-white'>
                                                <FontAwesomeIcon
                                                    icon={faCircleXmark}
                                                />
                                            </button>
                                        </p>
                                    </div>
                                    <div
                                        className={`${
                                            flightCityAirportsSearch.length > 0
                                                ? "is-block"
                                                : "is-hidden"
                                        }`}>
                                        <ul className='search-result box-shadow-1'>
                                            {flightCityAirportsSearch.map(
                                                (airport) => (
                                                    <li
                                                        onClick={() =>
                                                            handleSetCityAirportToInputValue(
                                                                airport.iataCode
                                                            )
                                                        }
                                                        key={airport.id}
                                                        className='p-2'>
                                                        <div className='is-flex'>
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faPlaneDeparture
                                                                    }
                                                                />
                                                            </div>
                                                            <div className='ml-4 is-size-5 has-text-weight-bold'>
                                                                {
                                                                    airport.airportName
                                                                }
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <small className='ml-4'>
                                                                {
                                                                    airport.iataCode
                                                                }
                                                            </small>
                                                            {" - "}
                                                            {airport.city}
                                                        </div>
                                                        <div>
                                                            <small className='ml-4'>
                                                                {
                                                                    airport
                                                                        .country
                                                                        .name
                                                                }
                                                            </small>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div
                                className='column'
                                onClick={() => {
                                    handleOpenCalendar();
                                    setDateType("departureDate");
                                }}>
                                <div className='border-1 border-radius-1 p-1'>
                                    <label>
                                        <small>Departure</small>
                                    </label>
                                    <div className='is-flex '>
                                        <div className='ml-5'>
                                            <FontAwesomeIcon
                                                icon={faCalendarDays}
                                            />
                                        </div>
                                        <div className='ml-5'>
                                            {depatureMonthUI}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                onClick={() => {
                                    handleOpenCalendar();
                                    setDateType("returningDate");
                                }}
                                className={`column  ${
                                    btnOneWayBackground ? "is-hidden" : ""
                                }`}>
                                <div className='border-1 border-radius-1 p-1'>
                                    <label>
                                        <small>Returning</small>
                                    </label>
                                    <div className='is-flex'>
                                        <div className='ml-5'>
                                            <FontAwesomeIcon
                                                icon={faCalendarDays}
                                            />
                                        </div>
                                        <div className='ml-5'>
                                            {returningMonthUI}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='is-flex is-justify-content-right'>
                            {departingInputValue.length > 0 &&
                            returningInputValue.length > 0 ? (
                                <Link
                                    to={`/flights-result?locationFrom=${departingInputValue}&locationTo=${returningInputValue}&flightDefinition=${flightDefinition(
                                        btnRoundtripBackground,
                                        btnOneWayBackground
                                    )}&cabinClass=${cabinClass}&dep=${`${formatFlightDate(
                                        departingDate
                                    )}`}${
                                        btnRoundtripBackground
                                            ? `&ret=${`${formatFlightDate(
                                                  returnDate
                                              )}`}`
                                            : ""
                                    }`}
                                    className='button is-link is-outlined'>
                                    Search Flights
                                </Link>
                            ) : (
                                <button
                                    onClick={handleSearchFlights}
                                    className='button is-link is-outlined'>
                                    Search Flights
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightsPage;
