import React from "react";
import { Input } from "../../../../../utils/form-helpers/FormСontrollers";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../../../utils/form-helpers/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../../styles/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getProjectViewed } from "../../../../../redux/Dashboard/selectors/dashboardSelector";
import { createSensorThunk } from "../../../../../redux/Things/thunks/createSensor";
import { ErrorsForm } from "../../../../../utils/form-helpers/ErrorsForm";

export const CreateSensorForm = () => {

    const dispatch = useDispatch();
    const project = useSelector(getProjectViewed).id;

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is a required field")
            .min(5, "Name size is less than 5")
            .max(16, "Name max size is 16")
            .test('space', 'States has not space', (value) => {
                return !value.includes(" ")
            }),
    });

    const { handleSubmit, register, setError, errors } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            "name": "",
        },
        resolver: yupResolver(schema),
    })

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    const onSubmit = (sensorForm) => {
        dispatch(createSensorThunk({ ...sensorForm, "project": project }, setError));
    };

    return (
        <form onSubmit={handleSubmit((sensorForm) => onSubmit(sensorForm), onError)}>

            <Input register={register} type="text" placeholder="Name" name="name" error={errors.name} />

            <ErrorsForm errors={errors} />

            <button className={styles.btn}>Create</button>
        </form >
    )
}