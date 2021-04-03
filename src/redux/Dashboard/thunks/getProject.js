import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { setViewedProjectAction } from "../actions/setViewedProject";
import { getUserToken } from "../../Authtorization/selectors/authSelector";

export const getProjectThunk = (id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);

            const response = await dashboardAPI.getProject(id, token);
            dispatch(setViewedProjectAction(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};