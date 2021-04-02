import React, { useEffect, useState } from "react";
import styles from "../../../styles/Project.module.css";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActiveThingsPage, getPaginationThings, getThings } from "../../../redux/Things/selectors/thingsSelector";
import { getUserToken } from "../../../redux/Authtorization/selectors/authSelector";
import { Modal } from "../../../utils/component-helpers/Modal"
import { Device } from "./Device/Device";
import { getProjectViewed } from "../../../redux/Dashboard/selectors/dashboardSelector";
import SettingsIcon from '@material-ui/icons/Settings';
import { UpdateProjectForm } from "../Dashboard/Forms/UpdateProjectForm";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { CreateDeviceModal } from "./Device/Modals/CreateDeviceModal";
import { Pagination } from "../../../utils/component-helpers/Pagination";
import { CreateSensorForm } from "../Project/Sensor/Forms/CreateSensorForm";
import { Sensor } from "./Sensor/Sensor";
import { setInitialProjectViewedAction } from "../../../redux/Dashboard/actions/setInitialProjectViewed";
import { setThingsPageAction } from "../../../redux/Things/actions/setThingsPage";
import { getThingsPaginationThunk } from "../../../redux/Things/thunks/getThingsPagination";
import { getProjectThunk } from "../../../redux/Dashboard/thunks/getProject";
import { getThingsPageThunk } from "../../../redux/Things/thunks/getThingsPage";
import { deleteProjectThunk } from "../../../redux/Dashboard/thunks/deleteProject"
import { setInitialStateAction } from "../../../redux/Things/actions/setInitialState";
import { setErrorAction } from "../../../redux/Errors/actions/setError";

export const Project = withAuthRedirect(withRouter((props) => {

    // желательно заменить HOC на hook
    let id = props.match.params.projectId;

    const dispatch = useDispatch();
    const thingsPage = useSelector(getActiveThingsPage);
    const token = useSelector(getUserToken);
    const things = useSelector(getThings);
    const project = useSelector(getProjectViewed);
    const paginationInfo = useSelector(getPaginationThings);

    useEffect(() => {
        dispatch(getThingsPaginationThunk(id, token));
        dispatch(getProjectThunk(id, token));
    }, [])

    useEffect(() => {
        dispatch(getThingsPageThunk(id, thingsPage, token));
    }, [thingsPage])

    useEffect(() => {
        //set initialState после демонтирования компоненты 
        return () => {
            dispatch(setInitialProjectViewedAction())
            dispatch(setInitialStateAction())
        }
    }, [])

    // Состояние модального окна Create Device 
    const [isCreateDevice, setCreateDevice] = useState(false);

    // Состояние модального окна Update Project
    const [isUpdateProject, setUpdateProject] = useState(false);

    // Состояние модального окна Update Project
    const [isCreateSensor, setCreateSensor] = useState(false);

    const deleteProject = (id, token) => {
        dispatch(deleteProjectThunk(id, token))
    }

    const onPageChanged = (page) => {
        dispatch(setThingsPageAction(page))
    }

    return (

        <div className={styles.project}>

            <div className={styles.projectHeader}>

                <div className={styles.projectInfo}>
                    <div className={styles.name}>{project.name}</div>
                    <div className={styles.title}>{project.title}</ div >
                </div>

                <div className={styles.buttons}>
                    <button onClick={() => { setCreateDevice(true) }}>
                        <AddIcon /><div>Add Device</div>
                    </button>
                    <button onClick={() => { setCreateSensor(true) }}>
                        <AddIcon /> <div>Add Sensor</div>
                    </button>
                    <button onClick={() => { setUpdateProject(true) }}>
                        <CreateIcon /> <div>Edit</div>
                    </button>
                    <button onClick={() => { deleteProject(id, token) }}>
                        <DeleteIcon /> <div>Delete</div>
                    </button>
                </div>
            </div >

            <Pagination
                page={thingsPage}
                paginationInfo={paginationInfo}
                pathname={`/dashboard/project/${id}`}
                setPage={setThingsPageAction}
                onPageChanged={onPageChanged}
            />

            <Things things={things} />

            <CreateDeviceModal isModal={isCreateDevice} setModal={setCreateDevice} />

            <Modal isModal={isUpdateProject} setModal={setUpdateProject} title="Update Project">
                <UpdateProjectForm />
            </Modal>

            <Modal isModal={isCreateSensor} setModal={setCreateSensor} title="Create Sensor">
                <CreateSensorForm />
            </Modal>

        </div>

    );
}));


export const Things = ({ things }) => {
    return (
        <div className={styles.things}>
            {things.map((thing) => {
                if (thing.type === "device") {
                    return <Device thing={thing} key={thing.entity.id} />
                } else if (thing.type === "sensor") {
                    return <Sensor thing={thing} key={thing.entity.id} />
                }
            })}
        </div>
    )
}