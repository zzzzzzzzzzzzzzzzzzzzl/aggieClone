import CanvasInput from "./CanvasInput"

class Operator {
    static canvas = new Operator()
    static color = 'rgba(255,0,0,1)'
    static opacity = 1
    static secondColor = 'rgba(0,50,100,1)'
    static painting = false
    static lastPixel = { x: 0, y: 0 }
    static brushSize = 5
    static ctx
    static canvasElement
    static cursor
    static colourSelectorCursor
    static colourSelectorCanvas
    static colourSelectorCTX
    static initialized = false

    constructor() {
        // this.painting = false
        // this.lastPixel = { x: 0, y: 0 }
        // this.brushSize = 5
    }
    static getColourSelectorPos() {
        const rect = Operator.colourSelectorCanvas.getBoundingClientRect();
        const x = parseInt(Operator.colourSelectorCursor.style.left) - rect.left
        const y = parseInt(Operator.colourSelectorCursor.style.top) - rect.top
        return { x: x, y: y }
    }
    static getColor(pos) {
        console.log(Operator.colourSelectorCTX)
        const pixelData = Operator.colourSelectorCTX.getImageData(pos.x, pos.y, 1, 1).data;
        const [r, g, b, a] = Operator.findNearestValueColour(pos);
        return `rgba(${r}, ${g}, ${b}, ${a / 255})`;
    }
    static updateColor() {
        Operator.color = Operator.getColor(Operator.getColourSelectorPos())
        const div = document.getElementById("selectedColor")
        div.style.background = Operator.color
        Operator.applyOpacity()

    }

    static findNearestValueColour(pos) {
        let pixelData
        let count = 0
        while (true) {
            count++
            pixelData = Operator.colourSelectorCTX.getImageData(pos.x, pos.y, 1, 1).data;
            const [r, g, b, a] = pixelData;
            if (a == 0) {
                pos.y--
            } else {
                break
            }
        }
        const rect = Operator.colourSelectorCanvas.getBoundingClientRect();
        Operator.cursor.style.top = rect.left + pos.x
        Operator.cursor.style.top = rect.top + pos.y

        return pixelData
    }

    initializeCanvas(canvasElement) {
        if (!Operator.initialized) {
            Operator.initialized = true
            Operator.canvasElement = canvasElement
            Operator.ctx = canvasElement.getContext('2d')
            Operator.cursor = document.getElementById("custom-cursor");
            Operator.cursor.style.width = `${Operator.brushSize}px`
            Operator.cursor.style.height = `${Operator.brushSize}px`

            CanvasInput.updateSampleColourSample()
            CanvasInput.updateSampleSecondColourSample()

            CanvasInput.drawing(canvasElement)
            CanvasInput.brushSize()
            CanvasInput.swapColour()
        }
    }
    static updateSampleColourSample() {
        const div = document.getElementById("selectedColor")
        div.style.background = Operator.color
    }

    static updateSampleSecondColourSample() {
        const div = document.getElementById("secondaryColor")
        div.style.background = Operator.secondColor
    }
    static rgbaStringToObject(rgbaString) {
        // Remove "rgba(" and the closing parenthesis
        const rgbaValues = rgbaString.replace(/^rgba\(|\)$/g, '').split(',');

        return {
            r: parseInt(rgbaValues[0].trim(), 10), // Red
            g: parseInt(rgbaValues[1].trim(), 10), // Green
            b: parseInt(rgbaValues[2].trim(), 10), // Blue
            a: parseFloat(rgbaValues[3].trim()),    // Alpha
        };
    }
    static applyOpacity() {
        const { r, g, b, a } = Operator.rgbaStringToObject(Operator.color)
        Operator.color = `rgba(${r},${g},${b},${Operator.opacity})`; // Corrected typo here
    }
    static drawPixel(x, y) {
        // const { r, g, b, a } = Operator.rgbaStringToObject(Operator.color)
        // Operator.ctx.fillStyle = `rgba(${r},${g},${b},${Operator.opacity})`; // Corrected typo here
        // // Operator.ctx.fillStyle.opacity = Operator.opacity
        // if (Operator.brushSize < 2) {
        //     Operator.ctx.fillRect(
        //         x,
        //         y,
        //         Operator.brushSize / 4, // Use the full brush size
        //         Operator.brushSize / 4  // Use the full brush size
        //     );
        //     return; // Exit the function
        // }

        // else {

        // this.ctx.beginPath();
        this.ctx.ellipse(
            x,
            y,
            Operator.brushSize / 4,
            Operator.brushSize / 4,
            0,
            0,
            Math.PI * 2
        );
        // this.ctx.fill();
        // }
    }
    static drawLine(x1, y1, x2, y2) {
        const dx = Math.abs(x2 - x1)
        const dy = Math.abs(y2 - y1)

        const sx = x1 < x2 ? 1 : -1
        const sy = y1 < y2 ? 1 : -1
        let err = dx - dy

        while (!(x1 == x2 && y1 == y2)) {
            Operator.drawPixel(x1, y1)

            const err2 = err * 2
            if (err2 > -dy) {
                err -= dy
                x1 += sx
            }
            if (err2 < dx) {
                err += dx
                y1 += sy
            }
        }
    }
}



export default Operator