import * as lib from './lib.js';

var canvasKita = document.querySelector('#canvas2');
var ctx = canvasKita.getContext("2d");

var canvasKita2 = document.querySelector('#canvas3');
var ctx2 = canvasKita2.getContext("2d");

let border = [
    { x: 0, y: 0 },
    { x: canvasKita.width - 1, y: 0 },
    { x: canvasKita.width - 1, y: canvasKita.height - 1 },
    { x: 0, y: canvasKita.height - 1 }
];

var imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);
var imageDataSaya2 = ctx2.getImageData(0, 0, canvasKita2.width, canvasKita2.height);

lib.polygon(imageDataSaya, canvasKita, border, [0, 0, 1, 255]);
lib.polygon(imageDataSaya2, canvasKita2, border, [0, 0, 1, 255]);

gambar1(imageDataSaya, canvasKita);
gambar2(imageDataSaya2, canvasKita2);

ctx.putImageData(imageDataSaya, 0, 0);
ctx2.putImageData(imageDataSaya2, 0, 0);

canvasKita.addEventListener('click', function (e) {
    let rect = canvasKita.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    console.log(x, y);
});

function gambar1(imageDataSaya, canvasKita) {
    let colors = [];
    for (let i = 0; i < 11; i++) {
        colors.push(randColor());
    }

    // telinga
    lib.dda_line(imageDataSaya, canvasKita, [360, 140], [480, 120], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [470, 225], [480, 120], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [480, 120], [415, 165], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [240, 140], [120, 120], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [130, 225], [120, 120], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [120, 120], [185, 165], [0, 0, 1, 255]);

    // muka
    lib.lingkaran_polar(imageDataSaya, canvasKita, [300, 330], 200, [0, 0, 1, 255]);
    lib.lingkaran_polar(imageDataSaya, canvasKita, [300, 350], 180, [0, 0, 1, 255]);

    // halo
    lib.elips_polar(imageDataSaya, canvasKita, [300, 60], [100, 20], [0, 0, 1, 255]);
    lib.elips_polar(imageDataSaya, canvasKita, [300, 60], [150, 40], [0, 0, 1, 255]);

    // mata
    lib.lingkaran_polar(imageDataSaya, canvasKita, [370, 250], 30, [0, 0, 1, 255]);
    lib.lingkaran_polar(imageDataSaya, canvasKita, [365, 250], 15, [0, 0, 1, 255]);
    lib.lingkaran_polar(imageDataSaya, canvasKita, [230, 250], 30, [0, 0, 1, 255]);
    lib.lingkaran_polar(imageDataSaya, canvasKita, [235, 250], 15, [0, 0, 1, 255]);

    // hidung
    lib.lingkaran_polar(imageDataSaya, canvasKita, [300, 360], 40, [0, 0, 1, 255]);
    lib.elips_polar(imageDataSaya, canvasKita, [300, 335], [20, 10], [0, 0, 1, 255]);

    // mulut
    lib.setengah_lingkaran(imageDataSaya, canvasKita, [340, 400], 40, [0, 0, 1, 255]);
    lib.setengah_lingkaran(imageDataSaya, canvasKita, [260, 400], 40, [0, 0, 1, 255]);

    // kumis
    lib.dda_line(imageDataSaya, canvasKita, [405, 340], [570, 290], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [405, 380], [570, 420], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [195, 340], [30, 290], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [195, 380], [30, 420], [0, 0, 1, 255]);

    // tubuh
    lib.dda_line(imageDataSaya, canvasKita, [210, 510], [170, 600], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [390, 510], [430, 600], [0, 0, 1, 255]);

    // warna
    lib.floodFillStack(imageDataSaya, canvasKita, 70, 180, { r: 0, g: 0, b: 0 }, colors[0]);
    lib.floodFillStack(imageDataSaya, canvasKita, 280, 61, { r: 0, g: 0, b: 0 }, colors[0]);
    lib.floodFillStack(imageDataSaya, canvasKita, 418, 58, { r: 0, g: 0, b: 0 }, colors[1]);
    lib.floodFillStack(imageDataSaya, canvasKita, 290, 569, { r: 0, g: 0, b: 0 }, colors[2]);
    lib.floodFillStack(imageDataSaya, canvasKita, 290, 214, { r: 0, g: 0, b: 0 }, colors[3]);
    lib.floodFillStack(imageDataSaya, canvasKita, 290, 367, { r: 0, g: 0, b: 0 }, colors[4]);
    lib.floodFillStack(imageDataSaya, canvasKita, 290, 334, { r: 0, g: 0, b: 0 }, colors[5]);

    lib.floodFillStack(imageDataSaya, canvasKita, 290, 150, { r: 0, g: 0, b: 0 }, colors[6]);
    lib.floodFillStack(imageDataSaya, canvasKita, 490, 338, { r: 0, g: 0, b: 0 }, colors[6]);
    lib.floodFillStack(imageDataSaya, canvasKita, 110, 338, { r: 0, g: 0, b: 0 }, colors[6]);
    lib.floodFillStack(imageDataSaya, canvasKita, 475, 413, { r: 0, g: 0, b: 0 }, colors[6]);
    lib.floodFillStack(imageDataSaya, canvasKita, 126, 413, { r: 0, g: 0, b: 0 }, colors[6]);

    lib.floodFillStack(imageDataSaya, canvasKita, 210, 246, { r: 0, g: 0, b: 0 }, colors[7]);
    lib.floodFillStack(imageDataSaya, canvasKita, 390, 246, { r: 0, g: 0, b: 0 }, colors[7]);

    lib.floodFillStack(imageDataSaya, canvasKita, 237, 248, { r: 0, g: 0, b: 0 }, colors[8]);
    lib.floodFillStack(imageDataSaya, canvasKita, 366, 248, { r: 0, g: 0, b: 0 }, colors[8]);

    lib.floodFillStack(imageDataSaya, canvasKita, 184, 146, { r: 0, g: 0, b: 0 }, colors[9]);
    lib.floodFillStack(imageDataSaya, canvasKita, 417, 146, { r: 0, g: 0, b: 0 }, colors[9]);

    lib.floodFillStack(imageDataSaya, canvasKita, 460, 173, { r: 0, g: 0, b: 0 }, colors[10]);
    lib.floodFillStack(imageDataSaya, canvasKita, 143, 173, { r: 0, g: 0, b: 0 }, colors[10]);
}

function randColor() {
    let r = 1 + Math.floor(Math.random() * 255);
    let g = 1 + Math.floor(Math.random() * 255);
    let b = 1 + Math.floor(Math.random() * 255);
    return { r: r, g: g, b: b };
}

function gambar2(imageDataSaya, canvasKita) {
    // telinga
    lib.dda_line(imageDataSaya, canvasKita, [360, 140], [480, 120], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [470, 225], [480, 120], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [480, 120], [415, 165], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [240, 140], [120, 120], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [130, 225], [120, 120], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [120, 120], [185, 165], [0, 0, 1, 255]);

    // muka
    lib.lingkaran_polar(imageDataSaya, canvasKita, [300, 330], 200, [0, 0, 1, 255]);
    lib.lingkaran_polar(imageDataSaya, canvasKita, [300, 350], 180, [0, 0, 1, 255]);

    // halo
    lib.elips_polar(imageDataSaya, canvasKita, [300, 60], [100, 20], [0, 0, 1, 255]);
    lib.elips_polar(imageDataSaya, canvasKita, [300, 60], [150, 40], [0, 0, 1, 255]);

    // mata
    lib.lingkaran_polar(imageDataSaya, canvasKita, [370, 250], 30, [0, 0, 1, 255]);
    lib.lingkaran_polar(imageDataSaya, canvasKita, [365, 250], 15, [0, 0, 1, 255]);
    lib.lingkaran_polar(imageDataSaya, canvasKita, [230, 250], 30, [0, 0, 1, 255]);
    lib.lingkaran_polar(imageDataSaya, canvasKita, [235, 250], 15, [0, 0, 1, 255]);

    // hidung
    lib.lingkaran_polar(imageDataSaya, canvasKita, [300, 360], 40, [0, 0, 1, 255]);
    lib.elips_polar(imageDataSaya, canvasKita, [300, 335], [20, 10], [0, 0, 1, 255]);

    // mulut
    lib.setengah_lingkaran(imageDataSaya, canvasKita, [340, 400], 40, [0, 0, 1, 255]);
    lib.setengah_lingkaran(imageDataSaya, canvasKita, [260, 400], 40, [0, 0, 1, 255]);

    // kumis
    lib.dda_line(imageDataSaya, canvasKita, [405, 340], [570, 290], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [405, 380], [570, 420], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [195, 340], [30, 290], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [195, 380], [30, 420], [0, 0, 1, 255]);

    // tubuh
    lib.dda_line(imageDataSaya, canvasKita, [210, 510], [170, 600], [0, 0, 1, 255]);
    lib.dda_line(imageDataSaya, canvasKita, [390, 510], [430, 600], [0, 0, 1, 255]);
}

document.querySelector('#reset-color').addEventListener('click', function () {
    ctx.clearRect(1, 1, canvasKita.width - 2, canvasKita.height - 2);
    ctx2.clearRect(1, 1, canvasKita2.width - 2, canvasKita2.height - 2);

    imageDataSaya = ctx.getImageData(0, 0, canvasKita.width, canvasKita.height);
    imageDataSaya2 = ctx2.getImageData(0, 0, canvasKita2.width, canvasKita2.height);

    gambar1(imageDataSaya, canvasKita);
    gambar2(imageDataSaya2, canvasKita2);

    ctx.putImageData(imageDataSaya, 0, 0);
    ctx2.putImageData(imageDataSaya2, 0, 0);
});

canvasKita2.addEventListener('click', function (e) {
    let rect = canvasKita2.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    if ((mouseX >= 1) && (mouseY >= 1) && (mouseX <= canvasKita2.width - 2) && (mouseY <= canvasKita2.height - 2)) {
        var data = ctx2.getImageData(mouseX, mouseY, 1, 1).data;

        let red = parseInt(document.querySelector('#color-palet').value.substr(1, 2), 16);
        let green = parseInt(document.querySelector('#color-palet').value.substr(3, 2), 16);
        let blue = parseInt(document.querySelector('#color-palet').value.substr(5, 2), 16);

        if (red != 0 && green != 0 && blue != 0 &&
            red != data[0] && green != data[1] && blue != data[2]) {
            lib.floodFillStack(imageDataSaya2, canvasKita2, Math.ceil(mouseX), Math.ceil(mouseY), { r: data[0], g: data[1], b: data[2] }, { r: red, g: green, b: blue });
            ctx2.putImageData(imageDataSaya2, 0, 0);
        }
    }
});