import React, { useRef, useEffect } from 'react';
import Operator from './CanvasObject';

const width = 256
const height = 256

function Canvas({ nm }) {
    const canvasRef = useRef(null); // Create a ref for the canvas

    useEffect(() => {
        if (nm) {

            if (!Operator.initialized) {

                const canvas = canvasRef.current; // Get the canvas element from the ref
                Operator.canvas.initializeCanvas(canvas)
            }
        }
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px solid black' }} />
        </div>
    );
}

export default Canvas;
