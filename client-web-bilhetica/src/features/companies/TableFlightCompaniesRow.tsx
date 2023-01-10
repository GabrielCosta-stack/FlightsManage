import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
    setAdminMenuDisplay,
    setDataToEditOnLocalstorage,
    setEditMode,
} from "../menu/menuSlice";
import {
    deleteFlightCompanyAsync,
    fetchFlightCompanyByIdAsync,
} from "./companySlice";
import { useDialogContext } from "../../components/ConfirmDialogContext";
import { showNotification } from "../../app/notifications/appNotificationSlice";

interface Props {
    id: number;
    companyName: string;
    country: string;
    region: string;
    imageId?: string;
    createdDate: string;
    icaoCode: string;
    iataDesignator: string;
}

const TableFlightCompaniesRow = ({
    id,
    companyName,
    country,
    region,
    imageId,
    createdDate,
    icaoCode,
    iataDesignator,
}: Props) => {
    const dispatch = useAppDispatch();
    const { openDialogHandler, closeDialogHandler } = useDialogContext();

    const handleDeleteRequest = () => {
        dispatch(deleteFlightCompanyAsync(id))
            .unwrap()
            .catch((error) => {
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
        dispatch(fetchFlightCompanyByIdAsync(id))
            .unwrap()
            .then(() => {
                dispatch(setAdminMenuDisplay("flightcompanyform"));
                dispatch(
                    setDataToEditOnLocalstorage({
                        id: id,
                        companyName: companyName,
                        country: country,
                        region: region,
                        imageId: imageId,
                        createdDate: createdDate,
                        icaoCode: icaoCode,
                        iataDesignator: iataDesignator,
                    })
                );
            })
            .catch((error: any) => {
                openDialogHandler({
                    title: "Edit",
                    message: `Flight company ${companyName} does not exist in database, refresh the page`,
                });
            });
    };

    const handleDelete = () => {
        dispatch(fetchFlightCompanyByIdAsync(id))
            .unwrap()
            .then(() => {
                openDialogHandler({
                    title: "Delete",
                    message: `This action will delete flight company ${companyName}. Are you sure?`,
                    hasAction: true,
                    action: handleDeleteRequest,
                });
            })
            .catch((error) => {
                openDialogHandler({
                    title: "Delete",
                    message: `Flight company ${companyName} does not exist in database, refresh the page`,
                });
            });
    };

    return (
        <tr>
            <td className='is-image-cell'>
                <div>
                    <img
                        src={imageId ? imageId : "./logo-default.svg"}
                        width='35'
                        className='is-rounded'
                    />
                </div>
            </td>
            <td data-label='CompanyName'>{companyName}</td>
            <td data-label='IcaoCode'>{icaoCode}</td>
            <td data-label='IataDesignator'>{iataDesignator}</td>
            <td data-label='Country'>{country}</td>
            <td data-label='Region'>{region}</td>
            <td data-label='Created'>{createdDate}</td>
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

export default TableFlightCompaniesRow;
