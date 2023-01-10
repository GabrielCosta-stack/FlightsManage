import { Link, useHistory, useLocation } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { signInUser } from "./accountSlice";

export interface UserloginData {
    userName: string;

    password: string;
}

const LoginPage = () => {
    const history = useHistory();
    const location = useLocation<any>();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.account);
    const queryString = useLocation().search;
    const path = new URLSearchParams(queryString).get("path");
    const depId = new URLSearchParams(queryString).get("depId");
    const retId = new URLSearchParams(queryString).get("retId");
    const cabinClass = new URLSearchParams(queryString).get("cabin");

    const {
        register,
        handleSubmit,
        setError,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ mode: "all" });

    const onSubmit = (data: FieldValues, e: any) => {
        e.preventDefault();

        const userData: UserloginData = {
            userName: data.email,
            password: data.password,
        };

        console.log(userData);

        dispatch(signInUser(userData))
            .unwrap()
            .then(() => {
                if (path !== null) {
                    if (depId !== null && retId !== null) {
                        history.push(
                            `/${path}?depId=${depId}&retId=${retId}&cabin=${cabinClass}`
                        );
                    }
                    if (retId === null) {
                        history.push(
                            `/${path}?depId=${depId}&cabin=${cabinClass}`
                        );
                    }
                } else {
                    history.push("/");
                }
            })
            .catch(() => {
                history.push("/login");
            });
    };

    return (
        <section className='hero  is-fullheight'>
            <div className='hero-body'>
                <div className='container '>
                    <div className='column is-4 is-offset-4'>
                        <h3 className='title has-text-centered'>Login</h3>

                        <div className='box box-shadow'>
                            <div className='py-5'>
                                <figure className='image'>
                                    <img
                                        src='/AEROALOGO-GR.png'
                                        className='mx-auto'
                                        style={{ width: 70 }}
                                    />
                                </figure>
                                <div className='py-3'>
                                    <p className='title is-size-4 is-capitalized has-text-weight-bold has-text-centered'>
                                        AEROA
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className='field'>
                                    <label className='label'>Email</label>
                                    <div className='control has-icons-left'>
                                        <input
                                            className='input'
                                            type='email'
                                            placeholder='Email input'
                                            {...register("email", {
                                                required: "email is required",
                                            })}
                                        />
                                        <span className='icon is-small is-left'>
                                            <i className='mdi mdi-email-outline'></i>
                                        </span>
                                    </div>
                                    {errors.email && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.email?.message}`}
                                        </span>
                                    )}
                                </div>

                                <div className='field'>
                                    <label className='label'>Password</label>
                                    <p className='control has-icons-left'>
                                        <input
                                            className='input'
                                            type='password'
                                            placeholder='Password'
                                            {...register("password", {
                                                required:
                                                    "password is required",
                                            })}
                                        />
                                        <span className='icon is-small is-left'>
                                            <i className='mdi mdi-lock-outline'></i>
                                        </span>
                                    </p>
                                    {errors.password && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.password?.message}`}
                                        </span>
                                    )}
                                </div>
                                <div className='field'>
                                    <label className='label'>
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
                                                validate: (value: string) => {
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
                                    {errors.confirmpass && (
                                        <span className='help has-text-danger has-text-left'>
                                            {`${errors?.confirmpass?.message}`}
                                        </span>
                                    )}
                                </div>

                                <button className='button is-block is-primary is-medium is-fullwidth mt-4'>
                                    Login{" "}
                                    <i
                                        className='fa fa-sign-in'
                                        aria-hidden='true'></i>
                                </button>
                            </form>
                        </div>
                        <p className='has-text-grey'>
                            <Link to='/register'>Sign Up</Link> &nbsp;·&nbsp;
                            {!user && (
                                <Link to='/forgotpassword'>
                                    Forgot Password
                                </Link>
                            )}{" "}
                            &nbsp;·&nbsp;
                            <a href='../'>Need Help?</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
