import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { createSensorAction } from "../actions/createSensor";
import { getUserToken } from "../../Authtorization/selectors/authSelector";
import { getPaginationThings } from "../selectors/thingsSelector";
import { getThingsPaginationThunk } from "./getThingsPagination";

export const createSensorThunk = (sensorForm, setError) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);
            const { size, elementPerPage } = getPaginationThings(state);

            const response = await thingsAPI.createSensor(sensorForm, token);
            if (size < elementPerPage) {
                dispatch(createSensorAction(response))
            }
            dispatch(getThingsPaginationThunk());
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};