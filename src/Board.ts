import {CANVAS_HEIGHT, CANVAS_WIDTH, getCanvasContext, getPageCanvas} from './Canvas';

type State = number;
type Board = Array<Array<State>>;
const stateColors = ["#202020", "#FF5050", "#50FF50", "#5050FF"]
const NUM_ROWS = 64;
const NUM_COLS = NUM_ROWS;
const ALIVE_COLOR = "#FF5050";
const DEAD_COLOR = "#202020";

const TIME_INTERVAL = 100;

let CELL_WIDTH = CANVAS_WIDTH/NUM_COLS;
let CELL_HEIGHT = CANVAS_HEIGHT/NUM_ROWS;

let BlankBoard: Board = [];
let currentBoard: Board = [];
let nextBoard: Board = [];

for (let r = 0; r < NUM_ROWS; r++) {
    BlankBoard.push(new Array(NUM_COLS).fill(0));
    currentBoard.push(new Array(NUM_COLS).fill(0));
    nextBoard.push(new Array(NUM_COLS).fill(0));
}

const resetBoard = () => {
    currentBoard = BlankBoard;
}

const switchBoards = () => {
    const temp = currentBoard;
    currentBoard = nextBoard;
    nextBoard = temp;
};

const countNeighbors = (board: Board, nbors: number[], r0:number, c0: number) => {
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

const computeNextBoard = (states: number) => {
    const DEAD = 0;
    const ALIVE = 1;
    const nbors = new Array(states).fill(0);
    for (let r = 0; r < NUM_ROWS; ++r) {
        for (let c = 0; c < NUM_COLS; ++c) {
            countNeighbors(currentBoard, nbors, r, c);
            switch (currentBoard[r][c]) {
                case DEAD:
                    if (nbors[ALIVE] == 3) {
                        nextBoard[r][c] = ALIVE;
                    } else {
                        nextBoard[r][c] = DEAD;
                    }
                    break;
                case ALIVE:
                    if (nbors[ALIVE] == 2 || nbors[ALIVE] == 3) {
                        nextBoard[r][c] = ALIVE;
                    } else {
                        nextBoard[r][c] = DEAD;
                    }
                    break;
            }
        }
    }
};

const render = () => {
    const canvas = getPageCanvas();
    const ctx = getCanvasContext(canvas);
    ctx.fillStyle = DEAD_COLOR;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let r = 0; r < NUM_ROWS; ++r) {
        for (let c = 0; c < NUM_COLS; ++c) {
            const x = c*CELL_WIDTH;
            const y = r*CELL_HEIGHT;

            ctx.fillStyle = stateColors[currentBoard[r][c]];
            ctx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);

        }
    }
};

let renderInIntervalId: NodeJS.Timeout;

const renderInInterval = () => {
    computeNextBoard(2);
    switchBoards();
    render();
    renderInIntervalId = setTimeout(renderInInterval, TIME_INTERVAL);
};

const fillBoardCell = (e: MouseEvent) => {
    const col = Math.floor(e.offsetX/CELL_WIDTH);
    const row = Math.floor(e.offsetY/CELL_HEIGHT);
    if (currentBoard[row][col] !== 0) {
        currentBoard[row][col] = 0;
    } else {
        currentBoard[row][col] = 1;
    }
    render();
}

export {
    renderInIntervalId,
    computeNextBoard,
    switchBoards,
    resetBoard,
    render,
    renderInInterval,
    fillBoardCell
}
