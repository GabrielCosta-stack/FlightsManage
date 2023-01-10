import { Link } from "react-router-dom";
import "./not-found.scss";

const NotFoundPage = () => {
    return (
        <section className='section is-medium'>
            <div className='container'>
                <div className='columns is-vcentered'>
                    <div className='column has-text-centered'>
                        <h1 className='title'>404 Page Not Found</h1>
                        <p className='subtitle'>
                            An unexpected error has occurred.
                        </p>
                        <Link to='/' className='button'>
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;
