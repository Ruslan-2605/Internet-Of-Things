export const createDeviceAction = (response) => {
    return {
        type: "CREATE-DEVICE",
        data: response
    }
}