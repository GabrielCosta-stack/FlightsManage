import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { history } from "../..";
import agent from "../../api/agent";
import { useAppSelector } from "../../app/store/configureStore";

const PaymentPage = () => {
    const { user } = useAppSelector((state) => state.account);
    const queryString = useLocation().search;
    const depId = new URLSearchParams(queryString).get("depId");
    const depSeat = new URLSearchParams(queryString).get("depSeat");
    const retId = new URLSearchParams(queryString).get("retId");
    const retSeat = new URLSearchParams(queryString).get("retSeat");
    const cabinClass = new URLSearchParams(queryString).get("cabin");
    const [ticketPrice, setTicketPrice] = useState(0);
    const {
        register,
        handleSubmit,
        setError,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ mode: "all" });

    useEffect(() => {
        if (depId) {
            agent.Flight.details(Number(depId))
                .then((flight) => {
                    const ticketPrice = flight.ticketsMetaData.filter(
                        (tk: any) => {
                            return tk.cabinClass === cabinClass;
                        }
                    );
                    setTicketPrice((prev) => prev + ticketPrice[0].adultPrice);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (retId) {
            agent.Flight.details(Number(retId))
                .then((flight) => {
                    const ticketPrice = flight.ticketsMetaData.filter(
                        (tk: any) => {
                            return tk.cabinClass === cabinClass;
                        }
                    );
                    setTicketPrice((prev) => prev + ticketPrice[0].adultPrice);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const onSubmit = (data: FieldValues, e: any) => {
        const stripeData = {
            CardNumber: data.cardnumber,
            ExpMonth: data.expmonth,
            ExpYear: data.expyear,
            Cvv: data.cvv,
            ValueToPay: ticketPrice * 100,
        };

        agent.Stripe.Pay(stripeData)
            .then((result) => {
                if (depId !== null) {
                    const depData = {
                        UserName: user?.userName,
                        FlightId: depId,
                        FlightSeatMapId: depSeat,
                        CabinClass: cabinClass,
                        Price: ticketPrice,
                    };
                    agent.Ticket.create(depData);
                }

                if (retId !== null) {
                    const retData = {
                        UserName: user?.userName,
                        FlightId: retId,
                        FlightSeatMapId: retSeat,
                        CabinClass: cabinClass,
                        Price: ticketPrice,
                    };

                    agent.Ticket.create(retData);
                }
            })
            .then(() => history.push("/"))
            .catch((error) => console.log(error));
    };

    return (
        <section className='hero  is-fullheight'>
            <div className='hero-body'>
                <div className='container '>
                    <div className='column is-4 is-offset-4'>
                        <div className='box box-shadow'>
                            <div className='py-5'>
                                <div className='py-3'>
                                    <p className='title is-size-4 is-capitalized has-text-weight-bold has-text-centered'>
                                        PAYMENT AEROA
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='field'>
                                    <label className='label'>Card Number</label>
                                    <input
                                        className='input'
                                        type='text'
                                        placeholder='Card Number'
                                        {...register("cardnumber", {
                                            required: "card number is required",
                                        })}
                                    />

                                    {errors.cardnumber && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.cardnumber?.message}`}
                                        </span>
                                    )}
                                </div>

                                <div className='columns'>
                                    <div className='column'>
                                        <div className='field'>
                                            <label className='label'>
                                                Exp Month
                                            </label>

                                            <input
                                                className='input'
                                                type='text'
                                                placeholder='Exp Month'
                                                {...register("expmonth", {
                                                    required:
                                                        "expiration date is required",
                                                })}
                                            />

                                            {errors.expmonth && (
                                                <span className='help has-text-danger has-text-left'>
                                                    {`${errors?.expmonth?.message}`}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className='column'>
                                        <div className='field'>
                                            <label className='label'>
                                                Exp Year
                                            </label>

                                            <input
                                                className='input'
                                                type='text'
                                                placeholder='Exp Year'
                                                {...register("expyear", {
                                                    required:
                                                        "expiration year is required",
                                                })}
                                            />

                                            {errors.expyear && (
                                                <span className='help has-text-danger has-text-left'>
                                                    {`${errors?.expyear?.message}`}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='columns'>
                                    <div className='column is-half'>
                                        <div className='field'>
                                            <label className='label'>CVV</label>

                                            <input
                                                className='input'
                                                type='password'
                                                placeholder='CVV'
                                                {...register("cvv", {
                                                    required: "cvv is required",
                                                })}
                                            />

                                            {errors.cvv && (
                                                <span className='help has-text-danger has-text-left'>
                                                    {`${errors?.cvv?.message}`}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button className='button is-block is-primary is-medium is-fullwidth mt-4'>
                                    Pay {ticketPrice} &euro;
                                    <i
                                        className='fa fa-sign-in'
                                        aria-hidden='true'></i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentPage;
