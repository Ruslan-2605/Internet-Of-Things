import React from "react";
import { Input } from "../../../../../utils/form-helpers/FormСontrollers";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../../../utils/form-helpers/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../../styles/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../../../../redux/Authtorization/selectors/authSelector";
import { getProjectViewed } from "../../../../../redux/Dashboard/selectors/dashboardSelector";
import { getPaginationThings, getThings } from "../../../../../redux/Things/selectors/thingsSelector";
import { createSensorThunk } from "../../../../../redux/Things/thunks/createSensor";
import { ErrorsForm } from "../../../../../utils/form-helpers/ErrorsForm";
import { getThingsPaginationThunk } from "../../../../../redux/Things/thunks/getThingsPagination"

export const CreateSensorForm = () => {

    const dispatch = useDispatch();
    const token = useSelector(getUserToken);
    const project = useSelector(getProjectViewed).id;
    const { elementPerPage, size } = useSelector(getPaginationThings)

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

    const onSubmit = async (sensorForm) => {
        const status = await dispatch(createSensorThunk({ ...sensorForm, "project": project }, token, size, elementPerPage, setError));
        if (status === 200) dispatch(getThingsPaginationThunk(project, token));
    };

    return (
        <form onSubmit={handleSubmit((sensorForm) => onSubmit(sensorForm), onError)}>

            <Input register={register} type="text" placeholder="Name" name="name" error={errors.name} />

            <ErrorsForm errors={errors} />

            <button className={styles.btn}>Create</button>
        </form >
    )
}