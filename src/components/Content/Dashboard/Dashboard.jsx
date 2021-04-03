import React, { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, getActiveProjectsPage, getPaginationProjects } from "../../../redux/Dashboard/selectors/dashboardSelector";
import { DashboardItem } from "./DashboardItem";
import { Modal } from "../../../utils/component-helpers/Modal"
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { CreateProjectForm } from "./Forms/CreateProjectForm";
import { Pagination } from "../../../utils/component-helpers/Pagination";
import { getProjectsPageThunk } from "../../../redux/Dashboard/thunks/getProjectsPage";
import { setProjectsPageAction } from "../../../redux/Dashboard/actions/setProjectsPage";
import { getProjectsPaginationThunk } from "../../../redux/Dashboard/thunks/getProjectsPagination";
import { setInitialStateDashboardAction } from "../../../redux/Dashboard/actions/setInitialStateDashboard";

export const Dashboard = withAuthRedirect(() => {

    const dispatch = useDispatch();
    const [dispatchCount, setDispatchCount] = useState(0);
    const [isFetchingDashboard, setFetchingDashboard] = useState(false);
    const [isFetchingPage, setFetchingPage] = useState(false);
    const page = useSelector(getActiveProjectsPage);
    const pagination = useSelector(getPaginationProjects);

    useEffect(async () => {
        setFetchingDashboard(true);
        await dispatch(getProjectsPaginationThunk())
        setFetchingDashboard(false)
        setDispatchCount(1);
    }, [])

    useEffect(() => {
        //сброс state после демонтирования компоненты
        return () => {
            dispatch(setInitialStateDashboardAction());
        }
    }, [])

    useEffect(async () => {
        if (dispatchCount === 1) {
            setFetchingPage(true);
            await dispatch(getProjectsPageThunk());
            setFetchingPage(false);
        }
    }, [page, dispatchCount]);

    const onPageChanged = (page) => {
        dispatch(setProjectsPageAction(page))
    }

    if (isFetchingDashboard) return <div>Loading...</div>

    return (

        <div className={styles.dashboard}>

            <Pagination
                page={page}
                pagination={pagination}
                pathname="/dashboard"
                setPage={setProjectsPageAction}
                onPageChanged={onPageChanged}
            />

            <Projects isFetchingPage={isFetchingPage} />
        </div >
    );
});

export const Projects = ({ isFetchingPage }) => {

    const projects = useSelector(getProjects);

    // Состояние модального окна
    const [isCreateProject, setCreateProject] = useState(false);

    if (isFetchingPage) return <div>Loading...</div>

    return (
        <div className={styles.projects}>

            <CreateProjectCard setCreateProject={setCreateProject} />

            {projects.map((project) =>
                <DashboardItem
                    key={project.id}
                    project={project}
                />
            )}

            <Modal isModal={isCreateProject} setModal={setCreateProject} title="Create Project">
                <CreateProjectForm />
            </Modal>
        </div>
    )
}

export const CreateProjectCard = ({ setCreateProject }) => {
    return (
        <div onClick={() => setCreateProject(true)} className={styles.project + " " + styles.creator}>
            <div className={styles.name}>Create project</div>
        </div>
    )
}