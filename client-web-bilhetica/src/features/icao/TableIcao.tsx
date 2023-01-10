import TableRow from "./TableRowIcao";
import { IcaoDesignator } from "../../app/models/icaoDesignator";
import {
    setAdminMenuDisplay,
    setCreateMode,
} from "../../features/menu/menuSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import Paginator from "../../components/Paginator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { changeIcaoLoadedState, setPageNumber } from "./icaoSlice";

interface Props {
    icaos: IcaoDesignator[];
}

const TableIcao = ({ icaos }: Props) => {
    const dispatch = useAppDispatch();
    const { metaData } = useAppSelector((state) => state.icao);

    return (
        <section className='section'>
            <div className='container'>
                <div className='box is-shadowless is-flex is-justify-content-space-between'>
                    <button
                        onClick={() => {
                            dispatch(setAdminMenuDisplay("icaodesignatorform"));
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
                            dispatch(changeIcaoLoadedState(false));
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
                                    <th className='is-uppercase is-size-7-touch'>
                                        Model
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Iata Type Code
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        ICAO Code
                                    </th>
                                    <th>Created</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {icaos.length > 0 ? (
                                    icaos.map((icao) => (
                                        <TableRow
                                            key={icao.id}
                                            Id={icao.id}
                                            IcaoCode={icao.icaoCode}
                                            IataTypeCode={icao.iataTypeCode}
                                            Model={icao.model}
                                            Created={icao.createdDate}
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
                        {icaos.length > 0 && (
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

export default TableIcao;
