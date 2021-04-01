import React from "react";
import { useFluxForm } from "../../hooks/useFluxForm";
import styles from "../../styles/Form.module.css";

export const Input = ({ register, name, type, value = "", placeholder = null }) => {

    const [state, onChange] = useFluxForm(value);

    return (
        <input className={styles.input}
            ref={register}
            type={type}
            name={name}
            placeholder={placeholder}
            value={state}
            onChange={onChange}
        />
    )
}

export const Textarea = ({ register, name, type, value = "", placeholder = null }) => {

    const [state, onChange] = useFluxForm(value);

    return (
        <textarea className={styles.textarea}
            ref={register}
            type={type}
            name={name}
            placeholder={placeholder}
            value={state}
            onChange={onChange}
        />
    )
}