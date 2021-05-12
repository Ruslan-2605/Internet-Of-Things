import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import styles from "../../../../../styles/SensorModal.module.css"
import { useDispatch } from "react-redux";
import { getSensorPieceValuesThunk } from "../../../../../redux/Things/thunks/getSensorPieceValues";

export const DatePickerForm = ({ token }) => {

    const dispatch = useDispatch();

    const [fromTime, setFromTime] = useState(new Date());
    const [toTime, setToTime] = useState(new Date());

    const onSubmit = () => {
        dispatch(getSensorPieceValuesThunk(
            token,
            new Date(fromTime).getTime(),
            new Date(toTime).getTime())
        )
    };

    return (
        <div className={styles.datePickerWrapper}>
            <div className={styles.datePicker}>
                <DatePicker
                    selected={fromTime}
                    onChange={date => setFromTime(date)}
                    dateFormat="dd.MM.yyyy"
                    maxDate={new Date()}
                />

                <DatePicker
                    selected={toTime}
                    onChange={date => setToTime(date)}
                    dateFormat="dd.MM.yyyy"
                    maxDate={new Date()}
                />
            </div>
            <button className={styles.btnChart} onClick={onSubmit}>Find</button>
        </div>
    )
}