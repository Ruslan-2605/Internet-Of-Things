import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { authAPI } from "../../../DAL/authAPI";
import { setAuthUserDataAction } from "../actions/setAuthUserData";

export const signUpThunk = (authData, setError) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.signUp(authData);
            dispatch(setAuthUserDataAction(response.data));
            return response.status
        } catch (error) {
            setErrors(error, dispatch, setError);
        }

    };
};