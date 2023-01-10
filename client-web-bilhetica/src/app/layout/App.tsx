import { Route, Switch } from "react-router-dom";
import "./main.scss";
import "./_globals.scss";

import Header from "./Header";
import HomePage from "../../pages/home/HomePage";
import LoginPage from "../../pages/account/LoginPage";
import RegisterPage from "../../pages/account/RegisterPage";
import FlightsPage from "../../pages/flights/FlightsPage";
import AboutPage from "../../pages/about/AboutPage";
import ContactPage from "../../pages/contact/ContactPage";
import AdminPage from "../../pages/admin/AdminPage";
import ConfirmDialog from "../../components/ConfirmDialog";
import ServerError from "../errors/ServerError";

import { ConfirmDialogProvider } from "../../components/ConfirmDialogContext";
import FlightsResultPage from "../../pages/flightsResult/FlightsResultPage";
import ForgotPAssword from "../../pages/account/ForgotPasswordPage";
import PrivateRoute from "./PrivateRouteCustomer";
import PrivateRouteDash from "./PrivateRouteDash";
import PrivateRouteCustomer from "./PrivateRouteCustomer";
import ProfilePage from "../../pages/profile/ProfilePage";
import ChangePasswordPage from "../../pages/profile/ChangePasswordPage";
import UserDetailsPage from "../../pages/profile/UserDetailsPage";
import FlightReservationPage from "../../pages/flightReservation/FlightReservationPage";
import PaymentPage from "../../pages/payment/PaymentPage";
import YourFlightPage from "../../pages/profile/YourFlightsPage";
import NotFoundPage from "../errors/NotFoundPage";

function App() {
    return (
        <>
            <ConfirmDialogProvider>
                <Header />
                <Switch>
                    <Route exact path='/' component={FlightsPage} />
                    <Route path='/login' exact component={LoginPage} />
                    <Route path='/register' exact component={RegisterPage} />
                    <Route path='/contact' exact component={ContactPage} />
                    <Route path='/about' exact component={AboutPage} />
                    <Route path='/flights' exact component={FlightsPage} />
                    <Route
                        path='/forgotpassword'
                        exact
                        component={ForgotPAssword}
                    />
                    <Route
                        path='/flights-result'
                        exact
                        component={FlightsResultPage}
                    />
                    <Route
                        path='/flight-payment'
                        exact
                        component={PaymentPage}
                    />

                    <PrivateRouteCustomer
                        path='/my-flights'
                        exact
                        component={YourFlightPage}
                    />
                    <PrivateRouteCustomer
                        path='/user-profile'
                        exact
                        component={ProfilePage}
                    />
                    <PrivateRouteCustomer
                        path='/user-profile/change-password'
                        exact
                        component={ChangePasswordPage}
                    />

                    <PrivateRouteCustomer
                        path='/user-profile/details'
                        exact
                        component={UserDetailsPage}
                    />
                    <PrivateRouteCustomer
                        path='/flight-reservation'
                        exact
                        component={FlightReservationPage}
                    />
                    <PrivateRouteDash
                        path='/admin'
                        exact
                        component={AdminPage}
                    />
                    <Route path='/server-error' exact component={ServerError} />
                    <Route component={NotFoundPage} />
                </Switch>
                <ConfirmDialog />
            </ConfirmDialogProvider>
        </>
    );
}

export default App;
