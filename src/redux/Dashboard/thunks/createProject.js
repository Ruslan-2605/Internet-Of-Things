import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { createProjectAction } from "../actions/createProject";

export const createProjectThunk = (projectForm, token, size, elementPerPage, setError) => {
    return async (dispatch) => {
        try {
            const response = await dashboardAPI.createProject(projectForm, token);
            if (size < elementPerPage) {
                dispatch(createProjectAction(response.data))
            }
            return response.status
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};