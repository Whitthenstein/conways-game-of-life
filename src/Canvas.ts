const getCanvasContext: Function = (canvas: HTMLCanvasElement) =>
    canvas.getContext("2d") as CanvasRenderingContext2D;

const getPageCanvas: Function = () => document.getElementById("app-canvas") as HTMLCanvasElement;

let canvas: HTMLCanvasElement = getPageCanvas();

let CANVAS_WIDTH = getCanvasContext(canvas).canvas.width;
let CANVAS_HEIGHT = CANVAS_WIDTH;

const getViewportSize = function() {
    return {
        height: window.innerHeight,
        width: window.innerWidth
    };
};

// update canvas size
const updateSizes = (canvas: HTMLCanvasElement) => function() {
    let viewportSize = getViewportSize();
    let ctx = getCanvasContext(canvas);
    const minimumSize = Math.min(viewportSize.height, viewportSize.width)
    ctx.canvas.width = minimumSize * 0.8;
    ctx.canvas.height = ctx.canvas.width;

    CANVAS_WIDTH = ctx.canvas.width;
    CANVAS_HEIGHT = ctx.canvas.height;
};

window.addEventListener('resize', updateSizes(canvas), false);

updateSizes(canvas);

export {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    getPageCanvas,
    getCanvasContext
}