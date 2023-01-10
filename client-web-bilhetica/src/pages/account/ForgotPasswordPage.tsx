import { FieldValues, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { history } from "../..";
import { useAppDispatch } from "../../app/store/configureStore";
import { forgotPassword } from "./accountSlice";

interface RecoverPasswordData {
    email: string;
}

const ForgotPAsswordPage = () => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        setError,
        watch,
        setValue,
        formState: { errors },
    } = useForm({ mode: "all" });

    const onSubmit = (data: FieldValues) => {
        const recoverPassData: RecoverPasswordData = {
            email: data.email,
        };
        console.log(recoverPassData);
        dispatch(forgotPassword(recoverPassData)).then(() =>
            history.push("/login")
        );
    };
    return (
        <section className='hero  is-fullheight'>
            <div className='hero-body'>
                <div className='container '>
                    <div className='column is-4 is-offset-4'>
                        <h3 className='title has-text-centered'>
                            Send Your Email
                        </h3>

                        <div className='box box-shadow'>
                            <div className='py-5'>
                                <figure className='image'>
                                    <img
                                        src='/AEROALOGO-GR.png'
                                        className='mx-auto'
                                        style={{ width: 40 }}
                                    />
                                </figure>
                                <div className='py-3'>
                                    <p className='title is-size-6 is-capitalized has-text-weight-bold has-text-centered'>
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

                                <button className='button is-block is-primary is-medium is-fullwidth mt-4'>
                                    Send Email{" "}
                                    <i
                                        className='fa fa-sign-in'
                                        aria-hidden='true'></i>
                                </button>
                            </form>
                        </div>
                        <p className='has-text-grey'>
                            <Link className='has-text-primary' to='/register'>
                                Sign Up
                            </Link>{" "}
                            &nbsp;·&nbsp;
                            <a className='has-text-primary' href='../'>
                                Need Help?
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPAsswordPage;
