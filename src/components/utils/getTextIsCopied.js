export const getTextIsCopied = (isCopy, setCopy) => {
    if (isCopy) {
        setTimeout(() => setCopy(false), [1500])
        return "token copied"
    } else {
        return "copy token"
    }
}