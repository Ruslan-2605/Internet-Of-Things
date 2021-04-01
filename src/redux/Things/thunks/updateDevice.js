import { setErrors } from "../../../components/utils/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { updateDeviceAction } from "../actions/updateDevice";

export const updateDeviceThunk = (deviceForm, token, id) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.updateDevice(deviceForm, token, id);
            dispatch(updateDeviceAction(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};