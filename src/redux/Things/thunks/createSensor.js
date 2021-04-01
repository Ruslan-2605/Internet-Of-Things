import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { createSensorAction } from "../actions/createSensor";

export const createSensorThunk = (sensorForm, token, thingsLength, setError) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.createSensor(sensorForm, token);
            if (thingsLength < 25) {
                //добавить elementPerPage
                dispatch(createSensorAction(response))
            }
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};