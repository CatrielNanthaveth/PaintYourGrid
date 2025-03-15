const createEmptyCanvas = (rows, cols) =>
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ isActive: false, color: "white" })));

export default createEmptyCanvas;