import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { getProjectViewedId } from "../../Dashboard/selectors/dashboardSelector";
import { getUserToken } from "../../Authtorization/selectors/authSelector";
import { getThingsPaginationThunk } from "./getThingsPagination";
import { getThingsPageThunk } from "./getThingsPage";

export const deleteSensorThunk = (id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);

            const response = await thingsAPI.deleteSensor(id, token);
            dispatch(getThingsPaginationThunk());
            dispatch(getThingsPageThunk());
            return response.status
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};