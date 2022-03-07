/**
 * CS559 Spring 2021 Example Solution
 * Written by CS559 course staff
 */

// @ts-check
/* jshint -W069, -W141, esversion:6 */
export {};  // null statement to tell VSCode we're doing a module

/**
 * drawing function for box 2
 * 
 * draw a picture using curves!
 **/
/* no need for onload - we use defer */

/** @type {HTMLCanvasElement} */ const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas is not HTML Element");
}

// Begin Example Solution
/** @type {CanvasRenderingContext2D} */ const context = canvas.getContext("2d");
/**
 * Generate random x coordinate
 */
function rand_x() {
    return Math.random() * canvas.width;
}
/**
 * Generate random y coordinate
 */
function rand_y() {
    return Math.random() * canvas.height;
}
/**
 * Generate random color component
 */
function rand_c() {
    return Math.random() * 255;
}
// Start at top-left corner and draw random path using bezier curves
/** @type {number[]} */ let [px0, py0, px1, py1, px2, py2] = [0, 0, 0, 0, 0, 0];
for (let i = 0; i < 100; i ++) 
{
  context.beginPath();
  context.strokeStyle = `rgb(${rand_c()}, ${rand_c()}, ${rand_c()})`; // CS559 Sample Code
  context.moveTo(px0, py0);
  px0 = rand_x();
  py0 = rand_y();
  px1 = rand_x();
  py1 = rand_y();
  context.bezierCurveTo(px2, py2, px1, py1, px0, py0);
  px2 = 2 * px0 - px1;
  py2 = 2 * py0 - py1;
  context.stroke();
}
// End Example Solution
