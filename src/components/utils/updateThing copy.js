export const createThing = (things, type, data) => {
    return (
        [
            ...things,
            {
                "type": type,
                "entity": {
                    ...data
                }
            },
        ]
    )
}
