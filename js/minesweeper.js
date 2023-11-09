import * as lib from './lib.js';

var canvasKita = document.querySelector('#canvas1');
var ctx = canvasKita.getContext("2d");

function createMatrix(rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push({
                isBomb: false,
                isRevealed: false,
                isWarning: false,
                color: null,
                number: 0
            });
        }
        matrix.push(row);
    }
    return matrix;
}

function initBombs(matrix, totalBombs) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    while (totalBombs > 0) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);

        if (!matrix[row][col].isBomb) {
            matrix[row][col].isBomb = true;
            totalBombs--;
        }
    }
}

function initNumbering(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            matrix[i][j].color = randColor();
            if (!matrix[i][j].isBomb) {
                let count = 0;

                for (let r = -1; r <= 1; r++) {
                    for (let c = -1; c <= 1; c++) {
                        const newRow = i + r;
                        const newCol = j + c;

                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                            if (matrix[newRow][newCol].isBomb) {
                                count++;
                            }
                        }
                    }
                }

                matrix[i][j].number = count;
            }
        }
    }
}

const numRows = 12;
const numCols = 24;
const totalBombs = 60;

let bombMatrix = createMatrix(numRows, numCols);
initBombs(bombMatrix, totalBombs);
initNumbering(bombMatrix);

function randColor() {
    let r = 130 + Math.floor(Math.random() * 126);
    let g = 130 + Math.floor(Math.random() * 126);
    let b = 130 + Math.floor(Math.random() * 126);
    return { r: r, g: g, b: b };
}

var imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

for (let i = 0; i < canvasKita.width; i += 50) {
    lib.dda_line(imageDataSaya, canvasKita, [i, 0], [i, canvasKita.height], [0, 0, 1, 255]);
}
for (let i = 0; i < canvasKita.height; i += 50) {
    lib.dda_line(imageDataSaya, canvasKita, [0, i], [canvasKita.width, i], [0, 0, 1, 255]);
}

for (let i = 25; i < canvasKita.width; i += 50) {
    for (let j = 25; j < canvasKita.height; j += 50) {
        lib.floodFillStack(imageDataSaya, canvasKita, i, j, { r: 0, g: 0, b: 0 }, bombMatrix[(j - 25) / 50][(i - 25) / 50].color);
    }
}

ctx.putImageData(imageDataSaya, 0, 0);

ctx.font = '24px Times New Roman';
ctx.fillStyle = 'black';
ctx.textAlign = 'center';

let non_bomb = 0;
let lose = false;
let win = false;

canvasKita.addEventListener('click', function (e) {
    if (!lose && !win) {
        let rect = canvasKita.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        let index_x = Math.floor(y / 50);
        let index_y = Math.floor(x / 50);

        if (!bombMatrix[index_x][index_y].isRevealed && !bombMatrix[index_x][index_y].isWarning) {
            if (!bombMatrix[index_x][index_y].isBomb) {
                render_text([index_x, index_y]);
                non_bomb++;
                bombMatrix[index_x][index_y].isRevealed = true;
                document.querySelector('#non-bomb').innerHTML = non_bomb;
            } else {
                draw_bomb([index_x, index_y]);
                lose = !lose;
                bombMatrix[index_x][index_y].isBomb = true;
                bombMatrix[index_x][index_y].isRevealed = true;
                document.querySelector('#status-ms').innerHTML = 'You Lose';
            }
        }
    }

    if (non_bomb == (numRows * numCols - totalBombs)) {
        win = !win;
        document.querySelector('#status-ms').innerHTML = 'You Win';
    }
});

canvasKita.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    let rect = canvasKita.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let index_x = Math.floor(y / 50);
    let index_y = Math.floor(x / 50);

    if (!bombMatrix[index_x][index_y].isRevealed) {
        if (!bombMatrix[index_x][index_y].isWarning) {
            draw_warning([index_x, index_y]);
            bombMatrix[index_x][index_y].isWarning = true;
            console.log(bombMatrix[index_x][index_y])
        } else {
            let x_pos = 25 + (50 * index_y);
            let y_pos = 25 + (50 * index_x);
            ctx.clearRect(x_pos - 24, y_pos - 24, 49, 49);
            imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);
            lib.floodFillStack(imageDataSaya, canvasKita, x_pos, y_pos, { r: 0, g: 0, b: 0 }, bombMatrix[index_x][index_y].color);
            bombMatrix[index_x][index_y].isWarning = false;
            console.log(bombMatrix[index_x][index_y])
        }
        ctx.putImageData(imageDataSaya, 0, 0);
    }
});

function draw_warning(index) {
    let x = 25 + (50 * index[1]);
    let y = 25 + (50 * index[0]);

    imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

    for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
            if (!bombMatrix[j][i].isRevealed) {
                render_text([j, i]);
            }
        }
    }

    let warning = [
        { x: x, y: y - 20 },
        { x: x - 20, y: y + 20 },
        { x: x + 20, y: y + 20 },
    ];

    lib.polygon(imageDataSaya, canvasKita, warning, [255, 255, 0, 255]);
    lib.floodFillStack(imageDataSaya, canvasKita, x, y, bombMatrix[index[0]][index[1]].color, { r: 255, g: 255, b: 0 });
    ctx.putImageData(imageDataSaya, 0, 0);
}

function draw_bomb(index) {
    let x = 25 + (50 * index[1]);
    let y = 25 + (50 * index[0]);
    ctx.clearRect(x - 24, y - 24, 49, 49);
    imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);
    lib.lingkaran_polar(imageDataSaya, canvasKita, [x, y], 20, [255, 0, 0, 255]);
    lib.floodFillStack(imageDataSaya, canvasKita, x, y, { r: 0, g: 0, b: 0 }, { r: 255, g: 0, b: 0 });
    ctx.putImageData(imageDataSaya, 0, 0);

}

function render_text(index) {
    let [x, y] = index;

    let pos_x = 25 + (50 * y);
    let pos_y = 35 + (50 * x);

    ctx.fillText(bombMatrix[x][y].number, pos_x, pos_y);
}

document.querySelector('#reset-minesweeper').addEventListener('click', function () {
    non_bomb = 0;
    lose = false;
    win = false;
    document.querySelector('#non-bomb').innerHTML = non_bomb;
    document.querySelector('#status-ms').innerHTML = '';

    ctx.clearRect(0, 0, canvasKita.width, canvasKita.height);
    imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

    bombMatrix = createMatrix(numRows, numCols);
    initBombs(bombMatrix, totalBombs);
    initNumbering(bombMatrix);

    for (let i = 0; i < canvasKita.width; i += 50) {
        lib.dda_line(imageDataSaya, canvasKita, [i, 0], [i, canvasKita.height], [0, 0, 1, 255]);
    }
    for (let i = 0; i < canvasKita.height; i += 50) {
        lib.dda_line(imageDataSaya, canvasKita, [0, i], [canvasKita.width, i], [0, 0, 1, 255]);
    }
    for (let i = 25; i < canvasKita.width; i += 50) {
        for (let j = 25; j < canvasKita.height; j += 50) {
            lib.floodFillStack(imageDataSaya, canvasKita, i, j, { r: 0, g: 0, b: 0 }, bombMatrix[(j - 25) / 50][(i - 25) / 50].color);
        }
    }

    ctx.putImageData(imageDataSaya, 0, 0);
});