import { Fragment, useState } from "react";
import "./menu-admin.scss";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setAdminMenuDisplay } from "../menu/menuSlice";

interface Props {
    showSideMenu: boolean;
}

const MenuAdmin = ({ showSideMenu }: Props) => {
    const { user } = useAppSelector((state) => state.account);
    const al = user?.al;
    const { tabOpen } = useAppSelector((state) => state.adminMenu);
    const [showDevicesSubMenu, setShowDevicesSubMenu] = useState(true);
    const dispatch = useAppDispatch();

    return (
        <div
            className={`column is-3 side-menu-hide ${
                showSideMenu ? "is-mobile-side has-background-white" : ""
            }`}>
            <aside className='menu '>
                <p className='menu-label'>General</p>
                <ul className='menu-list'>
                    <li>
                        <a
                            className={`${
                                tabOpen === "dashboard" ? "is-active" : ""
                            }`}
                            onClick={() => {
                                dispatch(setAdminMenuDisplay("dashboard"));
                            }}>
                            Dashboard
                        </a>
                    </li>
                </ul>
                <p className='menu-label'>Administration</p>
                <ul className='menu-list'>
                    {al === 3 && (
                        <li>
                            <a
                                onClick={() => {
                                    dispatch(
                                        setAdminMenuDisplay("teamsettings")
                                    );
                                }}>
                                Team Settings
                            </a>
                        </li>
                    )}
                    {al === 2 && (
                        <Fragment>
                            <li>
                                <a
                                    className={`${
                                        tabOpen === "icaodesignators" ||
                                        tabOpen === "flightcompanies" ||
                                        tabOpen === "aircrafts"
                                            ? "is-active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setShowDevicesSubMenu(
                                            !showDevicesSubMenu
                                        );
                                    }}>
                                    Manage Your Devices
                                </a>
                                <ul
                                    className={`${
                                        showDevicesSubMenu
                                            ? "is-hidden"
                                            : "is-block"
                                    }`}>
                                    <li>
                                        <a
                                            onClick={() => {
                                                dispatch(
                                                    setAdminMenuDisplay(
                                                        "icaodesignators"
                                                    )
                                                );
                                            }}>
                                            Models
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => {
                                                dispatch(
                                                    setAdminMenuDisplay(
                                                        "flightcompanies"
                                                    )
                                                );
                                            }}>
                                            Companies
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => {
                                                dispatch(
                                                    setAdminMenuDisplay(
                                                        "aircrafts"
                                                    )
                                                );
                                            }}>
                                            Aircrafts
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a
                                    onClick={() => {
                                        dispatch(
                                            setAdminMenuDisplay("airports")
                                        );
                                    }}
                                    className={`${
                                        tabOpen === "airports"
                                            ? "is-active"
                                            : ""
                                    }`}>
                                    Airports List
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={() => {
                                        dispatch(
                                            setAdminMenuDisplay("flights")
                                        );
                                    }}
                                    className={`${
                                        tabOpen === "flights" ? "is-active" : ""
                                    }`}>
                                    Flights
                                </a>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </aside>
        </div>
    );
};

export default MenuAdmin;
