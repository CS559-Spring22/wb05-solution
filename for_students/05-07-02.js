/**
 * 05-07-02.js - a simple JavaScript file that gets loaded with
 * page 7 of Workbook 5 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

import { draggablePoints } from "../libs/CS559/dragPoints.js";
import { runCanvas } from "../libs/CS559/runCanvas.js";
import { decastle } from "./05-07-decastlejau.js";
import { makeCheckbox, makeButton } from "../libs/CS559/inputHelpers.js";

/* no need for onload - we use defer */

let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");
let context = canvas.getContext("2d");
let pts = [
    [100, 300],
    [100, 100],
    [300, 100],
    [300, 300]
];
let border = 50;
let ext = [[border, border], [canvas.width - border, canvas.height - border]];

function normalize(pt = [0, 0], xy = 0) {
    return (pt[xy] - ext[0][xy]) / (ext[1][xy] - ext[0][xy]) * ((xy ? canvas.height : canvas.width) - border * 2) + border;
}

function revert(pt = [0, 0], xy = 0) {
    return (pt[xy] - border) / ((xy ? canvas.height : canvas.width) - border * 2) * (ext[1][xy] - ext[0][xy]) + ext[0][xy];
}

function label(index = 0) {
    let total = pts.length;
    let level = 0;
    let current = index;
    while (current >= total) {
        current -= total;
        total--;
        level++;
    }
    if (level == 0) return index.toString();
    else return label(index - total - 1).substring(0, level) + label(index - total).substring(level - 1);
}

function update() {
    let value = textArea.value.split("\n");
    if (value.length > 1) {
        pts = value.map(vi => vi.split(",").map(Number));
        ext[0][0] = pts.reduce((min, pt) => Math.min(min, pt[0]), canvas.width);
        ext[1][0] = pts.reduce((max, pt) => Math.max(max, pt[0]), 0);
        ext[0][1] = pts.reduce((min, pt) => Math.min(min, pt[1]), canvas.height);
        ext[1][1] = pts.reduce((max, pt) => Math.max(max, pt[1]), 0);
        pts = pts.map(pt => [normalize(pt, 0), normalize(pt, 1)]);
        wrapDraw();
    }
}

function wrapDraw() {
    draw(canvas, Number(slider.value));
}

let nameBox = makeCheckbox("name", undefined, "Name");
nameBox.onchange = wrapDraw;
let positionBox = makeCheckbox("position", undefined, "Position");
positionBox.onchange = wrapDraw;
let button = makeButton("Draw", undefined);
button.onclick = update;
let textArea = document.createElement("textarea");
textArea.id = "text";
document.body.appendChild(textArea);
let dotSize = 8;

function draw(canvas, t) {
    let name = nameBox.checked;
    let position = positionBox.checked;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    let p = decastle(context, pts, t, 50);
    if (name) {
        context.textAlign = "right";
        p.forEach(function (pi, i) {
            context.strokeText(label(i), pi[0] - dotSize / 2, pi[1] - dotSize / 2);
        });
    }
    if (position) {
        context.textAlign = "left";
        p.forEach(function (pi) {
            context.strokeText("(" + Number(revert(pi, 0).toFixed(3)) + ", " + Number(revert(pi, 1).toFixed(3)) + ")", pi[0] + dotSize, pi[1] + dotSize);
        });
    }
    context.restore();
}
runCanvas(canvas, draw, 0, true, 0, 1, 0.0001);
let slider = /** @type {HTMLInputElement} */ (document.getElementById("canvas1-slider"));

draggablePoints(canvas, pts, function () {
    draw(canvas, Number(slider.value));
});


