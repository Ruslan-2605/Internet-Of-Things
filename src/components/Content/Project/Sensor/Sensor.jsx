import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../../../redux/Authtorization/selectors/authSelector";
import { deleteSensorThunk } from "../../../../redux/Things/thunks/deleteSensor";
import { updateSensorThunk } from "../../../../redux/Things/thunks/updateSensor";
import styles from "../../../../styles/Device.module.css";


export const Sensor = ({ thing }) => {

    const dispatch = useDispatch();
    const token = useSelector(getUserToken);
    const name = thing.entity.name;
    const id = thing.entity.id;

    return (
        <div className={styles.device}>
            <div className={styles.deviceInfo}>
                <div className={styles.name}>
                    {name}
                </div><hr />
                <button onClick={() => dispatch(deleteSensorThunk(id))}>Delete</button>
                <button onClick={() => dispatch(updateSensorThunk({ "name": "NewName" }, token, id))}>Update</button>
            </div>
        </div>
    );
};

