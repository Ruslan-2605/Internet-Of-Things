import { createThing } from "../../../utils/redux-helpers/createThing";
import { updateThing } from "../../../utils/redux-helpers/updateThing";

const SET_THINGS = "SET-THINGS";
const CREATE_DEVICE = "CREATE-DEVICE";
const UPDATE_DEVICE = "UPDATE-DEVICE";
const SET_PAGE_THINGS = "SET-PAGE-THINGS";
const SET_DEVICE_STATE = "SET-DEVICE-STATE";
const SET_INITIAL_STATE_THINGS = "SET-INITIAL-STATE-THINGS";
const SET_THINGS_PAGINATION = "SET-THINGS-PAGINATION";
const CREATE_SENSOR = "CREATE-SENSOR";
const UPDATE_SENSOR = "UPDATE-SENSOR";
const SET_SENSOR_PIECE_VALUES = "SET-SENSOR-PIECE-VALUES";
const LOGOUT = "LOGOUT";

const initialState = {
    things: [],
    page: 1,
    pagination: {},
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
                things: createThing(state.things, "device", action.data)

            };

        case UPDATE_DEVICE:
            return {
                ...state,
                things: updateThing(state.things, "device", action.data)
            }

        case SET_PAGE_THINGS:
            return {
                ...state,
                page: action.data,
            };

        case SET_DEVICE_STATE:
            return {
                ...state,
                things: state.things.map((thing) => {
                    if (thing.entity.token === action.token && thing.type === "device") {
                        return { ...thing, ...{ "entity": { ...thing.entity, "state": action.state } } }
                    } else {
                        return thing
                    }
                }
                )
            };

        case SET_THINGS_PAGINATION:
            return {
                ...state,
                pagination: action.data,
            };

        case CREATE_SENSOR:
            return {
                ...state,
                things: createThing(state.things, "sensor", action.data)
            };

        case UPDATE_SENSOR:
            return {
                ...state,
                things: updateThing(state.things, "sensor", action.data)
            }

        case SET_SENSOR_PIECE_VALUES:
            return {
                ...state,
                sensorPieceValues: action.data
            }

        case SET_INITIAL_STATE_THINGS:
            return initialState;

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};

