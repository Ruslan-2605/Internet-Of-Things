import Cookies from "js-cookie";

export const logoutAction = () => {
    return (dispatch) => {
        dispatch({ type: "LOGOUT" });
        ["username", "token"].map(
            (name) => {
                Cookies.remove(name);
                return
            }
        );
    }
}
