import { createContext, useContext, useState } from "react";

interface Context {
    title?: string;
    visible: boolean;
    message?: string;
    hasAction: boolean;
    action?: () => {};
}

interface ContextProps {
    dialogState: Context;
    openDialogHandler: Function;
    closeDialogHandler: Function;
}

// context
const DialogContextProvider = createContext({} as ContextProps);

// Provider
const ConfirmDialogProvider = ({ children }: any) => {
    const [dialogState, setDialogState] = useState({
        visible: false,
        hasAction: false,
    });

    const openDialogHandler = (payload: any) =>
        setDialogState({ ...payload, visible: true });

    const closeDialogHandler = () =>
        setDialogState({ visible: false, hasAction: false });

    return (
        <DialogContextProvider.Provider
            value={{
                dialogState,
                openDialogHandler,
                closeDialogHandler,
            }}>
            {children}
        </DialogContextProvider.Provider>
    );
};

const useDialogContext = () => {
    const context = useContext(DialogContextProvider);
    return context;
};

export { useDialogContext, ConfirmDialogProvider };
