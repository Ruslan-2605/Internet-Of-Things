import { setErrors } from "../../../components/utils/setErrors";
import { authAPI } from "../../../DAL/authAPI";
import { setAuthUserDataAction } from "../actions/setAuthUserData";

export const signInThunk = (authData, setError) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.signIn(authData);
            dispatch(setAuthUserDataAction({ ...response.data, isAuth: true }))
            return response.status;
        } catch (error) {
            setErrors(error, dispatch, setError);
        }
    };
};