import React, { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard.module.css";
import {
    getPaginationProjectsInfoThunkCreator,
    getProjectPageThunkCreator,
    setPageProjectsActionCreator,
} from "../../../redux/reducers/projectsReducer";
import { useDispatch, useSelector } from "react-redux";
import { getUserName, getUserToken } from "../../../redux/selectors/authSelector";
import { getProjects, getActiveProjectsPage, getPaginationProjectsInfo } from "../../../redux/selectors/projectsSelector";
import { DashboardItem } from "./DashboardItem";
import { Modal } from "../../utils/Modal"
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { CreateProjectForm } from "./Forms/CreateProjectForm";
import { Pagination } from "../../utils/Pagination";
import { setError } from "../../../redux/reducers/errorsReducer";
import { useHistory } from "react-router";
import { ContactSupportOutlined } from "@material-ui/icons";

export const Dashboard = withAuthRedirect(() => {

    const dispatch = useDispatch();
    const history = useHistory();
    const username = useSelector(getUserName);
    const token = useSelector(getUserToken);
    const page = useSelector(getActiveProjectsPage);
    const paginationInfo = useSelector(getPaginationProjectsInfo);

    useEffect(() => {
        dispatch(getPaginationProjectsInfoThunkCreator(username, token))
    }, [])

    useEffect(() => {
        if (page > paginationInfo.pages && page !== 1) {
            dispatch(setError({ "status": 400, "message": "Not exist page" }));
            if (paginationInfo.pages > 0) {
                dispatch(setPageProjectsActionCreator(1));
            }
        }
        else if (paginationInfo.pages > 0) {
            dispatch(getProjectPageThunkCreator(username, token, page));
        }
    }, [username, token, page, paginationInfo]);

    const onPageChanged = (page) => {
        dispatch(setPageProjectsActionCreator(page))
    }

    return (

        <div className={styles.dashboard}>

            <Pagination
                page={page}
                paginationInfo={paginationInfo}
                pathname="/dashboard"
                setPage={setPageProjectsActionCreator}
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