/**
 * 05-01-01.js - a simple JavaScript file that gets loaded with
 * page 1 of Workbook 5 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

import { runCanvas } from "../libs/CS559/runCanvas.js";
import { functionGallery } from "./05-01-curves.js";

/* no onload - since we can use defer */

// note that checking that canvas is the right type of element tells typescript
// that this is the right type - it's a form of a safe cast 
let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

function draw1(canvas, t) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(20, 40);
    functionGallery(context, t, 0);
    context.restore();
}
runCanvas(canvas, draw1, 0, true, 0, 1, 0.02);


