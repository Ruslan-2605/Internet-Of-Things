const setIcon = (iconSelected) => {
    return {
        type: "SET-ICON",
        data: iconSelected,
    };
};

export const setIconAction = (iconSelected) => {
    return (dispatch) => {
        dispatch(setIcon(iconSelected));
    };
}