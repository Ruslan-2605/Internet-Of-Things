const getErrors = (state) => {
    return state.errors
}

export const getErrorsArray = (state) => {
    return getErrors(state).errors;
}
