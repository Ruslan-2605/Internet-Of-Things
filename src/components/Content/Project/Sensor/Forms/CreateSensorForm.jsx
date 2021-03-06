import React from "react";
import { Input } from "../../../../utils/FormСontrollers";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../../utils/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../../styles/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken } from "../../../../../redux/selectors/authSelector";
import { getProjectViewed } from "../../../../../redux/selectors/projectsSelector";
import { createSensorThunkCreator } from "../../../../../redux/reducers/thingsReducer";
import { getThings } from "../../../../../redux/selectors/thingsSelector";

export const CreateSensorForm = (props) => {

    const dispatch = useDispatch();
    const token = useSelector(getUserToken);
    const project = useSelector(getProjectViewed).id;
    const thingsLength = useSelector(getThings).length;

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
        dispatch(createSensorThunkCreator({ ...sensorForm, "project": project }, token, thingsLength, setError));
    };

    return (
        <form onSubmit={handleSubmit((sensorForm) => onSubmit(sensorForm), onError)}>

            <Input register={register} type="text" placeholder="Name" name="name" error={errors.name} />

            <button className={styles.btn}>Create</button>
        </form >
    )
}