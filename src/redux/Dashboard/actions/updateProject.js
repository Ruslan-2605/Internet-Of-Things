export const updateProjectAction = (projects) => {
    return {
        type: "UPDATE-PROJECT",
        data: projects,
    };
};