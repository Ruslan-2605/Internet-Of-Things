import { setAuthUserDataAction } from "./setAuthUserData"

export const setCookieAction = (authData) => {
    return (dispatch) => {
        dispatch(setAuthUserDataAction(authData))
    }
}
