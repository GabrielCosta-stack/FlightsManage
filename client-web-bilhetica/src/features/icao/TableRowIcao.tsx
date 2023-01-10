import { useAppDispatch } from "../../app/store/configureStore";

import {
    setAdminMenuDisplay,
    setDataToEditOnLocalstorage,
    setEditMode,
} from "../menu/menuSlice";
import {
    deleteIcaoAsync,
    fetchIcaoByIdAsync,
    setIcaoToEdit,
} from "./icaoSlice";
import {
    removeNotificationComponent,
    showNotification,
} from "../../app/notifications/appNotificationSlice";

import { useDialogContext } from "../../components/ConfirmDialogContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface Props {
    Id: number;
    IcaoCode: string;
    IataTypeCode: string;
    Model: string;
    Created?: string;
}

const TableRow = ({ Id, IcaoCode, IataTypeCode, Model, Created }: Props) => {
    const dispatch = useAppDispatch();
    const { openDialogHandler, closeDialogHandler } = useDialogContext();

    const handleDeleteRequest = () => {
        dispatch(deleteIcaoAsync(Id))
            .unwrap()
            .catch((error) => {
                console.log(error.error.title);
                dispatch(
                    showNotification({
                        message: error.error.title,
                        type: "is-danger",
                        open: true,
                    })
                );
            });
    };

    const handleEdit = () => {
        dispatch(setEditMode(true));
        dispatch(fetchIcaoByIdAsync(Id))
            .unwrap()
            .then(() => {
                dispatch(setAdminMenuDisplay("icaodesignatorform"));
                dispatch(
                    setDataToEditOnLocalstorage({
                        id: Id,
                        icaoCode: IcaoCode,
                        iataTypeCode: IataTypeCode,
                        model: Model,
                    })
                );
            })
            .catch((error: any) => {
                openDialogHandler({
                    title: "Edit",
                    message: `Model ${Model} does not exist in database, refresh the page`,
                });
            });
    };

    const handleDelete = () => {
        dispatch(fetchIcaoByIdAsync(Id))
            .unwrap()
            .then(() => {
                openDialogHandler({
                    title: "Delete",
                    message: `This action will delete model ${Model}. Are you sure?`,
                    hasAction: true,
                    action: handleDeleteRequest,
                });
            })
            .catch((error) => {
                openDialogHandler({
                    title: "Delete",
                    message: `Model ${Model} does not exist in database, refresh the page`,
                });
            });
    };

    return (
        <tr>
            <td data-label='Name'>{Model}</td>
            <td data-label='Company'>{IataTypeCode}</td>
            <td data-label='City'>{IcaoCode}</td>
            <td data-label='Created'>{Created}</td>
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
    );
};

export default TableRow;
