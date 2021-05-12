const getDevice = (state) => {
    return state.things
}

export const getThings = (state) => {
    return getDevice(state).things
}
export const getActiveThingsPage = (state) => {
    return getDevice(state).page
}
export const getPaginationThings = (state) => {
    return getDevice(state).pagination
}
export const getSensorPieceValues = (state) => {
    return getDevice(state).sensorPieceValues
}