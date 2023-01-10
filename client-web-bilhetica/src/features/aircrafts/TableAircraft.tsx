import { faArrowsRotate, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Aircraft } from "../../app/models/aircraft";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import Paginator from "../../components/Paginator";
import { setAdminMenuDisplay, setCreateMode } from "../menu/menuSlice";
import TableAircraftRow from "./TableAircraftRow";
import { changeAircraftLoadedState, setPageNumber } from "./aircraftSlice";

interface Props {
    aircrafts: Aircraft[];
}

const TableAircraft = ({ aircrafts }: Props) => {
    const dispatch = useAppDispatch();
    const { metaData } = useAppSelector((state) => state.aircrafts);

    return (
        <section className='section'>
            <div className='container'>
                <div className='box is-shadowless is-flex is-justify-content-space-between'>
                    <button
                        onClick={() => {
                            dispatch(setAdminMenuDisplay("aircraftsform"));
                            dispatch(setCreateMode(true));
                        }}
                        className='button is-normal is-primary is-outlined'
                        type='button'>
                        <span className='icon'>
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                        <span>New</span>
                    </button>

                    <button
                        onClick={() => {
                            dispatch(changeAircraftLoadedState(false));
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
                                        Logo
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Model
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Company Name
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Country
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Region
                                    </th>

                                    <th className='is-uppercase is-size-7-touch'>
                                        Created
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {aircrafts.length > 0 ? (
                                    aircrafts.map((aircraft) => (
                                        <TableAircraftRow
                                            key={aircraft.id}
                                            aircraft={aircraft}
                                        />
                                    ))
                                ) : (
                                    <tr className='is-empty'>
                                        <td colSpan={7}>
                                            <section className='section'>
                                                <div className='content has-text-grey has-text-centered'>
                                                    <p>
                                                        <span className='icon is-large'>
                                                            <i className='mdi mdi-emoticon-sad mdi-48px'></i>
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Nothing's there&hellip;
                                                    </p>
                                                </div>
                                            </section>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {aircrafts.length > 0 && (
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

export default TableAircraft;
