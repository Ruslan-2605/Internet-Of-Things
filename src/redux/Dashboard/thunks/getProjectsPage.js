import { setErrors } from "../../../components/utils/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { setProjectsAction } from "../actions/setProjects";

export const getProjectsPageThunk = (username, token, page) => {
    return async (dispatch) => {
        try {
            const response = await dashboardAPI.getProjectsPage(username, token, page);
            dispatch(setProjectsAction(response));
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};