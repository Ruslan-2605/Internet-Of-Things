import React, { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserName, getUserToken } from "../../../redux/Authtorization/selectors/authSelector";
import { getProjects, getActiveProjectsPage, getPaginationProjects } from "../../../redux/Dashboard/selectors/dashboardSelector";
import { DashboardItem } from "./DashboardItem";
import { Modal } from "../../utils/Modal"
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { CreateProjectForm } from "./Forms/CreateProjectForm";
import { Pagination } from "../../utils/Pagination";
import { getProjectsPageThunk } from "../../../redux/Dashboard/thunks/getProjectsPage";
import { setProjectsPageAction } from "../../../redux/Dashboard/actions/setProjectsPage";
import { getProjectsPaginationThunk } from "../../../redux/Dashboard/thunks/getProjectsPagination";
import { setErrorAction } from "../../../redux/Errors/actions/setError";

export const Dashboard = withAuthRedirect(() => {

    const dispatch = useDispatch();
    const username = useSelector(getUserName);
    const token = useSelector(getUserToken);
    const page = useSelector(getActiveProjectsPage);
    const paginationInfo = useSelector(getPaginationProjects);

    useEffect(() => {
        dispatch(getProjectsPaginationThunk(username, token))
    }, [])

    useEffect(() => {
        if (page > paginationInfo.pages && page !== 1) {
            dispatch(setErrorAction({ "status": 400, "message": "Not exist page" }));
            if (paginationInfo.pages > 0) {
                dispatch(setProjectsPageAction(1));
            }
        }
        else if (paginationInfo.pages > 0) {
            dispatch(getProjectsPageThunk(username, token, page));
        }
    }, [username, token, page, paginationInfo]);

    const onPageChanged = (page) => {
        dispatch(setProjectsPageAction(page))
    }

    return (

        <div className={styles.dashboard}>

            <Pagination
                page={page}
                paginationInfo={paginationInfo}
                pathname="/dashboard"
                setPage={setProjectsPageAction}
                onPageChanged={onPageChanged}
            />

            <Projects />
        </div >
    );
});

export const Projects = () => {

    const projects = useSelector(getProjects);

    // Состояние модального окна
    const [isCreateProject, setCreateProject] = useState(false);

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