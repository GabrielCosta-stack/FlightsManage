import { useEffect, useState } from "react";
import { getWindowSize } from "../../utils/utils";
import {
    removeAdminComponentToLoadFromLocalstorage,
    setAdminMenuDisplay,
} from "../../features/menu/menuSlice";

import Dashboard from "../../features/dashboard/Dashboard";
import MenuAdmin from "../../features/menu/MenuAdmin";
import IcaoDesignators from "../../features/icao/IcaoDesignators";
import IcaoDesignatorForm from "../../features/icao/IcaoDesignatorForm";
import Companies from "../../features/companies/FlightCompanies";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./admin-page.scss";
import FlightCompanyForm from "../../features/companies/FlightCompanyForm";
import Aircrafts from "../../features/aircrafts/Aircrafts";
import AircraftForm from "../../features/aircrafts/AircraftForm";
import Airports from "../../features/airports/Airports";
import Flights from "../../features/flights/Flights";
import FlightsForm from "../../features/flights/FlightsForm";
import TeamSettings from "../../features/team/TeamSettings";
import TeamForm from "../../features/team/TeamForm";

const AdminPage = () => {
    const { tabOpen } = useAppSelector((state) => state.adminMenu);
    const [componentToLoad, setComponentToLoad] = useState<string | null>("");
    const [showSide, setShowSide] = useState(false);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleWindowResize = () => setWindowSize(getWindowSize());
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    useEffect(() => {
        dispatch(setAdminMenuDisplay(tabOpen));
        setComponentToLoad(tabOpen);
        return () => {
            dispatch(removeAdminComponentToLoadFromLocalstorage());
        };
    }, [tabOpen]);

    if (windowSize.innerWidth > 1024 && showSide === true) {
        setShowSide(!showSide);
    }
    return (
        <div className='container mt-6 mb-6'>
            <div className='box is-hidden-desktop'>
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={() => {
                        setShowSide(!showSide);
                    }}
                />
            </div>
            <div className='wrapper-side'>
                <MenuAdmin showSideMenu={showSide} />
                {componentToLoad === "dashboard" && <Dashboard />}
                {componentToLoad === "icaodesignators" && <IcaoDesignators />}
                {componentToLoad === "icaodesignatorform" && (
                    <IcaoDesignatorForm />
                )}
                {componentToLoad === "flightcompanies" && <Companies />}
                {componentToLoad === "flightcompanyform" && (
                    <FlightCompanyForm />
                )}
                {componentToLoad === "aircrafts" && <Aircrafts />}
                {componentToLoad === "aircraftsform" && <AircraftForm />}
                {componentToLoad === "airports" && <Airports />}
                {componentToLoad === "flights" && <Flights />}
                {componentToLoad === "flightsform" && <FlightsForm />}
                {componentToLoad === "teamsettings" && <TeamSettings />}
                {componentToLoad === "teamform" && <TeamForm />}
            </div>
        </div>
    );
};

export default AdminPage;
