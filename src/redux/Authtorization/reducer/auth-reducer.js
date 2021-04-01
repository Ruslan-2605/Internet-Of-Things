
const SET_AUTH_USER_DATA = "SET-AUTH-USER-DATA";
const LOGOUT = "LOGOUT";

export const initialState = {
    username: null,
    token: null,
    tokenValidity: null,
    isAuth: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.data,
            };

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};


