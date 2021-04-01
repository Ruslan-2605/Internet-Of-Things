export const setDeviceStateAction = (state, token) => {
    return {
        type: "SET-DEVICE-STATE",
        state: state,
        token: token
    }
}