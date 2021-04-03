import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../../../utils/form-helpers/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../../styles/DeviceForm.module.css";
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../../../../redux/Authtorization/selectors/authSelector";
import { getPaginationThings } from "../../../../../redux/Things/selectors/thingsSelector";
import { getProjectViewed } from "../../../../../redux/Dashboard/selectors/dashboardSelector";
import { deviceStateValidation } from "../../../../../utils/form-helpers/deviceStateValidation";
import { ErrorsForm } from "../../../../../utils/form-helpers/ErrorsForm.jsx";
import { createDeviceThunk } from "../../../../../redux/Things/thunks/createDevice";
import { useFluxForm } from "../../../../../hooks/useFluxForm"

export const CreateDeviceForm = ({ states, setStates, defaultState }) => {

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
    const token = useSelector(getUserToken);
    const project = useSelector(getProjectViewed).id;
    const { elementPerPage, size } = useSelector(getPaginationThings);

    const [name, onChangeName] = useFluxForm("");
    const [state, onChangeState] = useFluxForm("");

    const [deviceForm, setDeviceForm] = useState({ "states": states, "state": defaultState, "name": "" });
    useEffect(() => setDeviceForm(
        { ...deviceForm, "states": states, "state": defaultState }),
        [states, defaultState]);

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    const onClick = () => {
        const value = getValues('state')
        clearErrors("state")
        deviceStateValidation(value, states, setStates, setError)
    };

    const onSubmit = (form) => {
        dispatch(createDeviceThunk({ ...deviceForm, "project": project, "name": form.name }, setError));
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

                <button className={styles.submitBtn} type="submit">Create</button>

            </form >


            <ErrorsForm errors={errors} />


        </>
    )
}

