import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { setSensorPieceValues } from "../../actions/Sensor/setSensorPieceValues";
import { getUserToken } from "../../Authtorization/selectors/authSelector";

export const getSensorPieceValuesThunk = (fromTime, toTime) => {
    return async (dispatch, getState) => {
        try {
            const state = getState();
            const token = getUserToken(state);

            const response = await thingsAPI.getPiece(token, fromTime, toTime);
            dispatch(setSensorPieceValues(response));
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};