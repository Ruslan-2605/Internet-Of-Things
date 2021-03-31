import { setErrors } from "../../components/utils/setErrors";
import { thingsAPI } from "../../DAL/thingsAPI";
import { setErrorActionCreator } from "./errorsReducer";

const SET_THINGS = "SET-THINGS";
const CREATE_DEVICE = "CREATE-DEVICE";
const UPDATE_DEVICE = "UPDATE-DEVICE";
const SET_PAGE_THINGS = "SET-PAGE-THINGS";
const SET_STATE_DEVICE = "SET-STATE-DEVICE";
const SET_INITIAL_STATE = "SET-INITIAL-STATE";
const SET_PAGINATION_THINGS_INFO = "SET-PAGINATION-THINGS-INFO";
const CREATE_SENSOR = "CREATE-SENSOR";
const UPDATE_SENSOR = "UPDATE-SENSOR";
const SET_SENSOR_PIECE_VALUES = "SET-SENSOR-PIECE-VALUES";
const LOGOUT = "LOGOUT";

const initialState = {
    things: [],
    page: 1,
    paginationInfo: {},
    sensorPieceValues: []
};

export const thingsReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_THINGS:
            return {
                ...state,
                things: action.data,
            };

        case CREATE_DEVICE:
            return {
                ...state,
                things: [
                    ...state.things,
                    {
                        "type": "device",
                        "entity": {
                            ...action.data
                        }
                    },
                ],
            };

        case UPDATE_DEVICE:
            return {
                ...state,
                things: state.things.map((thing) => {
                    if (thing.entity.id === action.data.id && thing.type === "device") {
                        return { ...thing, ...{ "entity": { ...action.data } } }
                    } else {
                        return thing;
                    }
                }
                )
            }


        case SET_PAGE_THINGS:
            return {
                ...state,
                page: action.data,
            };

        case SET_STATE_DEVICE:
            return {
                ...state,
                things: state.things.map((thing) => {
                    switch (thing.type === "device") {
                        case thing.entity.token === action.token:
                            return { ...thing, ...{ "entity": { ...thing.entity, "state": action.state } } }
                        default:
                            return thing;
                    }
                })
            };

        case SET_PAGINATION_THINGS_INFO:
            return {
                ...state,
                paginationInfo: action.data,
            };

        case CREATE_SENSOR:
            return {
                ...state,
                things: [
                    ...state.things,
                    {
                        "type": "sensor",
                        "entity": {
                            ...action.data
                        }
                    },
                ],
            };

        case UPDATE_SENSOR:
            return {
                ...state,
                things: state.things.map((thing) => {
                    if (thing.entity.id === action.data.id && thing.type === "sensor") {
                        return { ...thing, ...{ "entity": { ...action.data } } }
                    } else {
                        return thing;
                    }
                }
                )
            }

        case SET_SENSOR_PIECE_VALUES:
            return {
                ...state,
                sensorPieceValues: action.data
            }

        case SET_INITIAL_STATE:
            return initialState;

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};
// Action

const setThings = (things) => {
    return {
        type: "SET-THINGS",
        data: things
    }
}

const createDevice = (response) => {
    return {
        type: "CREATE-DEVICE",
        data: response
    }
}

const updateDevice = (device) => {
    return {
        type: "UPDATE-DEVICE",
        data: device
    }
}

const setPage = (page) => {
    return {
        type: "SET-PAGE-THINGS",
        data: page
    }
}

const setState = (state, token) => {
    return {
        type: "SET-STATE-DEVICE",
        state: state,
        token: token
    }
}

const setInitialState = () => {
    return {
        type: "SET-INITIAL-STATE",
    }
}

const setPaginationInfo = (info) => {
    return {
        type: "SET-PAGINATION-THINGS-INFO",
        data: info
    }
}

const createSensor = (response) => {
    return {
        type: "CREATE-SENSOR",
        data: response
    }
}

const updateSensor = (sensor) => {
    return {
        type: "UPDATE-SENSOR",
        data: sensor
    }
}

const setSensorPieceValues = (piece) => {
    return {
        type: "SET-SENSOR-PIECE-VALUES",
        data: piece
    }
}

// ActionCreator
export const setPageThingsActionCreator = (page) => {
    return async (dispatch) => {
        dispatch(setPage(page));
    };
}

export const setInitialStateActionCreator = () => {
    return async (dispatch) => {
        dispatch(setInitialState());
    };
}


// Redux-Thunk

//Get Things Array

export const getThingsPageThunkCreator = (id, page, token) => {
    return async (dispatch) => {
        try {
            //id of project
            const response = await thingsAPI.getThings(id, page, token);
            dispatch(setThings(response))
        } catch (error) {
            dispatch(setErrorActionCreator(error.response.data))
        }
    };
};

//Get pagination Info 

export const getPaginationThingsInfoThunkCreator = (project, token) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.getPaginationInfo(project, token);
            dispatch(setPaginationInfo(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};


//Device CRUD

export const createDeviceThunkCreator = (deviceForm, token, thingsLength) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.createDevice(deviceForm, token);
            if (thingsLength < 25) {
                //добавить elementPerPage
                dispatch(createDevice(response))
            }
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};

export const updateDeviceThunkCreator = (deviceForm, token, id) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.updateDevice(deviceForm, token, id);
            dispatch(updateDevice(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};

export const deleteDeviceThunkCreator = (id, page, project, token) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.deleteDevice(id, token);
            dispatch(getThingsPageThunkCreator(project, page, token))
            return response.status
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};

export const setStateDeviceThunkCreator = (state, token) => {
    return async (dispatch) => {
        try {
            // token of device
            const response = await thingsAPI.setStateDevice(state, token);
            if (response.status === 200) {
                dispatch(setState(response.data.body.state, token))
            }
            return response.status
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};

//Sensors CRUD

export const createSensorThunkCreator = (sensorForm, token, thingsLength, setError) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.createSensor(sensorForm, token);
            if (thingsLength < 25) {
                //добавить elementPerPage
                dispatch(createSensor(response))
            }
        } catch (error) {
            setErrors(error, dispatch, setError)
        }
    };
};

export const updateSensorThunkCreator = (sensorForm, token, id) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.updateSensor(sensorForm, token, id);
            dispatch(updateSensor(response))
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};

export const deleteSensorThunkCreator = (id, page, project, token) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.deleteSensor(id, token);
            dispatch(getThingsPageThunkCreator(project, page, token))
            return response.status
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};

export const getSensorPieceValuesThunkCreator = (token, fromTime, toTime) => {
    return async (dispatch) => {
        try {
            const response = await thingsAPI.getPiece(token, fromTime, toTime);
            dispatch(setSensorPieceValues(response));
        } catch (error) {
            setErrors(error, dispatch)
        }
    };
};