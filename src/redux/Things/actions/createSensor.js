export const createSensorAction = (response) => {
    return {
        type: "CREATE-SENSOR",
        data: response
    }
}