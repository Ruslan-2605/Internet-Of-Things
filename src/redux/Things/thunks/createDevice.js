import { setErrors } from "../../../components/utils/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { createDeviceAction } from "../actions/createDevice";

export const createDeviceThunk = (deviceForm, token, thingsLength) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.createDevice(deviceForm, token);
            if (thingsLength < 25) {
                //добавить elementPerPage
                dispatch(createDeviceAction(response))
            }
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};