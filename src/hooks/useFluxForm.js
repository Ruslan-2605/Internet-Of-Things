import { useState } from "react";

export const useFluxForm = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    const onChange = (e) => {
        setValue(e.target.value);
    };
    return [value, onChange]
}