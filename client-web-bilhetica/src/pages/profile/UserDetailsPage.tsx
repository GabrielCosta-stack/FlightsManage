import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../api/agent";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setUser } from "../account/accountSlice";

interface UserChangeData {
    FirstName: string;
    LastName: string;
    Address: string;
    PhoneNumber: string;
}
const UserDetailsPage = () => {
    const { user } = useAppSelector((state) => state.account);
    const al = user?.al;
    const dispatch = useAppDispatch();

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
    }, [user]);

    const onSubmit = (data: FieldValues) => {
        const userData: UserChangeData = {
            FirstName: data.firstname,
            LastName: data.lastname,
            Address: data.address,
            PhoneNumber: data.phonenumber,
        };
        console.log(userData);

        agent.Account.changeUser(userData)
            .then((response) => {
                dispatch(setUser(response));
                localStorage.setItem("user", JSON.stringify(response));
            })
            .catch((error) => console.log(error));
    };
    return (
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
                                    <Link to='/my-flights'>Your Flights</Link>
                                )}
                                <Link to='/user-profile/change-password'>
                                    Change Password
                                </Link>
                                <li>
                                    <a>Change User</a>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
                <div className='column is-10 is-mobile-centered'>
                    <div className='box'>
                        <div className='columns'>
                            <div className='column is-half'>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='field'>
                                        <label className='label has-text-left'>
                                            First Name
                                        </label>
                                        <p className='control has-icons-left'>
                                            <input
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
                                                className='input'
                                                type='text'
                                                {...register("lastname", {
                                                    required:
                                                        "last name is required",
                                                })}
                                            />
                                        </p>
                                    </div>
                                    {errors.lastname && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.lastname?.message}`}
                                        </span>
                                    )}
                                    <div className='field'>
                                        <label className='label has-text-left'>
                                            Address
                                        </label>
                                        <p className='control has-icons-left'>
                                            <input
                                                className='input'
                                                type='text'
                                                {...register("address", {
                                                    required:
                                                        "address is required",
                                                })}
                                            />
                                        </p>
                                    </div>
                                    {errors.address && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.address?.message}`}
                                        </span>
                                    )}

                                    <div className='field'>
                                        <label className='label has-text-left'>
                                            Phone Number
                                        </label>
                                        <p className='control has-icons-left'>
                                            <input
                                                className='input'
                                                type='text'
                                                {...register("phonenumber", {
                                                    required:
                                                        "phone number is required",
                                                })}
                                            />
                                        </p>
                                    </div>
                                    {errors.phonenumber && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.phonenumber?.message}`}
                                        </span>
                                    )}

                                    <div className='control mt-3'>
                                        <button
                                            type='submit'
                                            className='button is-link is-fullwidth'>
                                            Change User
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;
