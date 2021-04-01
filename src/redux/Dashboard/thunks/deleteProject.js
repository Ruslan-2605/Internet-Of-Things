import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { dashboardAPI } from "../../../DAL/dashboardAPI";

export const deleteProjectThunk = (id, token) => {
    return async (dispatch) => {
        try {
            const response = await dashboardAPI.deleteProject(id, token);
            // Если перенесешь кнопку делете, то нужно сделать getProjectsPage
            return response
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};