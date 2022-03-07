/**
 * CS559 Spring 2021 Example Solution
 * Written by CS559 course staff
 */

/**
 * 05-10-03.js - a simple JavaScript file that gets loaded with
 * page 10 of Workbook 5 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

import { RunCanvas } from "../libs/CS559/runCanvas.js";

function lerpPt(a, b, u) {
  return [a[0] * (1 - u) + b[0] * u, a[1] * (1 - u) + b[1] * u];
}

let triPt1 = [10, 10];
let triPt2 = [10 + 120, 10 + 50];
let triPt3 = [10, 10 + 50];

function myTri(t) {
  if (t < 1) return lerpPt(triPt1, triPt2, t);
  else if (t < 2) return lerpPt(triPt2, triPt3, t - 1);
  else return lerpPt(triPt3, triPt1, t - 2);
}

function myTriAL(t) {
  // students should write this!
  // Begin Example Solution
  let len1 = 130;
  let len2 = 120;
  let len3 = 50;
  let st = t * (len1 + len2 + len3) / 3;
  if (st < len1) return (lerpPt(triPt1, triPt2, st / len1));
  else if (st < len1 + len2) return (lerpPt(triPt2, triPt3, (st - len1) / len2));
  else return lerpPt(triPt3, triPt1, (st - len1 - len2) / len3);
  // End Example Solution
}

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

  context.scale(2, 2);

  context.strokeStyle = "black";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(10, 10);
  context.lineTo(10 + 120, 10 + 50);
  context.lineTo(10, 10 + 50);
  context.closePath();
  context.stroke();

  let [x, y] = myTri(t);
  context.fillStyle = "red";
  context.fillRect(x - 5, y - 5, 10, 10);

  let [x2, y2] = myTriAL(t);
  context.fillStyle = "green";
  context.fillRect(x2 - 5, y2 - 5, 10, 10);
  context.restore();
}
let rc = new RunCanvas(canvas, draw);
rc.setupSlider(0, 3, 0.05);
rc.setValue(0);

