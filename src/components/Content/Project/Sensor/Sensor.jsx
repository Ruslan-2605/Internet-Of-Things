import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../../../redux/Authtorization/selectors/authSelector";
import { getActiveProjectsPage, getProjectViewed } from "../../../../redux/Dashboard/selectors/dashboardSelector";
import { deleteSensorThunk } from "../../../../redux/Things/thunks/deleteSensor";
import { updateSensorThunk } from "../../../../redux/Things/thunks/updateSensor";
import styles from "../../../../styles/Device.module.css";


export const Sensor = ({ thing }) => {

    const dispatch = useDispatch();
    const project = useSelector(getProjectViewed).id;
    const page = useSelector(getActiveProjectsPage);
    const token = useSelector(getUserToken);
    const name = thing.entity.name;
    const id = thing.entity.id;

    return (
        <div className={styles.device}>
            <div className={styles.deviceInfo}>
                <div className={styles.name}>
                    {name}
                </div><hr />
                <button onClick={() => dispatch(deleteSensorThunk(id, page, project, token))}>Delete</button>
                <button onClick={() => dispatch(updateSensorThunk({ "name": "NewName" }, token, id))}>Update</button>
            </div>
        </div>
    );
};

