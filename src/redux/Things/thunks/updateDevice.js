import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { updateDeviceAction } from "../actions/updateDevice";
import { getUserToken } from "../../Authtorization/selectors/authSelector"

export const updateDeviceThunk = (deviceForm, id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);

            const response = await thingsAPI.updateDevice(deviceForm, token, id);
            dispatch(updateDeviceAction(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};