import React, { useEffect, useState } from "react";
import styles from "../../../styles/Project.module.css";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActiveThingsPage, getPaginationThingsInfo, getThings } from "../../../redux/selectors/thingsSelector";
import { getUserToken } from "../../../redux/selectors/authSelector";
import { getPaginationThingsInfoThunkCreator, getThingsPageThunkCreator, setInitialStateActionCreator, setPageThingsActionCreator } from "../../../redux/reducers/thingsReducer";
import { Modal } from "../../utils/Modal"
import { Device } from "./Device/Device";
import { deleteProjectThunkCreator, getProjectThunkCreator, setInitialProjectViewedActionCreator } from "../../../redux/reducers/projectsReducer";
import { getProjectViewed } from "../../../redux/selectors/projectsSelector";
import SettingsIcon from '@material-ui/icons/Settings';
import { UpdateProjectForm } from "../Dashboard/Forms/UpdateProjectForm";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { withAuthRedirect } from "../../../HOC/withAuthRedirect";
import { CreateDeviceModal } from "./Device/Modals/CreateDeviceModal";
import { Pagination } from "../../utils/Pagination";
import { CreateSensorForm } from "../Project/Sensor/Forms/CreateSensorForm";
import { setError } from "../../../redux/reducers/errorsReducer";

export const Project = withAuthRedirect(withRouter((props) => {

    // желательно заменить HOC на hook
    let id = props.match.params.projectId;

    const dispatch = useDispatch();
    const thingsPage = useSelector(getActiveThingsPage);
    const token = useSelector(getUserToken);
    const things = useSelector(getThings);
    const project = useSelector(getProjectViewed);
    const paginationInfo = useSelector(getPaginationThingsInfo);

    useEffect(() => {
        dispatch(getPaginationThingsInfoThunkCreator(id, token));
        dispatch(getProjectThunkCreator(id, token));
    }, [])

    useEffect(() => {
        if (thingsPage > paginationInfo.pages && thingsPage !== 1) {
            dispatch(setError({ "status": 400, "message": "Not exist page" }));
            if (paginationInfo.pages > 0) {
                dispatch(setPageThingsActionCreator(1));
            }
        }
        else if (paginationInfo.pages > 0) {
            dispatch(getThingsPageThunkCreator(id, thingsPage, token));
        }
    }, [id, thingsPage, token, paginationInfo])

    useEffect(() => {
        //set initialState после демонтирования компоненты 
        return () => {
            dispatch(setInitialProjectViewedActionCreator())
            dispatch(setInitialStateActionCreator())
        }
    }, [])

    // Состояние модального окна Create Device 
    const [isCreateDevice, setCreateDevice] = useState(false);

    // Состояние модального окна Update Project
    const [isUpdateProject, setUpdateProject] = useState(false);

    // Состояние модального окна Update Project
    const [isCreateSensor, setCreateSensor] = useState(false);

    const deleteProject = (id, token) => {
        dispatch(deleteProjectThunkCreator(id, token))
    }

    const onPageChanged = (page) => {
        dispatch(setPageThingsActionCreator(page))
    }

    return (

        <div className={styles.project}>

            <div className={styles.projectHeader}>
                <div className={styles.name}>{project.name}</div>
                <nav>
                    <div className={styles.dropdown}>
                        <div className={styles.icon}>
                            <SettingsIcon />
                            <div>Settings</div>
                        </div>
                        <div className={styles.dropdownMenu}>
                            <ul className={styles.submenu}>

                                <li>
                                    <button onClick={() => {
                                        setCreateDevice(true)
                                    }}>
                                        <AddIcon /><div>Add Device</div>
                                    </button>
                                </li>

                                <li>
                                    <button onClick={() => {
                                        setCreateSensor(true)
                                    }}>
                                        <AddIcon /> <div>Add Sensor</div>
                                    </button>
                                </li>

                                <li>
                                    <button onClick={() => {
                                        setUpdateProject(true)
                                    }}>
                                        <CreateIcon /> <div>Edit</div>
                                    </button>
                                </li>

                                <li>
                                    <button onClick={() => {
                                        deleteProject(id, token)
                                    }}>
                                        <DeleteIcon /> <div>Delete</div>
                                    </button>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className={styles.title}>{project.title}</ div >

            <Pagination
                page={thingsPage}
                paginationInfo={paginationInfo}
                pathname={`/dashboard/project/${id}`}
                setPage={setPageThingsActionCreator}
                onPageChanged={onPageChanged}
            />

            <div className={styles.things}>{things.map((thing) => {
                if (thing.entity === "device") {
                    return <Device thing={thing} key={thing.entity.id} />
                } else if (thing.entity === "sensor") {
                    //sensor
                    console.log("sensor founded")
                }
            })}
            </div>

            <CreateDeviceModal isModal={isCreateDevice} setModal={setCreateDevice} />

            <Modal isModal={isUpdateProject} setModal={setUpdateProject} title="Update Project">
                <UpdateProjectForm />
            </Modal>

            <Modal isModal={isCreateSensor} setModal={setCreateSensor} title="Create Sensor">
                <CreateSensorForm />
            </Modal>
        </div >

    );
}));



