import { ComponentType } from "react";
import {
    Redirect,
    Route,
    RouteComponentProps,
    RouteProps,
} from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}
const PrivateRouteDash = ({ component: Component, ...rest }: Props) => {
    const { user } = useAppSelector((state) => state.account);
    const al = user?.al;
    return (
        <Route
            {...rest}
            render={(props) =>
                (user && al === 2) || (user && al === 3) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRouteDash;
