import { setErrors } from "../../../utils/redux-helpers/setErrors";
import { thingsAPI } from "../../../DAL/thingsAPI";
import { setSensorPieceValuesAction } from "../actions/setSensorPieceValues";

export const getSensorPieceValuesThunk = (token, fromTime, toTime) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.getPiece(token, fromTime, toTime);
            dispatch(setSensorPieceValuesAction(response));
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};