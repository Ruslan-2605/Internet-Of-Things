import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { setThingsPaginationAction } from "../actions/setThingsPagination"

export const getThingsPaginationThunk = (project, token) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.getPaginationInfo(project, token);
            dispatch(setThingsPaginationAction(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};