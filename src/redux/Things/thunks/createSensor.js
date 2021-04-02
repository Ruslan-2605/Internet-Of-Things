import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { createSensorAction } from "../actions/createSensor";

export const createSensorThunk = (sensorForm, token, size, elementPerPage, setError) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.createSensor(sensorForm, token);
            if (size < elementPerPage) {
                dispatch(createSensorAction(response.data))
            }
            return response.status
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};