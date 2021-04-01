import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { setSensorPieceValues } from "../../actions/Sensor/setSensorPieceValues";

export const getSensorPieceValuesThunk = (token, fromTime, toTime) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.getPiece(token, fromTime, toTime);
            dispatch(setSensorPieceValues(response));
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};