import React, { useRef, useEffect, useState } from 'react';
import Slider from './slider';
import CO from './../canvas/CanvasObject'
import CanvasInput from '../canvas/CanvasInput';
import Operator from './../canvas/CanvasObject';
const width = 256
const height = 256

function ColourSelector() {


    const [hue, setHue] = useState(0);

    const canvasRef = useRef(null);

    const handleHueSliderChange = (value) => {
        setHue(value);
    };




    useEffect(() => {
        const canvas = canvasRef.current;
        Operator.colourSelectorCTX = canvas.getContext('2d');
        Operator.colourSelectorCanvas = canvas
        Operator.colourSelectorCursor = document.getElementById('colourSelectorCursor')
        drawTriangle(256, 256, hue / 100);

        CanvasInput.colorSelectorCursor(canvas)

    }, [hue]);


    return (
        <div className='colourSelector'>
            <div>

                <span id="selectedColor" className="sampleColor ">col</span>
                <span id="secondaryColor" className="sampleColor ">col2</span>

            </div>

            <div>
                <HuesLider onChange={handleHueSliderChange} />
                <canvas id="colourSelectorCanvas" ref={canvasRef} width={width} height={height / 2} />
                <OpacitySLider />
            </div>
        </div>
    );
}

function HuesLider({ onChange }) {

    const handleSliderChange = (event) => {
        const value = event.target.value;
        Operator.updateColor()
        onChange(value);
    };
    const canvasRef = useRef(null);

    const rows = 20;
    const cols = 256;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawHueSlider(rows, cols, 0.2, ctx);
    }, []);
    return (
        <div id="hueSliderParent" style={{ position: 'relative', width: `${cols}px`, height: `${rows}px` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
                <input
                    onChange={handleSliderChange}
                    id="hueSlider"
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    step="1"
                />
            </div>
            <canvas ref={canvasRef} width={cols} height={rows} style={{ width: "100.4%" }} />
        </div>
    );
}
function OpacitySLider() {



    const handleSliderChange = (event) => {
        Operator.opacity = event.target.value / 100
    };

    const rows = 20;
    const cols = 256;

    useEffect(() => {
    }, []);
    return (
        <div id="opactiySliderParent" style={{ position: 'relative', width: `${cols}px`, height: `${rows}px` }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}>
                <input
                    onChange={handleSliderChange}
                    id="opacitySlider"
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="100"
                    step="1"
                />
            </div>
        </div>
    );
}
function drawHueSlider(rows, cols, hue, ctx) {

    ctx.fillStyle = 'rgb(54, 54, 254)'
    ctx.fillRect(0, 0, rows, cols);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const value = 1

            const s = 1
            const h = col / 255
            const v = row / 255
            const rgb = HSVtoRGB(h, s, 1)
            ctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`
            ctx.fillRect(col, row, 2, 2)
        }
    }
}

function drawTriangle(rows, cols, hue,) {
    Operator.colourSelectorCTX.fillStyle = 'rgba(255, 255, 255,1)'
    Operator.colourSelectorCTX.fillRect(0, 0, rows, cols);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            const s = row / 255
            const v = col / 255
            const rgb = HSVtoRGB(hue, s, v)
            const gs = rgbToGrayscale(rgb.r, rgb.g, rgb.b)
            Operator.colourSelectorCTX.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`
            Operator.colourSelectorCTX.fillRect(gs, ((s) * v) * 255 / 2, 2, 2)
        }
    }
}
function drawCube(rows, cols, hue) {
    Operator.colourSelectorCTX.fillStyle = 'rgb(54, 54, 54)'
    Operator.colourSelectorCTX.fillRect(0, 0, rows, cols);
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const s = row / 255
            const v = col / 255
            const rgb = HSVtoRGB(hue, s, v)
            Operator.colourSelectorCTX.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b})`
            Operator.colourSelectorCTX.fillRect(col, row, 2, 2); // Draw each cell
        }
    }
}

function rgbToGrayscale(r, g, b) {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

    return gray;
}

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    const exp = i % 6
    switch (exp) {
        case 0: [r, g, b] = [v, t, p]; break;
        case 1: [r, g, b] = [q, v, p]; break;
        case 2: [r, g, b] = [p, v, t]; break;
        case 3: [r, g, b] = [p, q, v]; break;
        case 4: [r, g, b] = [t, p, v]; break;
        case 5: [r, g, b] = [v, p, q]; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
export default ColourSelector;
