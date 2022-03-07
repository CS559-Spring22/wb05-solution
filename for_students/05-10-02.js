/**
 * 05-10-02.js - a simple JavaScript file that gets loaded with
 * page 10 of Workbook 5 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

import { RunCanvas } from "../libs/CS559/runCanvas.js";

/* no need for onload - we use defer */
// note that checking that canvas is the right type of element tells typescript
// that this is the right type - it's a form of a safe cast 
let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

function draw(canvas, t) {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.translate(20, 20);

    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(300, 0);
    context.stroke();

    let [x, y] = [t, 0];
    context.fillStyle = "red";
    context.fillRect(300 * x - 5, y - 5, 10, 10);

    let [x2, y2] = [t * t, 0];
    context.fillStyle = "green";
    context.fillRect(300 * x2 - 5, y2 - 5, 10, 10);
    context.restore();
}

let rc = new RunCanvas(canvas, draw);
rc.setupSlider(0, 1, 0.02);
rc.setValue(0);


