import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import agent from "../../api/agent";
import { Flight } from "../../app/models/flights";
import "./flight-reservation.scss";

const FlightReservationPage = () => {
    const {
        register,
        handleSubmit,
        setError,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ mode: "all" });

    const dispatch = useDispatch();
    const queryString = useLocation().search;
    const depId = new URLSearchParams(queryString).get("depId");
    const retId = new URLSearchParams(queryString).get("retId");
    const cabinClass = new URLSearchParams(queryString).get("cabin");
    const [depFlight, setDepFlight] = useState<Flight>();
    const [retFlight, setRetFlight] = useState<Flight>();
    const [depFlightSeatMap, setDepFlightSeatMap] = useState<any | null>(null);
    const [retFlightSeatMap, setRetFlightSeatMap] = useState<any | null>(null);
    const [openTab, setOpenTab] = useState<string | null>(null);
    const [seatChoosenDep, seatSeatChoosenDep] = useState<any>(null);
    const [seatChoosenRet, seatSeatChoosenRet] = useState<any>(null);

    useEffect(() => {
        if (depId !== null) {
            agent.FlightReservation.flightById(Number(depId)).then(
                (response) => {
                    setDepFlight(response.flight);
                    setDepFlightSeatMap(response.flightSeatMap);

                    if (response.flightCabinMap !== null) {
                        const seatMap = response.flightCabinMap.filter(
                            (seatMapObj: any) => {
                                return seatMapObj.class === cabinClass;
                            }
                        );
                        console.log(cabinClass);
                        if (seatMap !== null) {
                            setDepFlightSeatMap(seatMap[0].flightSeatMap);
                        }
                    }

                    setOpenTab("departing");
                }
            );
        }

        if (retId !== null) {
            agent.FlightReservation.flightById(Number(retId)).then(
                (response) => {
                    setRetFlight(response.flight);

                    if (response.flightCabinMap) {
                        const seatMap = response.flightCabinMap.filter(
                            (seatMapObj: any) => {
                                return seatMapObj.class === cabinClass;
                            }
                        );

                        if (seatMap !== null) {
                            setRetFlightSeatMap(seatMap[0].flightSeatMap);
                        }
                    }
                }
            );
        }
    }, []);

    const onSubmit = (data: FieldValues) => {};
    return (
        <section className='hero is-medium'>
            <div className='hero-body'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='columns'>
                        <div className='column'>
                            <div
                                style={{ maxWidth: 900, margin: "auto" }}
                                className='box'>
                                <p className='is-size-5 is-uppercase mb-4'>
                                    traveler
                                </p>

                                <div className='columns'>
                                    <div className='column is-half'>
                                        <div className='field'>
                                            <input
                                                className='input is-medium'
                                                type='text'
                                                placeholder='First Name'
                                                {...register("firstname", {
                                                    required:
                                                        "first name is required",
                                                })}
                                            />
                                        </div>
                                        {errors.firstname && (
                                            <span className='help has-text-danger has-text-left'>
                                                {`${errors?.firstname?.message}`}
                                            </span>
                                        )}
                                    </div>
                                    <div className='column is-half'>
                                        <div className='field'>
                                            <input
                                                className='input is-medium'
                                                type='text'
                                                placeholder='Last Name'
                                                {...register("lastname", {
                                                    required:
                                                        "last name is required",
                                                })}
                                            />
                                        </div>
                                        {errors.lastname && (
                                            <span className='help has-text-danger has-text-left'>
                                                {`${errors?.lastname?.message}`}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{ maxWidth: 900, margin: "auto" }}
                                className='box mt-6'>
                                <div className='tabs is-large'>
                                    <ul>
                                        {depFlight && (
                                            <li
                                                onClick={() => {
                                                    setOpenTab("departing");
                                                    console.log(
                                                        depFlightSeatMap
                                                    );
                                                }}
                                                className={`${
                                                    openTab === "departing"
                                                        ? "has-background-success-light"
                                                        : ""
                                                }`}>
                                                <a>
                                                    {
                                                        depFlight.cityAirporFrom
                                                            .iataCode
                                                    }
                                                    -
                                                    {
                                                        depFlight.cityAirporTo
                                                            .iataCode
                                                    }
                                                </a>
                                            </li>
                                        )}

                                        {retFlight && (
                                            <li
                                                className={`${
                                                    openTab === "returning"
                                                        ? "has-background-success-light"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    setOpenTab("returning");
                                                    console.log(
                                                        retFlightSeatMap
                                                    );
                                                }}>
                                                <a>
                                                    {
                                                        retFlight.cityAirporFrom
                                                            .iataCode
                                                    }
                                                    -
                                                    {
                                                        retFlight.cityAirporTo
                                                            .iataCode
                                                    }
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div id='legend'>
                                    <div className='cabinSeat'></div>{" "}
                                    <div className='txt'>Available</div>
                                    <div className='seat taken'></div>{" "}
                                    <div className='txt'>Taken</div>
                                    <div className='seat selected'></div>{" "}
                                    <div className='txt'>Your Chosen Seats</div>
                                </div>
                                <div
                                    className={`container ${
                                        openTab == "departing"
                                            ? "is-block "
                                            : "is-hidden"
                                    }`}>
                                    <div className='columns  mt-6'>
                                        {openTab === "departing" && (
                                            <div className='column is-two-fifths'>
                                                <div className='is-flex is-justify-content-space-evenly'>
                                                    <div>Traveler</div>
                                                    <div>Adult</div>
                                                    {seatChoosenDep !==
                                                        null && (
                                                        <div className='cabinSeat has-background-success'>
                                                            {seatChoosenDep !==
                                                            null
                                                                ? seatChoosenDep.seatNumber
                                                                : ""}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className='column is-two-fifths'>
                                            <div className='seatMapLayout'>
                                                {depFlightSeatMap &&
                                                    depFlightSeatMap.map(
                                                        (seat: any) => (
                                                            <div
                                                                key={seat.id}
                                                                onClick={() => {
                                                                    if (
                                                                        seat.reserverd ===
                                                                        0
                                                                    ) {
                                                                        seatSeatChoosenDep(
                                                                            seat
                                                                        );
                                                                    }
                                                                }}
                                                                className={` ${
                                                                    seat.reserverd ==
                                                                    0
                                                                        ? "cabinSeat"
                                                                        : "cabin-seat-taken"
                                                                } ${
                                                                    seatChoosenDep !==
                                                                        null &&
                                                                    seatChoosenDep.id ===
                                                                        seat.id
                                                                        ? "has-background-success"
                                                                        : ""
                                                                }`}>
                                                                {
                                                                    seat.seatNumber
                                                                }
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`container ${
                                        openTab == "returning"
                                            ? "is-block"
                                            : "is-hidden"
                                    }`}>
                                    <div className='columns  mt-6'>
                                        {openTab === "returning" && (
                                            <div className='column is-two-fifths'>
                                                <div className='is-flex is-justify-content-space-evenly'>
                                                    <div>Traveler</div>
                                                    <div>Adult</div>
                                                    {seatChoosenRet !==
                                                        null && (
                                                        <div className='cabinSeat has-background-success'>
                                                            {seatChoosenRet !==
                                                            null
                                                                ? seatChoosenRet.seatNumber
                                                                : ""}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        <div className='column is-two-fifths'>
                                            <div className='seatMapLayout'>
                                                {retFlightSeatMap &&
                                                    retFlightSeatMap.map(
                                                        (seat: any) => (
                                                            <div
                                                                key={seat.id}
                                                                onClick={() => {
                                                                    if (
                                                                        seat.reserverd ===
                                                                        0
                                                                    ) {
                                                                        seatSeatChoosenRet(
                                                                            seat
                                                                        );
                                                                    }
                                                                }}
                                                                className={` ${
                                                                    seat.reserverd ==
                                                                    0
                                                                        ? "cabinSeat"
                                                                        : "cabin-seat-taken"
                                                                } ${
                                                                    seatChoosenRet !==
                                                                        null &&
                                                                    seatChoosenRet.id ===
                                                                        seat.id
                                                                        ? "has-background-success"
                                                                        : ""
                                                                }`}>
                                                                {
                                                                    seat.seatNumber
                                                                }
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='control mt-6'>
                                    {depId &&
                                        retId &&
                                        seatChoosenDep &&
                                        seatChoosenRet && (
                                            <Link
                                                to={`/flight-payment?depId=${depId}&depSeat=${seatChoosenDep.id}&retId=${retId}&retSeat=${seatChoosenRet.id}&cabin=${cabinClass}`}
                                                type='submit'
                                                className='button is-link is-fullwidth'>
                                                Buy Ticket
                                            </Link>
                                        )}

                                    {depId && !retId && seatChoosenDep && (
                                        <Link
                                            to={`/flight-payment?depId=${depId}&depSeat=${seatChoosenDep.id}&cabin=${cabinClass}`}
                                            type='submit'
                                            className='button is-link is-fullwidth'>
                                            Buy Ticket
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default FlightReservationPage;
