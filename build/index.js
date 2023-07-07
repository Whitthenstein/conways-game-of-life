"use strict";
const ALIVE_COLOR = "#FF5050";
const DEAD_COLOR = "#202020";
const NUM_ROWS = 64;
const NUM_COLS = NUM_ROWS;
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = CANVAS_WIDTH;
const CELL_WIDTH = CANVAS_WIDTH / NUM_COLS;
const CELL_HEIGHT = CANVAS_HEIGHT / NUM_ROWS;
const TIME_INTERVAL = 100;
const stateColors = ["#202020", "#FF5050", "#50FF50", "#5050FF"];
let blankBoard = [];
let currentBoard = [];
let nextBoard = [];
for (let r = 0; r < NUM_ROWS; r++) {
    blankBoard.push(new Array(NUM_COLS).fill(0));
    currentBoard.push(new Array(NUM_COLS).fill(0));
    nextBoard.push(new Array(NUM_COLS).fill(0));
}
const canvas = document.getElementById("app-canvas");
const context = canvas.getContext("2d");
const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");
const nextStateButton = document.getElementById("next-state");
const resetButton = document.getElementById("reset");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const switchBoards = () => {
    const temp = currentBoard;
    currentBoard = nextBoard;
    nextBoard = temp;
};
const countNeighbors = (board, nbors, r0, c0) => {
    nbors.fill(0);
    for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
            if (dr != 0 || dc != 0) {
                const r = r0 + dr;
                const c = c0 + dc;
                if (0 <= r && r < NUM_ROWS) {
                    if (0 <= c && c < NUM_COLS) {
                        nbors[board[r][c]]++;
                    }
                }
            }
        }
    }
};
const computeNextBoard = (states, current, next) => {
    const DEAD = 0;
    const ALIVE = 1;
    const nbors = new Array(states).fill(0);
    for (let r = 0; r < NUM_ROWS; ++r) {
        for (let c = 0; c < NUM_COLS; ++c) {
            countNeighbors(current, nbors, r, c);
            switch (current[r][c]) {
                case DEAD:
                    if (nbors[ALIVE] == 3) {
                        next[r][c] = ALIVE;
                    }
                    else {
                        next[r][c] = DEAD;
                    }
                    break;
                case ALIVE:
                    if (nbors[ALIVE] == 2 || nbors[ALIVE] == 3) {
                        next[r][c] = ALIVE;
                    }
                    else {
                        next[r][c] = DEAD;
                    }
                    break;
            }
        }
    }
};
const render = (ctx, currBrd) => {
    ctx.fillStyle = DEAD_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let r = 0; r < NUM_ROWS; ++r) {
        for (let c = 0; c < NUM_COLS; ++c) {
            const x = c * CELL_WIDTH;
            const y = r * CELL_HEIGHT;
            ctx.fillStyle = stateColors[currBrd[r][c]];
            ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
        }
    }
};
let renderInIntervalId;
const renderInInterval = () => {
    computeNextBoard(2, currentBoard, nextBoard);
    switchBoards();
    render(context, currentBoard);
    renderInIntervalId = setTimeout(renderInInterval, TIME_INTERVAL);
};
canvas.addEventListener("click", (e) => {
    const col = Math.floor(e.offsetX / CELL_WIDTH);
    const row = Math.floor(e.offsetY / CELL_HEIGHT);
    if (currentBoard[row][col] !== 0) {
        currentBoard[row][col] = 0;
    }
    else {
        currentBoard[row][col] = 1;
    }
    render(context, currentBoard);
});
nextStateButton.addEventListener("click", () => {
    computeNextBoard(2, currentBoard, nextBoard);
    switchBoards();
    render(context, currentBoard);
});
playButton.addEventListener("click", () => {
    nextStateButton.disabled = true;
    renderInInterval();
});
stopButton.addEventListener("click", () => {
    nextStateButton.disabled = false;
    clearTimeout(renderInIntervalId);
});
resetButton.addEventListener("click", () => {
    currentBoard = blankBoard;
    render(context, currentBoard);
    clearTimeout(renderInIntervalId);
    nextStateButton.disabled = false;
});
render(context, currentBoard);
