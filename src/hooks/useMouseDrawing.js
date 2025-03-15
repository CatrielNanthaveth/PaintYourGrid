import { useState } from "react"


const useMouseDrawing = () => {
    const [isDrawing, setIsDrawing] = useState(false);

    const startDrawing = () => setIsDrawing(true);
    const stopDrawing = () => setIsDrawing(false);

    return { isDrawing, startDrawing, stopDrawing };
};

export default useMouseDrawing;