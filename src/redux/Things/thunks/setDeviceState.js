import { setErrors } from "../../../components/utils/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { setDeviceStateAction } from "../actions/setDeviceState";

export const setDeviceStateThunk = (state, token) => {
    return async (dispatch) => {
        try {
            // token of device
            const response = await thingsAPI.setDeviceState(state, token);
            if (response.status === 200) {
                dispatch(setDeviceStateAction(response.data.body.state, token))
            }
            return response.status
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};