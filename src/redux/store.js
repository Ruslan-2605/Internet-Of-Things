import thunkMiddleWare from "redux-thunk";
import { authReducer } from "./Authtorization/reducer/auth-reducer";
import { thingsReducer } from "./Things/reducer/things-reducer";
import { dashboardReducer } from "./Dashboard/reducer/dashboard-reducer";
import { errorsReducer } from "./Errors/reducer/errors-reducer";


const { createStore, combineReducers, applyMiddleware, compose } = require("redux");

let reducers = combineReducers({
    auth: authReducer,
    projects: dashboardReducer,
    things: thingsReducer,
    errors: errorsReducer,
});

// let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;
