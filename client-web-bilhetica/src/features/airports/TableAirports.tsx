import { faArrowsRotate, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectChangeEvent } from "@mui/material";
import { ChangeEvent, useEffect } from "react";
import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../components/LoadingComponent";
import Paginator from "../../components/Paginator";
import {
    airportsSelectors,
    changeAirportsLoadedState,
    fetchAiportsOptionsAsync,
    fetchAirportsAsync,
    setPageNumber,
    setProductParams,
} from "./AirportSlice";
import TableAirportsRow from "./TableAirportsRow";

const TableAirports = () => {
    const dispatch = useAppDispatch();
    const { airportsLoaded, metaData, regionsLoaded, regions } = useAppSelector(
        (state) => state.airports
    );

    useEffect(() => {
        if (!airportsLoaded) dispatch(fetchAirportsAsync());
    }, [airportsLoaded]);

    useEffect(() => {
        if (!regionsLoaded) dispatch(fetchAiportsOptionsAsync());
    }, [regionsLoaded]);

    const cityAirports = useAppSelector(airportsSelectors.selectAll);

    const change = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(
            setProductParams({
                region: event.target.value,
            })
        );
    };

    if (!airportsLoaded)
        return (
            <AdminPanelContent>
                <LoadingComponent message='Loading Airports' />
            </AdminPanelContent>
        );

    return (
        <section className='section'>
            <div className='container'>
                <div className='box is-shadowless is-flex is-justify-content-space-between'>
                    <div className='control has-icons-left'>
                        <div className='select'>
                            <select onChange={change}>
                                <option value='All'>-- All Regions --</option>
                                {regions.length > 0 ? (
                                    regions.map((region) => (
                                        <option
                                            key={region.regionCode}
                                            value={region.regionName}>
                                            {region.regionName}{" "}
                                            {`(${region.regionCode})`}
                                        </option>
                                    ))
                                ) : (
                                    <option>Not Found</option>
                                )}
                            </select>
                        </div>
                        <span className='icon is-left'>
                            <FontAwesomeIcon icon={faGlobe} />
                        </span>
                    </div>
                    <button
                        onClick={() => {
                            dispatch(changeAirportsLoadedState(false));
                        }}
                        className='button is-normal is-link is-outlined'
                        type='button'>
                        <span className='icon'>
                            <FontAwesomeIcon icon={faArrowsRotate} />
                        </span>
                        <span>Refresh</span>
                    </button>
                </div>
                <div className='table-container'>
                    <div className='table-wrapper has-mobile-cards'>
                        <table className='table is-fullwidth is-striped is-hoverable is-fullwidth'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Country Flag
                                    </th>

                                    <th className='is-uppercase is-size-7-touch'>
                                        Country
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Code
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Region
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Created
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cityAirports &&
                                    cityAirports.map((airport) => (
                                        <TableAirportsRow
                                            key={airport.id}
                                            airport={airport}
                                        />
                                    ))}
                            </tbody>
                        </table>
                        {cityAirports.length > 0 && (
                            <Paginator
                                metaData={metaData!}
                                onPageChange={(page: number) =>
                                    dispatch(
                                        setPageNumber({ pageNumber: page })
                                    )
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TableAirports;
