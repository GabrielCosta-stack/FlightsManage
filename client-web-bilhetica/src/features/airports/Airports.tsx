import AdminPanelContent from "../../app/layout/AdminPanelContent";
import AppNotification from "../../app/notifications/AppNotification";
import TableAirports from "./TableAirports";

const Airports = () => {
    return (
        <AdminPanelContent>
            <h1 className='is-size-6 is-uppercase has-text-weight-medium'>
                Airports
            </h1>
            <AppNotification />
            <TableAirports />
        </AdminPanelContent>
    );
};

export default Airports;
