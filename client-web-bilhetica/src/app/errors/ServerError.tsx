import { useHistory } from "react-router-dom";

const ServerError = () => {
    const history = useHistory();
    return (
        <>
            <h1>Server Error 500</h1>
            <p>Internal Server Error</p>
            <button onClick={() => history.push("/")}>
                Go back to Home Page
            </button>
        </>
    );
};

export default ServerError;
