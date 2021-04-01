export const createProjectAction = (project) => {
    return {
        type: "CREATE-PROJECT",
        data: project,
    };
};