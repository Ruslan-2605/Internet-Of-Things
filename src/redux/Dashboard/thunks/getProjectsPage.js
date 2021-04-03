import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { setProjectsAction } from "../actions/setProjects";
import { getUserName, getUserToken } from "../../Authtorization/selectors/authSelector";
import { getActiveProjectsPage } from "../selectors/dashboardSelector";

export const getProjectsPageThunk = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const username = getUserName(state);
            const token = getUserToken(state);
            const page = getActiveProjectsPage(state);

            const response = await dashboardAPI.getProjectsPage(username, token, page);
            dispatch(setProjectsAction(response));
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};