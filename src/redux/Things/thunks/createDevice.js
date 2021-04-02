import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { createDeviceAction } from "../actions/createDevice";

export const createDeviceThunk = (deviceForm, token, size, elementPerPage, setError) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.createDevice(deviceForm, token);
            if (size < elementPerPage) {
                dispatch(createDeviceAction(response.data))
            }
            return response.status
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};