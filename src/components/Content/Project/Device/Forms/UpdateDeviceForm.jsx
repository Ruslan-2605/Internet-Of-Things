import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../../styles/DeviceForm.module.css";
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from "react-redux";
import { updateDeviceThunkCreator } from "../../../../../redux/reducers/thingsReducer";
import { getUserToken } from "../../../../../redux/selectors/authSelector";
import { deviceStateValidation } from "../../../../utils/deviceStateValidation";
import { getErrorDeviceForm } from "../../../../utils/getErrorDeviceForm";

export const UpdateDeviceForm = ({ states, setStates, name = "", id }) => {

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
            "name": name,
            "state": "",
        },
        resolver: yupResolver(schema),
    })

    const dispatch = useDispatch();
    const userToken = useSelector(getUserToken);

    const [deviceForm, setDeviceForm] = useState({ "states": states, "name": name })
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
        dispatch(updateDeviceThunkCreator({ ...deviceForm, "name": form.name }, userToken, id))
    }

    return (
        <>
            <form className={styles.udpateForm} onSubmit={handleSubmit((form) => onSubmit(form), onError)}>

                <input
                    className={styles.updateNameInput}
                    ref={register}
                    name="name"
                    placeholder="Write name"
                />

                {
                    states.length < 10 &&
                    <div className={styles.addStateForm}>
                        <input
                            className={styles.addInput}
                            ref={register}
                            name="state"
                            placeholder="Add new state"
                        />
                        <button className={styles.addIcon} type="button" onClick={onClick}><AddIcon /></button>
                    </div>

                }

                <button className={styles.submitBtn} type="submit">Update</button>

            </form >
            {
                getErrorDeviceForm(errors)
            }
        </>
    )
}
