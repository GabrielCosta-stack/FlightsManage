import AdminPanelContent from "../../app/layout/AdminPanelContent";
import TableFlights from "./TableFlights";
import AppNotification from "../../app/notifications/AppNotification";

const Flights = () => {
    return (
        <AdminPanelContent>
            <h1 className='is-size-6 is-uppercase has-text-weight-medium'>
                Flights
            </h1>
            <AppNotification />
            <TableFlights />
        </AdminPanelContent>
    );
};

export default Flights;
