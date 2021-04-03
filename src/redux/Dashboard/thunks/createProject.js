import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { createProjectAction } from "../actions/createProject";
import { getUserToken } from "../../Authtorization/selectors/authSelector";
import { getPaginationProjects } from "../selectors/dashboardSelector";
import { getProjectsPaginationThunk } from "./getProjectsPagination";

export const createProjectThunk = (projectForm, setError) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);
            const { size, elementPerPage } = getPaginationProjects(state);

            const response = await dashboardAPI.createProject(projectForm, token);
            if (size < elementPerPage) {
                dispatch(createProjectAction(response.data))
            }
            dispatch(getProjectsPaginationThunk());
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};