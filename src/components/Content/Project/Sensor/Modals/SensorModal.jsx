import React from "react";
import styles from "../../../../../styles/SensorModal.module.css"
import CloseIcon from '@material-ui/icons/Close';
import { Chart } from "../../../../Charts/Сhart";
import { DatePickerForm } from "../Forms/DatePickerForm";

export const SensorModal = (props) => {

    const { isModal, setModal, title, thing } = props;

    return (
        <div className={isModal ? styles.modalWrapper + " " + styles.open : styles.modalWrapper + " " + styles.close} >
            <div className={styles.modalBody}>
                <button className={styles.btnClose} onClick={() => setModal(false)}><CloseIcon /></button>
                <div className={styles.title}>{title}</div>
                <div className={styles.content}>
                    <DatePickerForm token={thing.entity.token} />
                    <Chart />
                </div>
            </div>
        </div>
    );
};


