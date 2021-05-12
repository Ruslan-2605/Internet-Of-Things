import Cookies from 'js-cookie'
import { instance } from '../utils/DAL-helpers/instance';

export const authAPI = {

    signIn(authData) {
        return instance
            .post('auth/signIn', authData)
            .then((response) => {
                if (response.status === 200) {
                    Cookies.set("username", response.data.username,
                        { expires: response.data.tokenValidity / 86400000 });
                    Cookies.set("token", response.data.token,
                        { expires: response.data.tokenValidity / 86400000 });
                };
                return response
            })
    },

    signUp(authData) {
        return instance
            .post("auth/signUp", authData)
            .then((response) => response);
    },

};


