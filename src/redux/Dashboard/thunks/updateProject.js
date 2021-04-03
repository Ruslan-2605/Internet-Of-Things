import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { updateProjectAction } from "../actions/updateProject";
import { setViewedProjectAction } from "../actions/setViewedProject";
import { getProjectViewedId } from "../selectors/dashboardSelector";
import { getUserToken } from "../../Authtorization/selectors/authSelector";

export const updateProjectThunk = (projectForm, setError) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const project = getProjectViewedId(state);
            const token = getUserToken(state);

            const response = await dashboardAPI.updateProject(projectForm, project, token);
            dispatch(updateProjectAction(response))
            dispatch(setViewedProjectAction(response))
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};