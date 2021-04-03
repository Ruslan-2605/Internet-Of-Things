import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { updateSensorAction } from "../actions/updateSensor";
import { getUserToken } from "../../Authtorization/selectors/authSelector"

export const updateSensorThunk = (sensorForm, token, id) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);

            const response = await thingsAPI.updateSensor(sensorForm, token, id);
            dispatch(updateSensorAction(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};