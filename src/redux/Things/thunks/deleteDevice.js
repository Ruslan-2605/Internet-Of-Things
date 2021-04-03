import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { getThingsPaginationThunk } from "./getThingsPagination";
import { getProjectViewedId } from "../../Dashboard/selectors/dashboardSelector";
import { getUserToken } from "../../Authtorization/selectors/authSelector";
import { getThingsPageThunk } from "./getThingsPage";

export const deleteDeviceThunk = (id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);

            const response = await thingsAPI.deleteDevice(id, token);
            dispatch(getThingsPaginationThunk())
            dispatch(getThingsPageThunk())
            return response.status
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};