import { setErrorActionCreator } from "../../redux/reducers/errorsReducer"

export const setErrors = (error, dispatch, setError = null,) => {
    if (setError === null && error.response && error.response.data) {
        dispatch(setErrorActionCreator(error.response.data))
    } else if (setError !== null && error.response && error.response.data) {
        if (error.response.status === 400) {
            setError(error.response.data.field, {
                type: error.response.status,
                message: error.response.data.message
            })
        } else {
            dispatch(setErrorActionCreator(error.response.data))
        }
    }
}
