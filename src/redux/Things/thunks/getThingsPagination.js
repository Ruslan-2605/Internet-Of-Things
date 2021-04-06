import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { setThingsPaginationAction } from "../actions/setThingsPagination"
import { getProjectViewedId } from "../../Dashboard/selectors/dashboardSelector";
import { getUserToken } from "../../Authtorization/selectors/authSelector";

export const getThingsPaginationThunk = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const project = getProjectViewedId(state);
            const token = getUserToken(state);

            const response = await thingsAPI.getPaginationInfo(project, token);
            dispatch(setThingsPaginationAction(response))
            return response.pages
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};