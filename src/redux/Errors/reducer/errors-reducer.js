const SET_ERROR = "SET-ERROR";
const DELETE_ERROR = "DELETE-ERROR";
const LOGOUT = "LOGOUT";

const initialState = {
    errors: [],
};

export const errorsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_ERROR:
            return {
                ...state,
                errors: [
                    ...state.errors,
                    action.data,
                ],
            };

        case DELETE_ERROR:
            return {
                ...state,
                errors: state.errors.filter((error) => {
                    return state.errors.indexOf(error, 0) !== action.data;
                })
            };

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};
