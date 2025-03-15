import React, { useEffect, useState } from 'react'
import Cell from '../components/Cell'
import useWindowsDimensions from '../hooks/useWindowsDimensions.js';
import createEmptyCanvas from '../utils/createEmptyCanvas'
import useMouseDrawing from '../hooks/useMouseDrawing';
import ColorPicker from '../components/ColorPicker';



export const Canvas = () => {
    const { width, height } = useWindowsDimensions();
    const [cellDimensions, setCellDimensions] = useState(width / 100);
    const [canvasDimensions, setCanvasDimensions] = useState({
        xQuantity: 100,
        yQuantity: Math.ceil(height / cellDimensions)
    })


    const [canvas, setCanvas] = useState(() => createEmptyCanvas(canvasDimensions.yQuantity, canvasDimensions.xQuantity));
    const { isDrawing, startDrawing, stopDrawing } = useMouseDrawing();
    const [currentColor, setCurrentColor] = useState("black");
    const [contextMenu, setContextMenu] = useState(null);


    const toggleCell = (row, col) => {
        setCanvas((prevCanvas) =>
            prevCanvas.map((rowAxis, rowIndex) =>
                rowIndex === row
                    ? rowAxis.map((cell, colIndex) =>
                        colIndex === col
                            ? { ...cell, isActive: !cell.isActive, color: currentColor }
                            : cell
                    )
                    : rowAxis
            )
        );
    };

    const handleRightClick = (event, row, col) => {

        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY, row, col });

    };

    const handleMouseEnter = (row, col) => {

        if (isDrawing) toggleCell(row, col);

    };

    useEffect(() => {

        setCellDimensions(width / 100);

    }, [width]);

    useEffect(() => {

        setCanvasDimensions({
            xQuantity: 100,
            yQuantity: Math.ceil(height / cellDimensions)
        })

    }, [cellDimensions, height]);

    useEffect(() => {

        const auxCanvas = createEmptyCanvas(canvasDimensions.yQuantity, canvasDimensions.xQuantity)

        setCanvas(auxCanvas);

    }, [JSON.stringify(canvasDimensions)]);


    return (
        <>
            <div
                className="canva"
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
            >
                {canvas.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <Cell
                                key={`${rowIndex}-${colIndex}`}
                                size={cellDimensions}
                                isActive={cell.isActive}
                                color={cell.color}
                                onClick={() => toggleCell(rowIndex, colIndex)}
                                onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                ))}
                {contextMenu && (
                    <div onMouseLeave={() => setContextMenu(null)}>
                        <ColorPicker
                            x={contextMenu.x - 15}
                            y={contextMenu.y - 15}
                            onSelectColor={(color) => {
                                setCurrentColor(color);
                                setContextMenu(null);
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
