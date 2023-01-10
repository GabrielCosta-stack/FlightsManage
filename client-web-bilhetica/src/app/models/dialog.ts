export interface ConfrimDialog {
    modalTitle: string;
    modalMessage: string;
    hasAction: boolean;
    modalAction: () => void;
}
