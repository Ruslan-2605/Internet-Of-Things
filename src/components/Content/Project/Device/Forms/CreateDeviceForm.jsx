import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../../styles/DeviceForm.module.css";
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../../../../redux/selectors/authSelector";
import { getThings } from "../../../../../redux/selectors/thingsSelector";
import { getProjectViewed } from "../../../../../redux/selectors/projectsSelector";
import { createDeviceThunkCreator } from "../../../../../redux/reducers/thingsReducer";
import { deviceStateValidation } from "../../../../utils/deviceStateValidation";
import { getErrorDeviceForm } from "../../../../utils/getErrorDeviceForm";

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
    const thingsLength = useSelector(getThings).length;
    const project = useSelector(getProjectViewed).id;

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
        dispatch(createDeviceThunkCreator({ ...deviceForm, "project": project, "name": form.name }, token, thingsLength))
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

                <button className={styles.submitBtn} type="submit">Create</button>

            </form >

            {
                getErrorDeviceForm(errors)
            }

        </>
    )
}

