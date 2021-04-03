import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { setThingsAction } from "../actions/setThings";
import { getUserToken } from "../../Authtorization/selectors/authSelector";
import { getActiveThingsPage } from "../selectors/thingsSelector";
import { getProjectViewedId } from "../../Dashboard/selectors/dashboardSelector";

export const getThingsPageThunk = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const page = getActiveThingsPage(state);
            const token = getUserToken(state);
            const project = getProjectViewedId(state);

            const response = await thingsAPI.getThings(project, page, token);
            dispatch(setThingsAction(response))
        } catch (error) {
            setErrors(error.response.data)
        }
    };
};