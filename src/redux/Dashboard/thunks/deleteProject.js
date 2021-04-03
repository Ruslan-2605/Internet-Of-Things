import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";
import { getUserToken } from "../../Authtorization/selectors/authSelector";

export const deleteProjectThunk = (id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);
            const response = await dashboardAPI.deleteProject(id, token);
            return response.status
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};