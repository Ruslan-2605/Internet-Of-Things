export const deleteErrorAction = (index) => {
    return {
        type: "DELETE-ERROR",
        data: index,
    };
};