const setProjectsPage = (page) => {
    return {
        type: "SET-PAGE-PROJECTS",
        data: page
    }
}

export const setProjectsPageAction = (page) => {
    return (dispatch) => {
        dispatch(setProjectsPage(page));
    };
}
