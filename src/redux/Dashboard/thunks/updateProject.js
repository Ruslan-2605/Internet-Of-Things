import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { updateProjectAction } from "../actions/updateProject";
import { setViewedProjectAction } from "../actions/setViewedProject";

export const updateProjectThunk = (projectForm, token, id, setError) => {
    return async (dispatch) => {
        try {
            const response = await dashboardAPI.updateProject(projectForm, token, id);
            dispatch(updateProjectAction(response))
            dispatch(setViewedProjectAction(response))
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};