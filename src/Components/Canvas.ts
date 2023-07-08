import {} from './Board';

const getCanvasContext: Function = (canvas: HTMLCanvasElement) =>
  canvas.getContext('2d') as CanvasRenderingContext2D;

const getPageCanvas: Function = () => document.getElementById('app-canvas') as HTMLCanvasElement;

const getViewportSize = function () {
  return {
    height: window.innerHeight,
    width: window.innerWidth,
  };
};

export { getViewportSize, getPageCanvas, getCanvasContext };
