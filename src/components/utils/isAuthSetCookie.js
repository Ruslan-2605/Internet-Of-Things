import { setCookieAction } from "../../redux/Authtorization/actions/setCookie";
import Cookies from 'js-cookie'

export const isAuthSetCookie = (isAuth, dispatch) => {
    if (!isAuth) {
        const authCookie = Cookies.get();
        if (authCookie.username && authCookie.token) {
            dispatch(setCookieAction(
                {
                    "username": authCookie.username,
                    "token": authCookie.token,
                    "isAuth": true
                }))
        }
    }
}