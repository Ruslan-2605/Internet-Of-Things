import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSensorThunkCreator, updateSensorThunkCreator } from "../../../../redux/reducers/thingsReducer";
import { getUserToken } from "../../../../redux/selectors/authSelector";
import { getActiveProjectsPage, getProjectViewed } from "../../../../redux/selectors/projectsSelector";
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
                <button onClick={() => dispatch(deleteSensorThunkCreator(id, page, project, token))}>Delete</button>
                <button onClick={() => dispatch(updateSensorThunkCreator({ "name": "rus" }, token, id))}>Update</button>
            </div>
        </div>
    );
};

