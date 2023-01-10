import { faPlane, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Flight } from "../../app/models/flights";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFlightCompanyNamesAsync } from "../../features/companies/companySlice";
import {
    clearFlightSearchResult,
    fetchFlightSearchAsync,
    setFlightSearchParams,
} from "../../features/flights/flightsSlice";
import "./flights-result.scss";

const FlightsResultPage = () => {
    const { user } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const { flightCompanyNames, flightCompanyNamesLoaded } = useAppSelector(
        (state) => state.flightComapny
    );
    const { flighSearchResultsLoaded, flightSearchResult } = useAppSelector(
        (state) => state.flights
    );
    const queryString = useLocation().search;
    const locationFrom = new URLSearchParams(queryString).get("locationFrom");
    const locationTo = new URLSearchParams(queryString).get("locationTo");
    const flightDefinition = new URLSearchParams(queryString).get(
        "flightDefinition"
    );
    const cabinClass = new URLSearchParams(queryString).get("cabinClass");
    const dep = new URLSearchParams(queryString).get("dep");
    const ret = new URLSearchParams(queryString).get("ret");
    const [showQuickView, setShowQuickView] = useState(false);
    const [depFlightChoosed, setDepFlightChoosed] = useState(false);
    const [retFlightChoosed, setRetFlightChoosed] = useState(false);
    const [isFlightReview, setIsFlightReview] = useState(false);

    const [depFlightId, setDepFlightId] = useState<number | null>(null);
    const [timeDeparture, setTimeDeparture] = useState("");
    const [timeArrive, setTimeArrive] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [ticketCabinClass, setTicketCabinClass] = useState("");

    const [retFlightId, setRetFlightId] = useState<number | null>(null);
    const [timeReturn, setTimeReturn] = useState("");
    const [timeReturnArrive, setTimeReturnArrive] = useState("");
    const [returncompanyName, setReturnCompanyName] = useState("");
    const [returnTicketPrice, setReturnTicketPrice] = useState("");
    const [returnTicketCabinClass, setReturnTicketCabinClass] = useState("");

    const [isRoundTrip, setIsRoundTrip] = useState(false);

    let querystring: string;

    useEffect(() => {
        if (!flightCompanyNamesLoaded) {
            dispatch(fetchFlightCompanyNamesAsync());
        }

        dispatch(
            setFlightSearchParams({
                locationFrom,
                locationTo,
                flightDefinition,
                cabinClass,
                dep,
                ret,
            })
        );

        return () => {
            dispatch(clearFlightSearchResult());
        };
    }, []);

    useEffect(() => {
        if (!flighSearchResultsLoaded) {
            dispatch(fetchFlightSearchAsync());
        }
    }, [flighSearchResultsLoaded]);

    const handleSelectDepatureFlight = (flight: Flight) => {
        console.log(flight);
        setDepFlightId(flight?.id!);
        setShowQuickView(true);
        setTimeDeparture(flight.departureTime);
        setTimeArrive(flight.departureTime);
        setCompanyName(flight.aircraft.flightCompany.companyName);

        const ticketPrice = flight.ticketsMetaData.filter((flight) => {
            return flight.cabinClass === cabinClass;
        });

        setTicketPrice(String(ticketPrice[0].adultPrice));
        setTicketCabinClass(ticketPrice[0].cabinClass);
    };

    const handleSelectReturnFlight = (flight: Flight) => {
        console.log(flight);
        setRetFlightId(flight?.id!);
        setShowQuickView(true);
        setTimeReturn(flight.departureTime);
        setTimeReturnArrive(flight.departureTime);
        setReturnCompanyName(flight.aircraft.flightCompany.companyName);

        const ticketPrice = flight.ticketsMetaData.filter((flight) => {
            return flight.cabinClass === cabinClass;
        });

        setReturnTicketPrice(String(ticketPrice[0].adultPrice));
        setReturnTicketCabinClass(ticketPrice[0].cabinClass);
    };

    const handleSetDepartureFlight = () => {
        setShowQuickView(!showQuickView);

        if (flightDefinition === "roundtrip" && !depFlightChoosed) {
            setDepFlightChoosed(true);
        }

        if (
            flightDefinition === "roundtrip" &&
            depFlightChoosed &&
            !retFlightChoosed
        ) {
            setRetFlightChoosed(true);
            setIsFlightReview(true);
        }

        if (flightDefinition === "one-way" && !retFlightChoosed) {
            setRetFlightChoosed(true);
            setIsFlightReview(true);
        }
    };

    return (
        <section className='section'>
            <div className='container'>
                <div className='columns is-centered'>
                    <div className='column  is-9'>
                        <div className='content is-medium'>
                            {flightSearchResult !== null && (
                                <div className='is-flex'>
                                    <p className='is-uppercase is-size-6 has-text-success has-text-weight-semibold'>
                                        Choose Departing Flight
                                    </p>
                                    <p
                                        className={`is-uppercase ml-2 is-size-6 
                                   ${
                                       depFlightChoosed
                                           ? "has-text-success has-text-weight-semibold"
                                           : "has-text-grey-light"
                                   }  ${
                                            flightDefinition === "roundtrip"
                                                ? ""
                                                : "is-hidden"
                                        }`}>
                                        <i className='mr-2 arrow right-f'></i>
                                        Choose Retuning Flight
                                    </p>
                                    <p
                                        className={`is-uppercase ml-2 is-size-6 ${
                                            isFlightReview
                                                ? "has-text-success has-text-weight-semibold"
                                                : "has-text-grey-light"
                                        }  
                                        
                                        `}>
                                        <i className='mr-2 arrow right-f'></i>
                                        Review your Flight
                                    </p>
                                </div>
                            )}

                            {flightDefinition === "roundtrip" &&
                            !depFlightChoosed
                                ? flightSearchResult?.results.queryOneway.map(
                                      (flight: any) => (
                                          <div
                                              onClick={() =>
                                                  handleSelectDepatureFlight(
                                                      flight
                                                  )
                                              }
                                              className='box cursor-pointer mt-6'>
                                              <div className='is-flex is-align-items-center'>
                                                  <img
                                                      src={"/logo-default.svg"}
                                                      width='25'
                                                      className='is-rounded'
                                                  />

                                                  <small className='is-size-6 has-text-grey-light ml-2'>
                                                      {
                                                          flight.aircraft
                                                              .flightCompany
                                                              .companyName
                                                      }
                                                  </small>
                                              </div>
                                              <div className='columns is-vcentered'>
                                                  <div className='column is-two-thirds is-flex is-justify-content-space-around is-align-items-center'>
                                                      <div>
                                                          <p className='is-size-4 has-text-weight-medium mb-0'>
                                                              {
                                                                  flight.departureTime
                                                              }
                                                          </p>
                                                          <p className='is-size-6'>
                                                              {
                                                                  flight
                                                                      .cityAirporFrom
                                                                      .city
                                                              }
                                                              {`   (${flight.cityAirporFrom.iataCode})`}
                                                          </p>
                                                      </div>
                                                      <div>
                                                          <FontAwesomeIcon
                                                              className='has-text-primary'
                                                              icon={faPlane}
                                                          />
                                                      </div>
                                                      <div>
                                                          <p className='is-size-4 has-text-weight-medium mb-0'>
                                                              {
                                                                  flight.departureTime
                                                              }
                                                          </p>
                                                          <p className='is-size-6'>
                                                              {
                                                                  flight
                                                                      .cityAirporTo
                                                                      .city
                                                              }
                                                              {`   (${flight.cityAirporTo.iataCode})`}
                                                          </p>
                                                      </div>
                                                  </div>
                                                  <div className='column'>
                                                      <div className='is-flex is-justify-content-space-evenly'>
                                                          <p className='is-size-7 has-text-grey-light'>
                                                              Flight itinerary
                                                              info
                                                          </p>
                                                          <FontAwesomeIcon
                                                              className='has-text-primary'
                                                              icon={
                                                                  faInfoCircle
                                                              }
                                                          />
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      )
                                  )
                                : flightDefinition === "roundtrip" &&
                                  !retFlightChoosed &&
                                  flightSearchResult?.results.queryReturn.map(
                                      (flight: any) => (
                                          <div
                                              onClick={() =>
                                                  handleSelectReturnFlight(
                                                      flight
                                                  )
                                              }
                                              className='box cursor-pointer mt-6'>
                                              <div className='is-flex is-align-items-center'>
                                                  <img
                                                      src={"/logo-default.svg"}
                                                      width='25'
                                                      className='is-rounded'
                                                  />

                                                  <small className='is-size-6 has-text-grey-light ml-2'>
                                                      {
                                                          flight.aircraft
                                                              .flightCompany
                                                              .companyName
                                                      }
                                                  </small>
                                              </div>
                                              <div className='columns is-vcentered'>
                                                  <div className='column is-two-thirds is-flex is-justify-content-space-around is-align-items-center'>
                                                      <div>
                                                          <p className='is-size-4 has-text-weight-medium mb-0'>
                                                              {
                                                                  flight.departureTime
                                                              }
                                                          </p>
                                                          <p className='is-size-6'>
                                                              {
                                                                  flight
                                                                      .cityAirporFrom
                                                                      .city
                                                              }
                                                              {`   (${flight.cityAirporFrom.iataCode})`}
                                                          </p>
                                                      </div>
                                                      <div>
                                                          <FontAwesomeIcon
                                                              className='has-text-primary'
                                                              icon={faPlane}
                                                          />
                                                      </div>
                                                      <div>
                                                          <p className='is-size-4 has-text-weight-medium mb-0'>
                                                              {
                                                                  flight.departureTime
                                                              }
                                                          </p>
                                                          <p className='is-size-6'>
                                                              {
                                                                  flight
                                                                      .cityAirporTo
                                                                      .city
                                                              }
                                                              {`   (${flight.cityAirporTo.iataCode})`}
                                                          </p>
                                                      </div>
                                                  </div>
                                                  <div className='column'>
                                                      <div className='is-flex is-justify-content-space-evenly'>
                                                          <p className='is-size-7 has-text-grey-light'>
                                                              Flight itinerary
                                                              info
                                                          </p>
                                                          <FontAwesomeIcon
                                                              className='has-text-primary'
                                                              icon={
                                                                  faInfoCircle
                                                              }
                                                          />
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      )
                                  )}

                            {flightDefinition === "one-way" &&
                                !retFlightChoosed &&
                                flightSearchResult?.results.queryOneway.map(
                                    (flight: any) => (
                                        <div
                                            onClick={() =>
                                                handleSelectDepatureFlight(
                                                    flight
                                                )
                                            }
                                            className='box cursor-pointer mt-6'>
                                            Departure
                                            <div className='is-flex is-align-items-center'>
                                                <img
                                                    src={"/logo-default.svg"}
                                                    width='25'
                                                    className='is-rounded'
                                                />

                                                <small className='is-size-6 has-text-grey-light ml-2'>
                                                    {
                                                        flight.aircraft
                                                            .flightCompany
                                                            .companyName
                                                    }
                                                </small>
                                            </div>
                                            <div className='columns is-vcentered'>
                                                <div className='column is-two-thirds is-flex is-justify-content-space-around is-align-items-center'>
                                                    <div>
                                                        <p className='is-size-4 has-text-weight-medium mb-0'>
                                                            {
                                                                flight.departureTime
                                                            }
                                                        </p>
                                                        <p className='is-size-6'>
                                                            {
                                                                flight
                                                                    .cityAirporFrom
                                                                    .city
                                                            }
                                                            {`   (${flight.cityAirporFrom.iataCode})`}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <FontAwesomeIcon
                                                            className='has-text-primary'
                                                            icon={faPlane}
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className='is-size-4 has-text-weight-medium mb-0'>
                                                            {
                                                                flight.departureTime
                                                            }
                                                        </p>
                                                        <p className='is-size-6'>
                                                            {
                                                                flight
                                                                    .cityAirporTo
                                                                    .city
                                                            }
                                                            {`   (${flight.cityAirporTo.iataCode})`}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='column'>
                                                    <div className='is-flex is-justify-content-space-evenly'>
                                                        <p className='is-size-7 has-text-grey-light'>
                                                            Flight itinerary
                                                            info
                                                        </p>
                                                        <FontAwesomeIcon
                                                            className='has-text-primary'
                                                            icon={faInfoCircle}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
                        {flightDefinition === "roundtrip" &&
                            depFlightChoosed &&
                            retFlightChoosed && (
                                <div className='box'>
                                    <div className='columns'>
                                        <div className='column is-half'>
                                            <div className='is-flex is-align-items-center mt-6'>
                                                <img
                                                    src={"/logo-default.svg"}
                                                    width='25'
                                                    className='is-rounded'
                                                />

                                                <small className='is-size-6 has-text-grey-light ml-2'>
                                                    {companyName}
                                                </small>
                                            </div>
                                            <div className='mt-3'>
                                                <span className='has-text-weight-semibold is-size-5'>
                                                    {timeDeparture}
                                                </span>
                                                <span className='has-text-weight-semibold is-size-5 ml-2'>
                                                    -
                                                </span>
                                                <span className='has-text-weight-semibold is-size-5 ml-2'>
                                                    {timeArrive}
                                                </span>
                                            </div>

                                            <div className='mt-5'>
                                                <span className='is-size-6'>
                                                    Price:
                                                </span>
                                            </div>
                                            <div className='mt-2'>
                                                <span className='has-text-weight-bold is-size-5'>
                                                    {ticketPrice} &euro;
                                                </span>
                                            </div>
                                            <div className='mt-5'>
                                                <span className='is-size-6'>
                                                    Cabin:
                                                </span>
                                            </div>
                                            <div className='mt-2 mb-6'>
                                                <span className='has-text-weight-semibold is-size-6'>
                                                    {ticketCabinClass}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='column is-half'>
                                            <div className='is-flex is-align-items-center mt-6'>
                                                <img
                                                    src={"/logo-default.svg"}
                                                    width='25'
                                                    className='is-rounded'
                                                />

                                                <small className='is-size-6 has-text-grey-light ml-2'>
                                                    {returncompanyName}
                                                </small>
                                            </div>
                                            <div className='mt-3'>
                                                <span className='has-text-weight-semibold is-size-5'>
                                                    {timeReturn}
                                                </span>
                                                <span className='has-text-weight-semibold is-size-5 ml-2'>
                                                    -
                                                </span>
                                                <span className='has-text-weight-semibold is-size-5 ml-2'>
                                                    {timeReturnArrive}
                                                </span>
                                            </div>

                                            <div className='mt-5'>
                                                <span className='is-size-6'>
                                                    Price:
                                                </span>
                                            </div>
                                            <div className='mt-2'>
                                                <span className='has-text-weight-bold is-size-5'>
                                                    {returnTicketPrice} &euro;
                                                </span>
                                            </div>
                                            <div className='mt-5'>
                                                <span className='is-size-6'>
                                                    Cabin:
                                                </span>
                                            </div>
                                            <div className='mt-2 mb-6'>
                                                <span className='has-text-weight-semibold is-size-6'>
                                                    {returnTicketCabinClass}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {!user ? (
                                        <Link
                                            to={`/login?depId=${depFlightId}&retId=${retFlightId}&path=flight-reservation&cabin=${cabinClass}`}
                                            className='button is-primary is-fullwidth'>
                                            Confirm
                                        </Link>
                                    ) : (
                                        <Link
                                            to={`/flight-reservation?depId=${depFlightId}&retId=${retFlightId}&cabin=${cabinClass}`}
                                            className='button is-primary is-fullwidth'>
                                            Confirm
                                        </Link>
                                    )}
                                </div>
                            )}

                        {flightDefinition === "one-way" && retFlightChoosed && (
                            <div className='box'>
                                <div className='columns is-justify-content-center'>
                                    <div className='column is-half'>
                                        <div className='is-flex is-align-items-center mt-6'>
                                            <img
                                                src={"/logo-default.svg"}
                                                width='25'
                                                className='is-rounded'
                                            />

                                            <small className='is-size-6 has-text-grey-light ml-2'>
                                                {companyName}
                                            </small>
                                        </div>
                                        <div className='mt-3'>
                                            <span className='has-text-weight-semibold is-size-5'>
                                                {timeDeparture}
                                            </span>
                                            <span className='has-text-weight-semibold is-size-5 ml-2'>
                                                -
                                            </span>
                                            <span className='has-text-weight-semibold is-size-5 ml-2'>
                                                {timeArrive}
                                            </span>
                                        </div>

                                        <div className='mt-5'>
                                            <span className='is-size-6'>
                                                Price:
                                            </span>
                                        </div>
                                        <div className='mt-2'>
                                            <span className='has-text-weight-bold is-size-5'>
                                                {ticketPrice} &euro;
                                            </span>
                                        </div>
                                        <div className='mt-5'>
                                            <span className='is-size-6'>
                                                Cabin:
                                            </span>
                                        </div>
                                        <div className='mt-2 mb-6'>
                                            <span className='has-text-weight-semibold is-size-6'>
                                                {ticketCabinClass}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {!user ? (
                                    <Link
                                        to={`/login?depId=${depFlightId}&path=flight-reservation&cabin=${cabinClass}`}
                                        className='button is-primary is-fullwidth'>
                                        Confirm
                                    </Link>
                                ) : (
                                    <Link
                                        to={`/flight-reservation?depId=${depFlightId}&cabin=${cabinClass}`}
                                        className='button is-primary is-fullwidth'>
                                        Confirm
                                    </Link>
                                )}
                            </div>
                        )}

                        {flightSearchResult === null &&
                            flightSearchResult?.isSuccess === false && (
                                <div className='box has-background-danger has-text-white'>
                                    Not found
                                </div>
                            )}
                    </div>
                </div>
            </div>
            <div
                id='quickviewDefault'
                className={`quickview ${showQuickView ? "is-active" : ""}`}>
                <header className='quickview-header'>
                    <span
                        onClick={() => setShowQuickView(!showQuickView)}
                        className='delete'
                        data-dismiss='quickview'></span>
                </header>

                <div className='quickview-body'>
                    <div className='quickview-block'>
                        <nav className='panel '>
                            <p className='panel-heading '>Flight</p>
                            <div className='box is-shadowless min-height-1'>
                                <div className='mt-3'>
                                    <span className='has-text-weight-semibold is-size-5'>
                                        {!depFlightChoosed
                                            ? timeDeparture
                                            : timeReturn}
                                    </span>
                                    <span className='has-text-weight-semibold is-size-5 ml-2'>
                                        -
                                    </span>
                                    <span className='has-text-weight-semibold is-size-5 ml-2'>
                                        {!depFlightChoosed
                                            ? timeArrive
                                            : timeReturnArrive}
                                    </span>
                                </div>
                                <div className='is-flex is-align-items-center mt-6'>
                                    <img
                                        src={"/logo-default.svg"}
                                        width='25'
                                        className='is-rounded'
                                    />

                                    <small className='is-size-6 has-text-grey-light ml-2'>
                                        {!depFlightChoosed
                                            ? companyName
                                            : returncompanyName}
                                    </small>
                                </div>
                                <div className='mt-5'>
                                    <span className='is-size-6'>Price:</span>
                                </div>
                                <div className='mt-2'>
                                    <span className='has-text-weight-bold is-size-5'>
                                        {!depFlightChoosed
                                            ? ticketPrice
                                            : returnTicketPrice}{" "}
                                        &euro;
                                    </span>
                                </div>
                                <div className='mt-5'>
                                    <span className='is-size-6'>Cabin:</span>
                                </div>
                                <div className='mt-2'>
                                    <span className='has-text-weight-semibold is-size-6'>
                                        {!depFlightChoosed
                                            ? ticketCabinClass
                                            : returnTicketCabinClass}
                                    </span>
                                </div>
                            </div>
                            <div className='panel-block'>
                                <button
                                    onClick={handleSetDepartureFlight}
                                    className='button is-link is-outlined is-fullwidth'>
                                    SELECT
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>

                <footer className='quickview-footer'></footer>
            </div>
        </section>
    );
};

export default FlightsResultPage;
