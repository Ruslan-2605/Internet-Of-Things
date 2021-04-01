const setThingsPage = (page) => {
    return {
        type: "SET-PAGE-THINGS",
        data: page
    }
}

export const setThingsPageAction = (page) => {
    return async (dispatch) => {
        dispatch(setThingsPage(page));
    };
}