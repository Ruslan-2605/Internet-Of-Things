import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { setThingsAction } from "../actions/setThings";

export const getThingsPageThunk = (id, page, token) => {
    return async (dispatch) => {
        try {
            //id of project
            const response = await thingsAPI.getThings(id, page, token);
            dispatch(setThingsAction(response))
        } catch (error) {
            dispatch(setErrors(error.response.data))
        }
    };
};