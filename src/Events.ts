import { getPageCanvas } from './Canvas';
import { bindEventsToElement } from './MultipleEventsHandler';
import {
  renderInIntervalId,
  computeNextBoard,
  switchBoards,
  resetBoard,
  render,
  renderInInterval,
  fillBoardCell,
} from './Board';

const canvas = getPageCanvas();
const playButton = document.getElementById('play') as HTMLButtonElement;
const stopButton = document.getElementById('stop') as HTMLButtonElement;
const nextStateButton = document.getElementById('next-state') as HTMLButtonElement;
const resetButton = document.getElementById('reset') as HTMLButtonElement;

let mouseDrag = false;

// Event Handlers Actions
const nextStateButtonEvents = {
  click: () => {
    computeNextBoard(2);
    switchBoards();
    render();
  },
};

const playButtonEvents = {
  click: () => {
    nextStateButton.disabled = true;
    renderInInterval();
  },
};

const stopButtonEvents = {
  click: () => {
    nextStateButton.disabled = false;
    clearTimeout(renderInIntervalId);
  },
};

const mouseDragEvents = {
  mousedown: () => {
    mouseDrag = true;
  },
  mousemove: (e: MouseEvent) => {
    if (mouseDrag) {
      fillBoardCell(e);
    }
  },
  mouseup: (e: MouseEvent) => {
    if (!mouseDrag) {
      fillBoardCell(e);
    }
    mouseDrag = false;
  },
};

const resetButtonEventHandlers = {
  click: () => {
    resetBoard();
    render();
    clearTimeout(renderInIntervalId);
    nextStateButton.disabled = false;
  },
};

// Add Events
bindEventsToElement(document, { mouseup: mouseDragEvents['mouseup'] });
bindEventsToElement(canvas, mouseDragEvents);
bindEventsToElement(resetButton, resetButtonEventHandlers);
bindEventsToElement(nextStateButton, nextStateButtonEvents);
bindEventsToElement(playButton, playButtonEvents);
bindEventsToElement(stopButton, stopButtonEvents);
