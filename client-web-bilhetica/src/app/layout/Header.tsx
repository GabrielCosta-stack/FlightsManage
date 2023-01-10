import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../pages/account/accountSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const { user } = useAppSelector((state) => state.account);
    const al = user?.al;
    const dispatch = useAppDispatch();
    const [isActive, setIsActive] = useState(false);

    return (
        <nav className='navbar' role='navigation' aria-label='main navigation'>
            <div className='navbar-brand'>
                <Link to='/' className='navbar-item'>
                    <img src='/AEROALOGO-GR.png' width='35' />
                    <span className='is-size-4 has-text-weight-bold ml-3'>
                        AEROA
                    </span>
                </Link>

                <a
                    onClick={() => {
                        setIsActive(!isActive);
                    }}
                    role='button'
                    className={`navbar-burger ${isActive ? "is-active" : ""}`}
                    aria-label='menu'
                    aria-expanded='false'
                    data-target='navbarBasicExample'>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </a>
            </div>

            <div
                id='navbarBasicExample'
                className={`navbar-menu burguer ${
                    isActive ? "is-active" : ""
                }`}>
                {(!user || al === 1) && (
                    <div className='navbar-start'>
                        <Link to='/' className='navbar-item'>
                            Flights
                        </Link>
                    </div>
                )}
                <div className='navbar-end'>
                    {user ? (
                        <div className='navbar-item has-dropdown is-hoverable'>
                            <a className='navbar-link is-outlined'>
                                <span className='icon mr-3 has-text-primary is-size-5'>
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </span>
                                {user?.userName}
                            </a>
                            <div className='navbar-dropdown'>
                                {(al === 2 || al === 3) && (
                                    <Link to='/admin' className='navbar-item'>
                                        Dashboard
                                    </Link>
                                )}
                                {(al === 1 || al === 2) && (
                                    <Link
                                        to='/user-profile'
                                        className='navbar-item'>
                                        Profile
                                    </Link>
                                )}

                                <hr className='navbar-divider' />
                                <div
                                    style={{ cursor: "pointer" }}
                                    className='navbar-item'
                                    onClick={() => dispatch(signOut())}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='navbar-item'>
                            <button
                                className='button is-rounded is-static
                                is-outlined is-primary has-background-white'>
                                <span className='icon mr-3 has-text-primary is-size-5'>
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </span>
                                <span className='has-text-weight-medium'>
                                    My Account
                                </span>
                            </button>
                        </div>
                    )}

                    <div className='navbar-item'>
                        {!user && (
                            <div className='buttons'>
                                <Link
                                    to='/register'
                                    className='button is-primary'>
                                    <strong>Sign up</strong>
                                </Link>

                                <Link to='/login' className='button is-light'>
                                    Log in
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
