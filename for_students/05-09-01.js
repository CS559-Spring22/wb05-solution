/**
 * CS559 Spring 2021 Example Solution
 * Written by CS559 course staff
 */

// @ts-check
/* jshint -W069, -W141, esversion:6 */
export { };  // null statement to tell VSCode we're doing a module

/**
 * drawing function for box 1
 * 
 * recreate the picture from SVG - but don't use quadratics
 * 
 **/
/* no need for onload - we use defer */

/** @type {HTMLCanvasElement} */ const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas is not HTML Element");
}
/** @type {CanvasRenderingContext2D} */ const context = canvas.getContext("2d");

// Begin Example Solution
// Use the fact that the derivative vector is twice the vector between the control points for quadratic curves and three times the vector between the control points for cubic curves.
/** @type {number} */ const offSet = 50 * 2 / 3;
context.strokeStyle = "black";
context.fillStyle = "#CCC";
context.lineWidth = 5;
context.beginPath();
context.moveTo(150, 100);
context.bezierCurveTo(150, 100 + offSet, 100 + offSet, 150, 100, 150);
context.bezierCurveTo(100 - offSet, 150, 50, 100 + offSet, 50, 100);
context.bezierCurveTo(50, 100 - offSet, 100 - offSet, 50, 100, 50);
context.bezierCurveTo(100, 50 + offSet, 150 - offSet, 100, 150, 100);
context.closePath();
context.fill();
context.stroke();

// End Example Solution


