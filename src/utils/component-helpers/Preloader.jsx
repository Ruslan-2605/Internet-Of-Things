import React from 'react';
import styles from "../../styles/Preloader.module.css";
import preloader from "../../images/preloader.gif"

export const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={preloader} alt="Loading..." />
        </div>
    )
}