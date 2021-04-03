const getProject = (state) => {
    return state.dashboard
}

export const getActiveProjectsPage = (state) => {
    return getProject(state).page
}
export const getProjects = (state) => {
    return getProject(state).projects
}
export const getIconSelected = (state) => {
    return getProject(state).iconSelected
}
export const getPaginationProjects = (state) => {
    return getProject(state).pagination
}
export const getProjectViewed = (state) => {
    return getProject(state).projectViewed
}
export const getProjectViewedId = (state) => {
    return getProject(state).projectViewed.id
}
