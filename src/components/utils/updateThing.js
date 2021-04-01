export const updateThing = (things, type, data) => {
    return things.map((thing) => {
        if (thing.entity.id === data.id && thing.type === type) {
            return { ...thing, ...{ "entity": { ...data } } }
        } else {
            return thing;
        }
    }
    )
}