import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { setProjectsPaginationAction } from "../actions/setProjectsPagination";
import { getUserName, getUserToken } from "../../Authtorization/selectors/authSelector";

export const getProjectsPaginationThunk = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const username = getUserName(state);
            const token = getUserToken(state);

            const response = await dashboardAPI.getPagination(username, token);
            dispatch(setProjectsPaginationAction(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};
