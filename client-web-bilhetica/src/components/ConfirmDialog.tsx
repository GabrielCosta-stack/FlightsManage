import { useDialogContext } from "../components/ConfirmDialogContext";

const ConfirmDialog = () => {
    const {
        dialogState: { visible, message, hasAction, action, title },
        closeDialogHandler,
    } = useDialogContext();

    return (
        <div className={`modal ${visible ? "is-active" : ""}`}>
            <div className='modal-background'></div>
            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title'>{title}</p>
                    <button
                        onClick={() => {
                            closeDialogHandler();
                        }}
                        className='delete'
                        aria-label='close'></button>
                </header>
                <section className='modal-card-body'>{message}</section>
                <footer className='modal-card-foot'>
                    {hasAction && (
                        <button
                            onClick={() => {
                                action?.();
                                closeDialogHandler();
                            }}
                            className='button is-success'>
                            Ok
                        </button>
                    )}

                    <button
                        onClick={() => {
                            closeDialogHandler();
                        }}
                        className='button is-danger'>
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ConfirmDialog;
