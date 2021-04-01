import { setErrors } from "../../../components/utils/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { getThingsPageThunk } from "./getThingsPage";

export const deleteSensorThunk = (id, page, project, token) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.deleteSensor(id, token);
            dispatch(getThingsPageThunk(project, page, token))
            return response.status
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};