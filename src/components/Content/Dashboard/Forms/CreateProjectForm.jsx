import React from "react";
import { Input, Textarea } from "../../../../utils/form-helpers/FormСontrollers";
import { useForm } from "react-hook-form";
import { setErrorForm } from "../../../../utils/form-helpers/SetErrorForm";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import styles from "../../../../styles/Form.module.css";
import { getUserName, getUserToken } from "../../../../redux/Authtorization/selectors/authSelector";
import { createProjectThunk } from "../../../../redux/Dashboard/thunks/createProject";
import { getProjectsPaginationThunk } from "../../../../redux/Dashboard/thunks/getProjectsPagination";
import { useDispatch, useSelector } from "react-redux";
import { getPaginationProjects, getProjects } from "../../../../redux/Dashboard/selectors/dashboardSelector";
import { ErrorsForm } from "../../../../utils/form-helpers/ErrorsForm"

export const CreateProjectForm = (props) => {

    const dispatch = useDispatch();
    const token = useSelector(getUserToken);
    const username = useSelector(getUserName);
    const { elementPerPage, size } = useSelector(getPaginationProjects)

    const schema = yup.object().shape({
        name: yup
            .string()
            .required("Name is a required field")
            .min(5, "Name size is less than 5")
            .max(16, "Name max size is 16")
            .test('space', 'Name has not space', (value) => {
                return !value.includes(" ")
            }),
        title: yup
            .string()
            .max(128, "Title max size is 128")
    });

    const { handleSubmit, register, setError, errors } = useForm({
        reValidateMode: "onSubmit",
        defaultValues: {
            "name": "",
            "title": ""
        },
        resolver: yupResolver(schema),
    })

    const onError = (e) => {
        setErrorForm(e, setError);
    };

    const onSubmit = async (projectData) => {
        const status = await dispatch(createProjectThunk(projectData, token, size, elementPerPage, setError));
        if (status === 200) dispatch(getProjectsPaginationThunk(username, token));
    };

    return (
        <form onSubmit={handleSubmit((projectData) => onSubmit(projectData), onError)}>

            <Input register={register} type="text" placeholder="Name" name="name" />

            <Textarea register={register} type="text" placeholder="Title" name="title" />

            <ErrorsForm errors={errors} />

            <button className={styles.btn}>Create</button>
        </form >
    )
}

