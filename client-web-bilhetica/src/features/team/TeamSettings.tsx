import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../components/LoadingComponent";
import TeamTable from "./TeamTable";

const TeamSettings = () => {
    return (
        <AdminPanelContent>
            <h1 className='is-size-6 is-uppercase has-text-weight-medium'>
                Team Members
            </h1>
            <TeamTable />
        </AdminPanelContent>
    );
};

export default TeamSettings;
