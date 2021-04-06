export const deviceStateValidation = (value, states, setStates, setError) => {
    if (value.length > 16) {
        return setError("state", {
            type: "max",
            message: "State max size is 16"
        });
    } else if (value.length < 2) {
        return setError("state", {
            type: "min",
            message: "State size is less than 2"
        });
    } else if (value.includes(" ")) {
        return setError("state", {
            type: "min",
            message: "States has not space"
        });
    } else {
        let countDuplicates = 0;
        states.forEach((state) => {
            if (state === value) {
                countDuplicates += 1;
            }
        })
        if (countDuplicates > 0) {
            return setError("state", {
                type: "duplicates",
                message: "Found duplicates string in states"
            });
        } else {
            const statesCopy = [...states]
            statesCopy.push(value);
            setStates(statesCopy);
        }
    }
}