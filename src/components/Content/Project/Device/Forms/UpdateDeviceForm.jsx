import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../../../utils/form-helpers/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../../styles/DeviceForm.module.css";
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../../../../redux/Authtorization/selectors/authSelector";
import { deviceStateValidation } from "../../../../../utils/form-helpers/deviceStateValidation";
import { ErrorsForm } from "../../../../../utils/form-helpers/ErrorsForm.jsx";
import { updateDeviceThunk } from "../../../../../redux/Things/thunks/updateDevice";
import { useFluxForm } from "../../../../../hooks/useFluxForm"

export const UpdateDeviceForm = ({ states, setStates, defaultName = "", id }) => {

    const schema = yup.object().shape({
        state: yup
            .string(),
        name: yup
            .string()
            .required("Name is a required field")
            .min(2, "Name size is less than 2")
            .max(16, "Name max size is 16"),

    });

    const { handleSubmit, register, setError, getValues, clearErrors, errors } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            "name": "",
            "state": "",
        },
        resolver: yupResolver(schema),
    })

    const dispatch = useDispatch();
    const userToken = useSelector(getUserToken);
    const [name, onChangeName] = useFluxForm(defaultName);
    const [state, onChangeState] = useFluxForm("");

    const [deviceForm, setDeviceForm] = useState({ "states": states, "name": defaultName })
    useEffect(() => setDeviceForm({ ...deviceForm, "states": states }), [states])

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    const onClick = () => {
        const value = getValues('state')
        clearErrors("state")
        deviceStateValidation(value, states, setStates, setError)
    };

    const onSubmit = (form) => {
        dispatch(updateDeviceThunk({ ...deviceForm, "name": form.name }, id))
    }

    return (
        <>
            <form className={styles.udpateForm} onSubmit={handleSubmit((form) => onSubmit(form), onError)}>

                <input
                    className={styles.updateNameInput}
                    ref={register}
                    name="name"
                    placeholder="Write name"
                    value={name}
                    onChange={onChangeName}
                />

                {
                    states.length < 10 &&
                    <div className={styles.addStateForm}>
                        <input
                            className={styles.addInput}
                            ref={register}
                            name="state"
                            placeholder="Add new state"
                            value={state}
                            onChange={onChangeState}
                        />
                        <button className={styles.addIcon} type="button" onClick={onClick}><AddIcon /></button>
                    </div>

                }

                <button className={styles.submitBtn} type="submit">Update</button>

            </form >

            <ErrorsForm errors={errors} />

        </>
    )
}
