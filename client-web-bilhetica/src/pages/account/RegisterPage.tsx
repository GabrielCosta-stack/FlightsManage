import { Link, useHistory } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../api/agent";
import { useAppSelector } from "../../app/store/configureStore";

interface UserRegisterData {
    firstName: string;
    lastName: string;
    address: string;
    userName: string;
    phoneNumber: string;
    password: string;
}
const RegisterPage = () => {
    const { user } = useAppSelector((state) => state.account);
    const history = useHistory();
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

        const userData: UserRegisterData = {
            firstName: data.firstname,
            lastName: data.lastname,
            address: data.address,
            userName: data.email,
            phoneNumber: data.phone,
            password: data.password,
        };

        agent.Account.register(userData)
            .then(() => history.push("/"))
            .catch((error) => console.log(error));
    };
    return (
        <section className='hero is-align-content-center is-fullheight'>
            <div className='container is-flex '>
                <div className='columns is-align-self-center'>
                    <div className='column is-8 is-offset-2 register'>
                        <div className='columns'>
                            <div className='column left'>
                                <h1 className='title is-1'>
                                    Super Cool Website
                                </h1>
                                <h2 className='subtitle colored is-4'>
                                    Lorem ipsum dolor sit amet.
                                </h2>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Corporis ex deleniti
                                    aliquam tempora libero excepturi vero soluta
                                    odio optio sed.
                                </p>
                            </div>
                            <div className='column right has-text-centered'>
                                <h1 className='title is-4'>Sign up today</h1>

                                <div className='box box-shadow'>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div>
                                            <div className='field'>
                                                <label className='label has-text-left'>
                                                    First Name
                                                </label>
                                                <div className='control has-icons-left '>
                                                    <input
                                                        className='input '
                                                        type='text'
                                                        placeholder='Text input'
                                                        {...register(
                                                            "firstname",
                                                            {
                                                                required:
                                                                    "first name is required",
                                                            }
                                                        )}
                                                    />
                                                    <span className='icon is-small is-left'>
                                                        <i className='mdi mdi-account'></i>
                                                    </span>
                                                </div>
                                                {errors.firstname && (
                                                    <span className='help has-text-danger has-text-left'>
                                                        {`${errors?.firstname?.message}`}
                                                    </span>
                                                )}
                                            </div>
                                            <div className='field'>
                                                <label className='label has-text-left'>
                                                    Last Name
                                                </label>
                                                <div className='control has-icons-left '>
                                                    <input
                                                        className='input '
                                                        type='text'
                                                        placeholder='Text input'
                                                        {...register(
                                                            "lastname",
                                                            {
                                                                required:
                                                                    "last name is required",
                                                            }
                                                        )}
                                                    />
                                                    <span className='icon is-small is-left'>
                                                        <i className='mdi mdi-account'></i>
                                                    </span>
                                                </div>
                                                {errors.lastname && (
                                                    <span className='help has-text-danger has-text-left'>
                                                        {`${errors?.lastname?.message}`}
                                                    </span>
                                                )}
                                            </div>
                                            <div className='field'>
                                                <label className='label has-text-left'>
                                                    Address
                                                </label>
                                                <div className='control'>
                                                    <input
                                                        className='input'
                                                        type='text'
                                                        {...register(
                                                            "address",
                                                            {
                                                                required:
                                                                    "address is required",
                                                            }
                                                        )}
                                                    />
                                                </div>
                                                {errors.address && (
                                                    <span className='help has-text-danger has-text-left'>
                                                        {`${errors?.address?.message}`}
                                                    </span>
                                                )}
                                            </div>
                                            <div className='field'>
                                                <label className='label has-text-left'>
                                                    Email
                                                </label>
                                                <div className='control has-icons-left'>
                                                    <input
                                                        className='input '
                                                        type='email'
                                                        placeholder='Email input'
                                                        {...register("email", {
                                                            required:
                                                                "email is required",
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
                                                <div className='field-label'>
                                                    <label className='label has-text-left'>
                                                        Phone Number
                                                    </label>
                                                </div>
                                                <div className='field-body'>
                                                    <div className='field is-expanded'>
                                                        <div className='field has-addons'>
                                                            <p className='control'>
                                                                <a className='button is-static'>
                                                                    +44
                                                                </a>
                                                            </p>
                                                            <p className='control is-expanded'>
                                                                <input
                                                                    className='input'
                                                                    type='tel'
                                                                    placeholder='Your phone number'
                                                                    {...register(
                                                                        "phone",
                                                                        {
                                                                            required:
                                                                                "phone number is required",
                                                                        }
                                                                    )}
                                                                />
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {errors.phone && (
                                                    <span className='help has-text-danger has-text-left'>
                                                        {`${errors?.phone?.message}`}
                                                    </span>
                                                )}
                                            </div>

                                            <div className='field'>
                                                <label className='label has-text-left'>
                                                    Password
                                                </label>
                                                <p className='control has-icons-left'>
                                                    <input
                                                        className='input'
                                                        type='password'
                                                        placeholder='Password'
                                                        {...register(
                                                            "password",
                                                            {
                                                                required:
                                                                    "password is required",
                                                            }
                                                        )}
                                                    />
                                                    <span className='icon is-small is-left'>
                                                        <i className='mdi mdi-lock-outline'></i>
                                                    </span>
                                                </p>
                                            </div>
                                            {errors.password && (
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
                                                        {...register(
                                                            "confirmpass",
                                                            {
                                                                required:
                                                                    "please confirm your password",
                                                                validate: (
                                                                    value: string
                                                                ) => {
                                                                    if (
                                                                        watch(
                                                                            "password"
                                                                        ) !=
                                                                        value
                                                                    ) {
                                                                        return "Your passwords do no match";
                                                                    }
                                                                },
                                                            }
                                                        )}
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
                                            <div className='field'>
                                                <div className='control has-text-left my-2'>
                                                    <label className='checkbox'>
                                                        <input
                                                            type='checkbox'
                                                            {...register(
                                                                "terms",
                                                                {
                                                                    required:
                                                                        "accept the terms to contiue",
                                                                }
                                                            )}
                                                        />
                                                        <span className='ml-2'>
                                                            I agree to the
                                                            <a href='#'>
                                                                terms and
                                                                conditions
                                                            </a>
                                                        </span>
                                                    </label>
                                                    {errors.terms && (
                                                        <span className='help has-text-danger has-text-left'>
                                                            {`${errors?.terms?.message}`}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button className='button is-block is-primary is-fullwidth is-medium'>
                                                Submit
                                            </button>
                                        </div>
                                        <br />
                                        <div>
                                            {!user && (
                                                <Link
                                                    to='/login'
                                                    className='has-text-primary'>
                                                    Login
                                                </Link>
                                            )}{" "}
                                            &nbsp;·&nbsp;
                                            {!user && (
                                                <Link to='/forgotpassword'>
                                                    Forgot Password
                                                </Link>
                                            )}{" "}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='column is-8 is-offset-2'>
                        <br />
                        <nav className='level'>
                            <div className='level-left'>
                                <div className='level-item'>
                                    <span className='icon'>
                                        <i className='fab fa-twitter'></i>
                                    </span>{" "}
                                    &emsp;
                                    <span className='icon'>
                                        <i className='fab fa-facebook'></i>
                                    </span>{" "}
                                    &emsp;
                                    <span className='icon'>
                                        <i className='fab fa-instagram'></i>
                                    </span>{" "}
                                    &emsp;
                                    <span className='icon'>
                                        <i className='fab fa-github'></i>
                                    </span>{" "}
                                    &emsp;
                                    <span className='icon'>
                                        <i className='fas fa-envelope'></i>
                                    </span>
                                </div>
                            </div>
                            <div className='level-right'>
                                <small className='level-item'>
                                    &copy; Super Cool Website. All Rights
                                    Reserved.
                                </small>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
