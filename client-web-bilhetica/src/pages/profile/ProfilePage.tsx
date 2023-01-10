import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAppSelector } from "../../app/store/configureStore";
import { useEffect } from "react";

const ProfilePage = () => {
    const { user } = useAppSelector((state) => state.account);
    const al = user?.al;
    const {
        register,
        handleSubmit,
        setError,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ mode: "all" });

    useEffect(() => {
        setValue("firstname", user?.firstName);
        setValue("lastname", user?.lastName);
        setValue("address", user?.address);
        setValue("phonenumber", user?.phoneNumber);
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
                                    <li>
                                        <a>Details</a>
                                    </li>
                                    {al === 1 && (
                                        <Link to='/my-flights'>
                                            Your Flights
                                        </Link>
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
                            <div className='columns'>
                                <div className='column is-half'>
                                    <form>
                                        <div className='field'>
                                            <label className='label has-text-left'>
                                                First Name
                                            </label>
                                            <p className='control has-icons-left'>
                                                <input
                                                    readOnly
                                                    className='input'
                                                    type='text'
                                                    {...register("firstname", {
                                                        required:
                                                            "first name is required",
                                                    })}
                                                />
                                            </p>
                                        </div>
                                        {errors.firstname && (
                                            <span className='help has-text-danger has-text-left'>
                                                {`${errors?.firstname?.message}`}
                                            </span>
                                        )}
                                        <div className='field'>
                                            <label className='label has-text-left'>
                                                Last Name
                                            </label>
                                            <p className='control has-icons-left'>
                                                <input
                                                    readOnly
                                                    className='input'
                                                    type='text'
                                                    {...register("lastname")}
                                                />
                                            </p>
                                        </div>

                                        <div className='field'>
                                            <label className='label has-text-left'>
                                                Address
                                            </label>
                                            <p className='control has-icons-left'>
                                                <input
                                                    readOnly
                                                    className='input'
                                                    type='text'
                                                    {...register("address")}
                                                />
                                            </p>
                                        </div>

                                        <div className='field'>
                                            <label className='label has-text-left'>
                                                Phone Number
                                            </label>
                                            <p className='control has-icons-left'>
                                                <input
                                                    readOnly
                                                    className='input'
                                                    type='text'
                                                    {...register("phonenumber")}
                                                />
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
