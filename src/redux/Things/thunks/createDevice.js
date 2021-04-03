import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { createDeviceAction } from "../actions/createDevice";
import { getUserToken } from "../../Authtorization/selectors/authSelector";
import { getPaginationThings } from "../selectors/thingsSelector";
import { getThingsPaginationThunk } from "./getThingsPagination";

export const createDeviceThunk = (deviceForm, setError) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);
            const { size, elementPerPage } = getPaginationThings(state);

            const response = await thingsAPI.createDevice(deviceForm, token);
            if (size < elementPerPage) {
                dispatch(createDeviceAction(response))
            }
            dispatch(getThingsPaginationThunk());
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};