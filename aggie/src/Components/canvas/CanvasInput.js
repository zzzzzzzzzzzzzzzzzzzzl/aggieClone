import Operator from "./CanvasObject"


class CanvasInput {


    static drawing(canvasElement) {
        const canvas = canvasElement;
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.globalAlpha = .2
        let drawing = false;
        let lastX, lastY; // Store the last coordinates

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        function startDrawing(e) {
            drawing = true;
            ctx.lineWidth = Operator.brushSize
            console.log(Operator.brushSize)
            ctx.beginPath(); // Start a new path for each stroke
            ctx.moveTo(10, 10);
            // ctx.moveTo(e.offsetX, e.offsetY);

            lastX = e.offsetX; // Save the starting coordinates
            lastY = e.offsetY;
        }

        function draw(e) {
            if (!drawing) return;

            ctx.lineTo(e.offsetX, e.offsetY);

            // Set the stroke style with full opacity
            ctx.strokeStyle = `rgba(${Operator.color.r}, ${Operator.color.g}, ${Operator.color.b}, 0.5)`; // Use desired opacity
            ctx.lineWidth = Operator.brushSize; // Set the brush size
            ctx.stroke(); // Draw the line with the current settings

            // Update the last coordinates
            lastX = e.offsetX;
            lastY = e.offsetY;

            // Move to the last coordinates to prevent dots
            ctx.beginPath(); // Start a new path
            ctx.moveTo(lastX, lastY); // Move to the last position to continue drawing
            Operator.drawPixel(lastX, lastY)
        }

        function stopDrawing() {
            drawing = false;
            ctx.closePath(); // End the path for the current stroke
        }


        // canvasElement.addEventListener('mousemove', (e) => {
        //     if (Operator.painting) {
        //         Operator.drawPixel(e.offsetX, e.offsetY)
        //         Operator.drawLine(Operator.lastPixel.x, Operator.lastPixel.y, e.offsetX, e.offsetY)
        //         Operator.lastPixel = { x: e.offsetX, y: e.offsetY }

        //     }
        // })

        // canvasElement.addEventListener('mousedown', (e) => {
        //     Operator.painting = true
        //     // Operator.drawPixel(e.offsetX, e.offsetY)
        //     Operator.lastPixel = { x: e.offsetX, y: e.offsetY }

        // })

        // document.addEventListener("mousemove", (event) => {
        //     Operator.cursor.style.left = `${event.clientX}px`;
        //     Operator.cursor.style.top = `${event.clientY}px`;
        // });

        // canvasElement.addEventListener('mouseup', (e) => {
        //     Operator.painting = false
        // })
        // canvasElement.addEventListener('mouseleave', () => {
        //     Operator.painting = false
        // })

    }


    static brushSize() {
        document.addEventListener('keydown', (e) => {
            if (e.key == "]") {
                Operator.brushSize++
                Operator.cursor.style.width = `${Operator.brushSize}px`
                Operator.cursor.style.height = `${Operator.brushSize}px`
            }
            if (e.key == "[") {
                if (Operator.brushSize > 1) {
                    Operator.brushSize--
                    Operator.cursor.style.width = `${Operator.brushSize}px`
                    Operator.cursor.style.height = `${Operator.brushSize}px`
                }
            }
        })
    }
    static swapColour() {
        document.addEventListener('keydown', (e) => {
            if (e.key == "x") {
                const temp = Operator.secondColor
                Operator.secondColor = Operator.color
                Operator.color = temp

                CanvasInput.updateSampleColourSample()
                CanvasInput.updateSampleSecondColourSample()
            }
        })
    }
    static updateSampleColourSample() {
        const div = document.getElementById("selectedColor")
        div.style.background = Operator.color
    }

    static updateSampleSecondColourSample() {
        console.log("here second dampel")
        const div = document.getElementById("secondaryColor")
        div.style.background = Operator.secondColor
    }

    static colorSelectorCursor(canvasElement) {
        CanvasInput.colorSelectorCursorDown = false
        const cursor = document.getElementById('colourSelectorCursor')

        const rect = canvasElement.getBoundingClientRect();

        const ctx = canvasElement.getContext('2d');
        canvasElement.addEventListener('mousedown', (event) => {
            CanvasInput.colorSelectorCursorDown = true

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
            Operator.updateColor(ctx, x, y)

        });

        canvasElement.addEventListener("mousemove", (event) => {
            if (CanvasInput.colorSelectorCursorDown) {

                cursor.style.left = `${event.clientX}px`;
                cursor.style.top = `${event.clientY}px`;


                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                Operator.updateColor(ctx, x, y)

            }

        });

        canvasElement.addEventListener('mouseup', (event) => {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
            CanvasInput.colorSelectorCursorDown = false

        })
        canvasElement.addEventListener('mouseleave', () => {
            CanvasInput.colorSelectorCursorDown = false
        })


    }
}
function updateColor(ctx, x, y) {
    const pixelData = ctx.getImageData(x, y, 1, 1).data;
    const [r, g, b, a] = pixelData;

    // Convert color to RGBA format and display it
    const color = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
    Operator.color = color


    const div = document.getElementById("sampleColor")
    div.style.background = Operator.color
}
export default CanvasInput