import { setErrors } from "../../../components/utils/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { setProjectsPaginationAction } from "../actions/setProjectsPagination";

export const getProjectsPaginationThunk = (username, token) => {
    debugger
    return async (dispatch) => {
        try {
            const response = await dashboardAPI.getPagination(username, token);
            dispatch(setProjectsPaginationAction(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};
