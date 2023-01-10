import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { removeNotificationComponent } from "./appNotificationSlice";
interface Props {
    type: string;
    message: string;
}

const AppNotification = () => {
    const dispatch = useAppDispatch();
    const { message, type, open } = useAppSelector(
        (state) => state.notification
    );

    const handleClose = () => {
        dispatch(removeNotificationComponent());
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeNotificationComponent());
        }, 10000);

        return () => clearTimeout(timer);
    }, [open]);

    return (
        <div
            className={`notification ${type} ${
                open ? "is-block" : "is-hidden"
            }`}>
            <button className='delete' onClick={handleClose}></button>
            {message}
        </div>
    );
};

export default AppNotification;
