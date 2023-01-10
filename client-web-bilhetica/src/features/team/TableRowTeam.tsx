import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import agent from "../../api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setAdminMenuDisplay, setEditMode } from "../menu/menuSlice";
import { changeTeamMemberLoadedState, setIdToEditMode } from "./teamSlice";
import { useDialogContext } from "../../components/ConfirmDialogContext";

interface Props {
    Id: string;
    fullName: string;
    userName: string;
    role: string;
    address: string;
    phoneNumber: string;
    imageId: string;
}

const TableRowTeam = ({
    Id,
    fullName,
    userName,
    role,
    address,
    phoneNumber,
    imageId,
}: Props) => {
    const dispatch = useAppDispatch();
    const handleEdit = () => {
        dispatch(setEditMode(true));
        dispatch(setAdminMenuDisplay("teamform"));
        dispatch(setIdToEditMode(Id));
    };
    const { openDialogHandler, closeDialogHandler } = useDialogContext();

    const handleDelete = () => {
        agent.Team.delete(Id).then(() =>
            dispatch(changeTeamMemberLoadedState(false))
        );
    };
    const handleToggleTeamDetails = (aircraftId: string) => {
        const detailsTab = document.getElementById(`details-team-${Id}`);
        detailsTab?.classList.toggle("is-hidden");
    };

    return (
        <Fragment>
            <tr>
                <td
                    onClick={() => handleToggleTeamDetails(Id)}
                    className='is-chevron-cell'>
                    <a role='button'>
                        <span className='icon is-expanded'>
                            <i className='mdi mdi-chevron-right mdi-24px'></i>
                        </span>
                    </a>
                </td>
                <td className='is-image-cell'>
                    <div>
                        <img
                            src={imageId ? imageId : "./logo-default.svg"}
                            width='35'
                            className='is-rounded'
                        />
                    </div>
                </td>
                <td>{fullName}</td>
                <td>{"TeamMember"}</td>
                <td>{userName}</td>
                <td className='is-actions-cell'>
                    <div className='buttons is-right'>
                        <button
                            onClick={handleEdit}
                            className='button is-small is-primary is-outlined '
                            type='button'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </span>
                        </button>
                        <button
                            onClick={handleDelete}
                            className='button is-small is-danger is-outlined'
                            data-target='sample-modal'
                            type='button'>
                            <span className='icon'>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </span>
                        </button>
                    </div>
                </td>
            </tr>
            <tr id={`details-team-${Id}`} className='detail is-hidden'>
                <td colSpan={8}>
                    <div className='detail-container'>
                        <article className='media'>
                            <div className='media-content'>
                                <div className='content'>
                                    <table className='table is-fullwidth is-hoverable is-fullwidth'>
                                        <thead>
                                            <tr>
                                                <th>Address</th>
                                                <th>Phone Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{address}</td>
                                                <td>{phoneNumber}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </article>
                    </div>
                </td>
            </tr>
        </Fragment>
    );
};

export default TableRowTeam;
