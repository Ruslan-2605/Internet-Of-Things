import { updateObjectArray } from "../../../utils/redux-helpers/updateObjectArray";

const SET_PROJECTS = "SET-PROJECTS";
const CREATE_PROJECT = "CREATE-PROJECT";
const UPDATE_PROJECT = "UPDATE-PROJECT";
const SET_ICON = "SET-ICON";
const SET_VIEWED_PROJECT = "SET-VIEWED-PROJECT";
const SET_PROJECTS_PAGINATION = "SET-PROJECTS-PAGINATION";
const SET_PAGE_PROJECTS = "SET-PAGE-PROJECTS";
const SET_INITIAL_PROJECT_VIEWED = "SET-INITIAL-PROJECT-VIEWED";
const SET_INITIAL_STATE_DASHBOARD = "SET-INITIAL-STATE-DASHBOARD";
const LOGOUT = "LOGOUT";

const initialState = {
    page: 1,
    pagination: {},
    projects: [],
    projectViewed: {},
    iconSelected: 1,
};

export const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PROJECTS:
            return {
                ...state,
                projects: action.data,
            };

        case CREATE_PROJECT:
            return {
                ...state,
                projects: [
                    ...state.projects,
                    action.data,
                ],
            };

        case UPDATE_PROJECT:
            return {
                ...state,
                projects: updateObjectArray(state.projects, action.data.id, "id", action.data)
            };

        case SET_ICON:
            return {
                ...state,
                iconSelected: action.data,
            };

        case SET_VIEWED_PROJECT:
            return {
                ...state,
                projectViewed: action.data,
            };

        case SET_PROJECTS_PAGINATION:
            return {
                ...state,
                pagination: action.data,
            };

        case SET_PAGE_PROJECTS:
            return {
                ...state,
                page: action.data,
            };

        case SET_INITIAL_PROJECT_VIEWED:
            return {
                ...state,
                projectViewed: {}
            };

        case SET_INITIAL_STATE_DASHBOARD:
            return initialState;

        case LOGOUT:
            return initialState;

        default:
            return state;
    }
};