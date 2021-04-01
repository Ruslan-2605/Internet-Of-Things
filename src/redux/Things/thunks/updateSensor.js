import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { updateSensorAction } from "../actions/updateSensor";

export const updateSensorThunk = (sensorForm, token, id) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.updateSensor(sensorForm, token, id);
            dispatch(updateSensorAction(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};