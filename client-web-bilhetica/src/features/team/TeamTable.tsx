import { faArrowsRotate, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import AdminPanelContent from "../../app/layout/AdminPanelContent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import LoadingComponent from "../../components/LoadingComponent";
import { setAdminMenuDisplay, setCreateMode } from "../menu/menuSlice";
import TableRowTeam from "./TableRowTeam";
import {
    changeTeamMemberLoadedState,
    fetchTeamMembersAsync,
    teamSelectors,
} from "./teamSlice";

const TeamTable = () => {
    const dispatch = useAppDispatch();
    const teamMembers = useAppSelector(teamSelectors.selectAll);
    const { teamMembersLoaded } = useAppSelector((state) => state.team);

    useEffect(() => {
        if (!teamMembersLoaded) dispatch(fetchTeamMembersAsync());
    }, [teamMembersLoaded]);

    if (!teamMembersLoaded) {
        return <LoadingComponent message='Loading Team Members' />;
    }

    return (
        <section className='section'>
            <div className='container'>
                <div className='box is-shadowless is-flex is-justify-content-space-between'>
                    <button
                        onClick={() => {
                            dispatch(setAdminMenuDisplay("teamform"));
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
                            dispatch(changeTeamMemberLoadedState(false));
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
                                    <th></th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Name
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Role
                                    </th>
                                    <th className='is-uppercase is-size-7-touch'>
                                        Email
                                    </th>

                                    <th colSpan={5}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.length > 0 &&
                                    teamMembers.map((member: any) => (
                                        <TableRowTeam
                                            key={member.id}
                                            Id={member.id}
                                            fullName={member.fullName}
                                            userName={member.userName}
                                            role={member.role}
                                            address={member.address}
                                            phoneNumber={member.phoneNumber}
                                            imageId={member.imageId}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamTable;
