import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { createProjectAction } from "../actions/createProject";

export const createProjectThunk = (projectForm, token, projectLength, elementPerPage, setError) => {
    return async (dispatch) => {
        try {
            const response = await dashboardAPI.createProject(projectForm, token);
            if (projectLength < elementPerPage) {
                dispatch(createProjectAction(response))
            }
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};