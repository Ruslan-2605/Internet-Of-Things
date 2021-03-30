import React from "react";
import styles from "../../styles/DeviceModal.module.css";
import { getLastActive } from "./getLastActive";

export const LastActive = ({ activity }) => {

    const lastSeen = getLastActive(activity)

    return (
        <div className={styles.lastSeen}>
            {lastSeen}
        </div>
    );
}
