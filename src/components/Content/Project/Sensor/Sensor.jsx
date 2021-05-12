import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../../../redux/Authtorization/selectors/authSelector";
import { deleteSensorThunk } from "../../../../redux/Things/thunks/deleteSensor";
import { updateSensorThunk } from "../../../../redux/Things/thunks/updateSensor";
import styles from "../../../../styles/Device.module.css";
import { MiniChart } from "../../../Charts/MiniChart";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { SensorModal } from "./Modals/SensorModal";
import { Chart } from "../../../Charts/Сhart";


export const Sensor = ({ thing }) => {

    const dispatch = useDispatch();
    const token = useSelector(getUserToken);
    const name = thing.entity.name;
    const id = thing.entity.id;

    const [isSensorModal, setSensorModal] = useState(false);

    return (
        <div className={styles.device}>
            <div className={styles.deviceInfo}>
                <div className={styles.name}>
                    {name}
                </div><hr />
                <button className={styles.openInModal} onClick={() => setSensorModal(true)}>
                    <OpenInNewIcon />
                </button>
                {/* <button onClick={() => dispatch(deleteSensorThunk(id))}>Delete</button>
                <button onClick={() => dispatch(updateSensorThunk({ "name": "NewName" }, token, id))}>Update</button> */}
                <div className={styles.mini_chart}>
                    <MiniChart data={thing.entity.values} />
                </div>
            </div>

            <SensorModal isModal={isSensorModal} setModal={setSensorModal} title={thing.entity.name} thing={thing} />
        </div>
    );
};

