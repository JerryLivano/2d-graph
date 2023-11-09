import * as lib from "./lib.js";

var canvasKita = document.querySelector('#canvas4');
var ctx = canvasKita.getContext("2d");

var imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);

function createMatrix(rows, cols) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push({
                value: null,
                x: i,
                y: j
            });
        }
        matrix.push(row);
    }
    return matrix;
}

let tictactoe = createMatrix(3, 3);

for (let i = 0; i < canvasKita.width; i += 200) {
    lib.dda_line(imageDataSaya, canvasKita, [i, 0], [i, canvasKita.height], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [0, i], [canvasKita.width, i], [0, 0, 1, 255]);
}

ctx.putImageData(imageDataSaya, 0, 0);

let point_x = [
    { x: 100, y: 85 },
    { x: 160, y: 25 },
    { x: 175, y: 40 },
    { x: 115, y: 100 },
    { x: 175, y: 160 },
    { x: 160, y: 175 },
    { x: 100, y: 115 },
    { x: 40, y: 175 },
    { x: 25, y: 160 },
    { x: 85, y: 100 },
    { x: 25, y: 40 },
    { x: 40, y: 25 }
];

let point_o = [
    { x: 100, y: 100 }
];

let fill_o = [
    { x: 100, y: 30 }
]

let fill_win_o = [
    { x: 10, y: 10 }
];

let temp_x, temp_o, temp_fill_o, temp_fill_win_o;

let turn_x = true;
let win = false;

canvasKita.addEventListener('click', function (e) {
    let rect = canvasKita.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    let x = Math.floor(mouseX / 200);
    let y = Math.floor(mouseY / 200);

    if (!win) {
        if ((mouseX > 0) && (mouseY > 0) && (mouseX < 600) && (mouseY < 600)) {
            if (tictactoe[x][y].value == null) {
                if (turn_x) {
                    temp_x = lib.translation_array(point_x, { x: x * 200, y: y * 200 });
                    temp_o = lib.translation_array(point_o, { x: x * 200, y: y * 200 });
                    lib.polygon(imageDataSaya, canvasKita, temp_x, [0, 0, 1, 255]);
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_o[0].x, temp_o[0].y, { r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 255 });

                    tictactoe[x][y].value = "X";
                    turn_x = !turn_x;
                    document.querySelector('#status-tic').innerHTML = "Player O's Turn";
                } else {
                    temp_o = lib.translation_array(point_o, { x: x * 200, y: y * 200 });
                    temp_fill_o = lib.translation_array(fill_o, { x: x * 200, y: y * 200 });

                    lib.lingkaran_polar(imageDataSaya, canvasKita, [temp_o[0].x, temp_o[0].y], 80, [0, 0, 1, 255]);
                    lib.lingkaran_polar(imageDataSaya, canvasKita, [temp_o[0].x, temp_o[0].y], 60, [0, 0, 1, 255]);
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_o[0].x, temp_fill_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 0, b: 0 });

                    tictactoe[x][y].value = "O";
                    turn_x = !turn_x;
                    document.querySelector('#status-tic').innerHTML = "Player X's Turn";
                }
            }
        }

        if (tictactoe[0][0].value == tictactoe[1][1].value &&
            tictactoe[0][0].value == tictactoe[2][2].value &&
            tictactoe[1][1].value == tictactoe[2][2].value &&
            tictactoe[0][0].value != null) {
            let block_win = [tictactoe[0][0], tictactoe[1][1], tictactoe[2][2]];
            if (tictactoe[0][0].value == "X") {
                block_win.forEach(function (e) {
                    temp_fill_o = lib.translation_array(fill_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_o[0].x, temp_fill_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player X's Win";
            } else {
                block_win.forEach(function (e) {
                    temp_o = lib.translation_array(point_o, { x: e.x * 200, y: e.y * 200 });
                    temp_fill_win_o = lib.translation_array(fill_win_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_o[0].x, temp_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_win_o[0].x, temp_fill_win_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player O's Win";
            }
            win = !win;
        } else if (tictactoe[0][2].value == tictactoe[1][1].value &&
            tictactoe[0][2].value == tictactoe[2][0].value &&
            tictactoe[1][1].value == tictactoe[2][0].value &&
            tictactoe[0][2].value != null) {
            let block_win = [tictactoe[0][2], tictactoe[1][1], tictactoe[2][0]];
            if (tictactoe[0][2].value == "X") {
                block_win.forEach(function (e) {
                    temp_fill_o = lib.translation_array(fill_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_o[0].x, temp_fill_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player X's Win";
            } else {
                block_win.forEach(function (e) {
                    temp_o = lib.translation_array(point_o, { x: e.x * 200, y: e.y * 200 });
                    temp_fill_win_o = lib.translation_array(fill_win_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_o[0].x, temp_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_win_o[0].x, temp_fill_win_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player O's Win";
            }
            win = !win;
        } else if (tictactoe[0][0].value == tictactoe[0][1].value &&
            tictactoe[0][0].value == tictactoe[0][2].value &&
            tictactoe[0][1].value == tictactoe[0][2].value &&
            tictactoe[0][0].value != null) {
            let block_win = [tictactoe[0][0], tictactoe[0][1], tictactoe[0][2]];
            if (tictactoe[0][0].value == "X") {
                block_win.forEach(function (e) {
                    temp_fill_o = lib.translation_array(fill_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_o[0].x, temp_fill_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player X's Win";
            } else {
                block_win.forEach(function (e) {
                    temp_o = lib.translation_array(point_o, { x: e.x * 200, y: e.y * 200 });
                    temp_fill_win_o = lib.translation_array(fill_win_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_o[0].x, temp_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_win_o[0].x, temp_fill_win_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player O's Win";
            }
            win = !win;
        } else if (tictactoe[1][0].value == tictactoe[1][1].value &&
            tictactoe[1][0].value == tictactoe[1][2].value &&
            tictactoe[1][1].value == tictactoe[1][2].value &&
            tictactoe[1][0].value != null) {
            let block_win = [tictactoe[1][0], tictactoe[1][1], tictactoe[1][2]];
            if (tictactoe[1][0].value == "X") {
                block_win.forEach(function (e) {
                    temp_fill_o = lib.translation_array(fill_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_o[0].x, temp_fill_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player X's Win";
            } else {
                block_win.forEach(function (e) {
                    temp_o = lib.translation_array(point_o, { x: e.x * 200, y: e.y * 200 });
                    temp_fill_win_o = lib.translation_array(fill_win_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_o[0].x, temp_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_win_o[0].x, temp_fill_win_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player O's Win";
            }
            win = !win;
        } else if (tictactoe[2][0].value == tictactoe[2][1].value &&
            tictactoe[2][0].value == tictactoe[2][2].value &&
            tictactoe[2][1].value == tictactoe[2][2].value &&
            tictactoe[2][0].value != null) {
            let block_win = [tictactoe[2][0], tictactoe[2][1], tictactoe[2][2]];
            if (tictactoe[2][0].value == "X") {
                block_win.forEach(function (e) {
                    temp_fill_o = lib.translation_array(fill_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_o[0].x, temp_fill_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player X's Win";
            } else {
                block_win.forEach(function (e) {
                    temp_o = lib.translation_array(point_o, { x: e.x * 200, y: e.y * 200 });
                    temp_fill_win_o = lib.translation_array(fill_win_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_o[0].x, temp_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_win_o[0].x, temp_fill_win_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player O's Win";
            }
            win = !win;
        } else if (tictactoe[0][0].value == tictactoe[1][0].value &&
            tictactoe[0][0].value == tictactoe[2][0].value &&
            tictactoe[1][0].value == tictactoe[2][0].value &&
            tictactoe[0][0].value != null) {
            let block_win = [tictactoe[0][0], tictactoe[1][0], tictactoe[2][0]];
            if (tictactoe[0][0].value == "X") {
                block_win.forEach(function (e) {
                    temp_fill_o = lib.translation_array(fill_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_o[0].x, temp_fill_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player X's Win";
            } else {
                block_win.forEach(function (e) {
                    temp_o = lib.translation_array(point_o, { x: e.x * 200, y: e.y * 200 });
                    temp_fill_win_o = lib.translation_array(fill_win_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_o[0].x, temp_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_win_o[0].x, temp_fill_win_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player O's Win";
            }
            win = !win;
        } else if (tictactoe[0][1].value == tictactoe[1][1].value &&
            tictactoe[0][1].value == tictactoe[2][1].value &&
            tictactoe[1][1].value == tictactoe[2][1].value &&
            tictactoe[0][1].value != null) {
            let block_win = [tictactoe[0][1], tictactoe[1][1], tictactoe[2][1]];
            if (tictactoe[0][1].value == "X") {
                block_win.forEach(function (e) {
                    temp_fill_o = lib.translation_array(fill_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_o[0].x, temp_fill_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player X's Win";
            } else {
                block_win.forEach(function (e) {
                    temp_o = lib.translation_array(point_o, { x: e.x * 200, y: e.y * 200 });
                    temp_fill_win_o = lib.translation_array(fill_win_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_o[0].x, temp_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_win_o[0].x, temp_fill_win_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player O's Win";
            }
            win = !win;
        } else if (tictactoe[0][2].value == tictactoe[1][2].value &&
            tictactoe[0][2].value == tictactoe[2][2].value &&
            tictactoe[1][2].value == tictactoe[2][2].value &&
            tictactoe[0][2].value != null) {
            let block_win = [tictactoe[0][2], tictactoe[1][2], tictactoe[2][2]];
            if (tictactoe[0][2].value == "X") {
                block_win.forEach(function (e) {
                    temp_fill_o = lib.translation_array(fill_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_o[0].x, temp_fill_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player X's Win";
            } else {
                block_win.forEach(function (e) {
                    temp_o = lib.translation_array(point_o, { x: e.x * 200, y: e.y * 200 });
                    temp_fill_win_o = lib.translation_array(fill_win_o, { x: e.x * 200, y: e.y * 200 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_o[0].x, temp_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                    lib.floodFillStack(imageDataSaya, canvasKita, temp_fill_win_o[0].x, temp_fill_win_o[0].y, { r: 0, g: 0, b: 0 }, { r: 255, g: 255, b: 0 });
                });
                document.querySelector('#status-tic').innerHTML = "Player O's Win";
            }
            win = !win;
        }

        if (tictactoe[0][0].value != null && tictactoe[0][1].value != null &&
            tictactoe[0][2].value != null && tictactoe[1][0].value != null &&
            tictactoe[1][1].value != null && tictactoe[1][2].value != null &&
            tictactoe[2][0].value != null && tictactoe[2][1].value != null &&
            tictactoe[2][2].value != null && !win){
                document.querySelector('#status-tic').innerHTML = "Tie";
            }
    }
    ctx.putImageData(imageDataSaya, 0, 0);
});

document.querySelector('#reset-tic').addEventListener('click', function () {
    document.querySelector('#status-tic').innerHTML = "Player X's Turn";
    win = false;
    turn_x = true;

    ctx.clearRect(0, 0, canvasKita.width, canvasKita.height);
    imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);
    tictactoe = createMatrix(3, 3);

    for (let i = 0; i < canvasKita.width; i += 200) {
        lib.dda_line(imageDataSaya, canvasKita, [i, 0], [i, canvasKita.height], [0, 0, 1, 255]);
        lib.dda_line(imageDataSaya, canvasKita, [0, i], [canvasKita.width, i], [0, 0, 1, 255]);
    }

    ctx.putImageData(imageDataSaya, 0, 0);
});