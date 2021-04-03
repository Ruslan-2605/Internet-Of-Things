import React, { useEffect, useState } from "react";
import styles from "../../../styles/Project.module.css";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActiveThingsPage, getPaginationThings, getThings } from "../../../redux/Things/selectors/thingsSelector";
import { Modal } from "../../../utils/component-helpers/Modal"
import { Device } from "./Device/Device";
import { getProjectViewed } from "../../../redux/Dashboard/selectors/dashboardSelector";
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
import { setInitialStateThingsAction } from "../../../redux/Things/actions/setInitialStateThings";

export const Project = withAuthRedirect(withRouter((props) => {

    // желательно заменить HOC на hook
    let id = props.match.params.projectId;

    const dispatch = useDispatch();
    const history = useHistory();
    const [dispatchCount, setDispatchCount] = useState(0);
    const [isFetchingThings, setFetchingThings] = useState(false);
    const [isFetchingPage, setFetchingPage] = useState(false);
    const page = useSelector(getActiveThingsPage);
    const pagination = useSelector(getPaginationThings);
    const project = useSelector(getProjectViewed)

    useEffect(async () => {
        setFetchingThings(true);
        await dispatch(getProjectThunk(id));
        await dispatch(getThingsPaginationThunk());
        setFetchingThings(false);
        setDispatchCount(1);
    }, [])

    useEffect(() => {
        //сброс state после демонтирования компоненты
        return () => {
            dispatch(setInitialProjectViewedAction());
            dispatch(setInitialStateThingsAction());
        }
    }, [])

    useEffect(async () => {
        if (dispatchCount === 1) {
            setFetchingPage(true);
            await dispatch(getThingsPageThunk())
            setFetchingPage(false)
        };
    }, [page, dispatchCount])


    // Состояние модального окна Create Device 
    const [isCreateDevice, setCreateDevice] = useState(false);

    // Состояние модального окна Update Project
    const [isUpdateProject, setUpdateProject] = useState(false);

    // Состояние модального окна Update Project
    const [isCreateSensor, setCreateSensor] = useState(false);

    const deleteProject = async (id) => {
        const status = await dispatch(deleteProjectThunk(id));
        if (status === 200) {
            history.push("/dashboard")
        }
    }

    const onPageChanged = (page) => {
        dispatch(setThingsPageAction(page))
    }

    if (isFetchingThings) return <div>Loading...</div>

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
                    <button onClick={() => { deleteProject(id) }}>
                        <DeleteIcon /> <div>Delete</div>
                    </button>
                </div>
            </div >

            <Pagination
                page={page}
                pagination={pagination}
                pathname={`/dashboard/project/${id}`}
                setPage={setThingsPageAction}
                onPageChanged={onPageChanged}
            />

            <Things isFetchingPage={isFetchingPage} />

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


export const Things = ({ isFetchingPage }) => {

    const things = useSelector(getThings);

    if (isFetchingPage) return <div>Loading...</div>

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