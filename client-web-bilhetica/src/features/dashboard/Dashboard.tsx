import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { useAppSelector } from "../../app/store/configureStore";

import "./dashboard.scss";

const Dashboard = () => {
    const { user } = useAppSelector((state) => state.account);
    const al = user?.al;
    return (
        <AdminPanelContent>
            <section className='hero is-info welcome is-small'>
                <div className='hero-body'>
                    <div className='container'>
                        <h1 className='title'>
                            Hello, {user?.firstName} {user?.lastName}
                        </h1>
                        <h2 className='subtitle'>
                            I hope you are having a great day!
                        </h2>
                    </div>
                </div>
            </section>
        </AdminPanelContent>
    );
};

export default Dashboard;
