import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { setViewedProjectAction } from "../actions/setViewedProject";

export const getProjectThunk = (id, token) => {
    return async (dispatch) => {
        try {
            const response = await dashboardAPI.getProject(id, token);
            dispatch(setViewedProjectAction(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};