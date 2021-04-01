import React from "react";
import { useForm } from "react-hook-form";
import styles from "../../styles/Form.module.css";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { setErrorForm } from "../../utils/form-helpers/SetErrorForm";
import { Input } from "../../utils/form-helpers/FormСontrollers";
import { useDispatch } from "react-redux";
import { signUpThunk } from "../../redux/Authtorization/thunks/signUp";

export const SignUp = ({ setSignIn, setSignUp }) => {

    const dispatch = useDispatch();

    const schema = yup.object().shape({
        email: yup
            .string()
            .required("Email is a required field")
            .email("Not valid Email")
            .test('space', 'Email has not space', (value) => {
                return !value.includes(" ")
            }),
        username: yup
            .string()
            .required("Username is a required field")
            .min(5, "Username size is less than 5")
            .max(16, "Username max size is 16")
            .test('space', 'Username has not space', (value) => {
                return !value.includes(" ")
            }),
        password: yup
            .string()
            .required("Password is a required field")
            .min(8, "Password size is less than 8")
            .max(32, "Password max size is 32")
            .test('space', 'Password has not space', (value) => {
                return !value.includes(" ")
            })
    });

    const { register, handleSubmit, errors, setError } = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            "email": "",
            "password": "",
            "username": "",
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = async (authData) => {
        const status = await dispatch(signUpThunk(authData, setError))
        if (status === 200) {
            setSignUp(false);
            setSignIn(true);
        }
    }

    const onError = (e) => {
        setErrorForm(e, setError)
    };

    return (
        <form onSubmit={handleSubmit((authData) => onSubmit(authData), onError)} className={styles.form}>

            <Input register={register} type="text" name="email" placeholder="email" error={errors.email} />

            <Input register={register} type="text" name="username" placeholder="username" error={errors.username} />

            <Input register={register} type="password" name="password" placeholder="password" error={errors.password} />

            <div className={styles.error}>{errors.error && errors.error.message}</div>

            <button className={styles.btn}>Sign Up</button>
        </form >
    );
}
