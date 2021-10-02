import { useEffect, useState } from "react";
import { DEFAULT_COLOR } from "../config/constants";

export function useColor(defaultColor = DEFAULT_COLOR) {
    const [color, setColor] = useState(defaultColor);

    useEffect(() => {
        setColor(defaultColor);
    }, [defaultColor]);

    return [color, setColor];
}