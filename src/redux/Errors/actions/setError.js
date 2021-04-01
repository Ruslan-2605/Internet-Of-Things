const setError = (error) => {
    return {
        type: "SET-ERROR",
        data: error,
    };
};

export const setErrorAction = (error) => {
    return (dispatch) => {
        dispatch(setError(error))
    }
}