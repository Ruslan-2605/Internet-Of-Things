import React from "react";
import styles from "../../styles/ErrorsModal.module.css"
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from "react-redux";
import { getErrorsArray } from "../../redux/Errors/selectors/errorsSelector";
import { deleteErrorAction } from "../../redux/Errors/actions/deleteError"

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

    setTimeout(() => dispatch(deleteErrorAction(index)), 5000);

    return (
        <div className={styles.content}>
            <p>{error.message ? error.message : "Some error"}</p>
            <button className={styles.btnClose} onClick={() => dispatch(deleteErrorAction(index))}><CloseIcon /></button>
        </div>
    )
})