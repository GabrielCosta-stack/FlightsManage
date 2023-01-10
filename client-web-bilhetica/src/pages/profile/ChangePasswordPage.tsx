import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { history } from "../..";
import agent from "../../api/agent";
import { useAppSelector } from "../../app/store/configureStore";

interface UserChangePassData {
    OldPassword: string;
    NewPassword: string;
}

const ChangePasswordPage = () => {
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

    const onSubmit = (data: FieldValues) => {
        console.log(data);

        const userData: UserChangePassData = {
            OldPassword: data.oldpassword,
            NewPassword: data.password,
        };

        agent.Account.changePassword(userData)
            .then(() => {
                history.push("/user-profile");
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='field'>
                                        <label className='label has-text-left'>
                                            Old Password
                                        </label>
                                        <p className='control has-icons-left'>
                                            <input
                                                className='input'
                                                type='password'
                                                placeholder='Password'
                                                {...register("oldpassword", {
                                                    required:
                                                        "password is required",
                                                })}
                                            />
                                            <span className='icon is-small is-left'>
                                                <i className='mdi mdi-lock-outline'></i>
                                            </span>
                                        </p>
                                    </div>
                                    {errors.oldpassword && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.oldpassword?.message}`}
                                        </span>
                                    )}
                                    <div className='field'>
                                        <label className='label has-text-left'>
                                            New Password
                                        </label>
                                        <p className='control has-icons-left'>
                                            <input
                                                className='input'
                                                type='password'
                                                placeholder='Password'
                                                {...register("password", {
                                                    required:
                                                        "new password is required",
                                                })}
                                            />
                                            <span className='icon is-small is-left'>
                                                <i className='mdi mdi-lock-outline'></i>
                                            </span>
                                        </p>
                                    </div>
                                    {errors.oldpassword && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.password?.message}`}
                                        </span>
                                    )}
                                    <div className='field'>
                                        <label className='label has-text-left'>
                                            Confirm Password
                                        </label>
                                        <p className='control has-icons-left'>
                                            <input
                                                className='input'
                                                type='password'
                                                placeholder='Confirm Password'
                                                {...register("confirmpass", {
                                                    required:
                                                        "please confirm your password",
                                                    validate: (
                                                        value: string
                                                    ) => {
                                                        if (
                                                            watch("password") !=
                                                            value
                                                        ) {
                                                            return "Your passwords do no match";
                                                        }
                                                    },
                                                })}
                                            />
                                            <span className='icon is-small is-left'>
                                                <i className='mdi mdi-lock-outline'></i>
                                            </span>
                                        </p>
                                    </div>
                                    {errors.confirmpass && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.confirmpass?.message}`}
                                        </span>
                                    )}

                                    <div className='control mt-3'>
                                        <button
                                            type='submit'
                                            className='button is-link is-fullwidth'>
                                            Change Password
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

export default ChangePasswordPage;
