import React from "react";
import ErrorIcon from '@material-ui/icons/Error';
import styles from "../../styles/Form.module.css";

export const ErrorsForm = ({ errors }) => {

    return (
        <>
            {
                Object.keys(errors).slice(0, 1).map((key) => {
                    return (
                        <div className={styles.error}>
                            <p>{errors[key].message}</p>
                            <p><ErrorIcon /></p>
                        </div>
                    )
                })
            }
        </>
    )
}