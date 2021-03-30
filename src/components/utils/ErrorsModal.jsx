import React, { useState } from "react";
import styles from "../../styles/ErrorsModal.module.css"
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from "react-redux";
import { getErrorsArray } from "../../redux/selectors/errorsSelector";
import { deleteErrorActionCreator } from "../../redux/reducers/errorsReducer"

export const ErrorsModal = () => {

    const errors = useSelector(getErrorsArray);

    return (
        <div className={errors ? styles.modalWrapper + " " + styles.open : styles.modalWrapper + " " + styles.close} >
            {
                errors.map((error, key) => {
                    return <Error key={key} index={key} error={error} />
                })
            }
        </div>
    );
};

const Error = React.memo(({ error, index }) => {

    const dispatch = useDispatch();

    setTimeout(() => dispatch(deleteErrorActionCreator(index)), 5000);

    return (
        <div className={styles.content}>
            <p>{error.message ? error.message : "Some error"}</p>
            <button className={styles.btnClose} onClick={() => dispatch(deleteErrorActionCreator(index))}><CloseIcon /></button>
        </div>
    )
})