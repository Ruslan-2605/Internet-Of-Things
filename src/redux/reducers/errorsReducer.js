const SET_ERROR = "SET-ERROR";
const DELETE_ERROR = "DELETE-ERROR";
const LOGOUT = "LOGOUT";

const initialState = {
    errors: [
        // { "status": "info", "time": "123", "message": "Error 1", "body": { "state": "on" } },
        // { "status": "info", "time": "1234", "message": "Error 2", "body": { "state": "on" } },
        // { "status": "info", "time": "1235", "message": "Error 3", "body": { "state": "on" } },
        // { "status": "info", "time": "1236", "message": "Error 4", "body": { "state": "on" } }
    ],
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

//Action
export const setError = (error) => {
    return {
        type: "SET-ERROR",
        data: error,
    };
};

export const deleteError = (index) => {
    return {
        type: "DELETE-ERROR",
        data: index,
    };
};


//Action Creator

export const setErrorActionCreator = (error) => {
    return (dispatch) => {
        dispatch(setError(error))
    }
}

export const deleteErrorActionCreator = (index) => {
    return (dispatch) => {
        dispatch(deleteError(index))
    }
}
