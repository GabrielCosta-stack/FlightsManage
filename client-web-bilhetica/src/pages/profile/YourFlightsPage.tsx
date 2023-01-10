import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../api/agent";
import { useAppSelector } from "../../app/store/configureStore";

const YourFlightPage = () => {
    const { user } = useAppSelector((state) => state.account);
    const al = user?.al;
    const [tickets, setTickets] = useState<any[]>([]);

    useEffect(() => {
        agent.Ticket.list({ UserName: user?.userName }).then((result) => {
            setTickets(result);
        });
    }, []);

    return (
        <div>
            <div className='container mt-6 mb-6'>
                {/* <div className='box is-hidden-desktop'>
            <FontAwesomeIcon
                icon={faBars}
                onClick={() => {
                    setShowSide(!showSide);
                }}
            />
        </div> */}
                <div className='wrapper-side'>
                    <div className={`column is-3 side-menu-hide `}>
                        <div className='box'>
                            <aside className='menu '>
                                <p className='menu-label'>Profile</p>
                                <ul className='menu-list'>
                                    <Link to='/user-profile'>Details</Link>
                                    {al === 1 && (
                                        <li>
                                            <a>Your Flights</a>
                                        </li>
                                    )}

                                    <Link to='/user-profile/change-password'>
                                        Change Password
                                    </Link>
                                    <Link to='/user-profile/details'>
                                        Change User
                                    </Link>
                                </ul>
                            </aside>
                        </div>
                    </div>
                    <div className='column is-10 is-mobile-centered'>
                        <div className='box'>
                            <div className='table-container'>
                                <div className='table-wrapper has-mobile-cards'>
                                    <table className='table is-fullwidth is-striped is-hoverable is-fullwidth'>
                                        <thead>
                                            <tr>
                                                <th className='is-uppercase is-size-7-touch'>
                                                    From
                                                </th>
                                                <th className='is-uppercase is-size-7-touch'>
                                                    To
                                                </th>
                                                <th className='is-uppercase is-size-7-touch'>
                                                    Cabin Class
                                                </th>
                                                <th className='is-uppercase is-size-7-touch'>
                                                    Seat Number
                                                </th>
                                                <th className='is-uppercase is-size-7-touch'>
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tickets.length > 0 ? (
                                                tickets.map((tick) => (
                                                    <tr>
                                                        <td>{tick.from}</td>
                                                        <td>{tick.to}</td>
                                                        <td>
                                                            {tick.cabinClass}
                                                        </td>
                                                        <td>
                                                            {tick.seatNumber}
                                                        </td>
                                                        <td>{tick.date}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <td>Nothing Found</td>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YourFlightPage;
