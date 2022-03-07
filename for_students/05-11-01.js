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
 * draw the spiral - account for the checkbox and slider
 **/
/* no need for onload - we use defer */

/** @type {HTMLCanvasElement} */ const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas is not HTML Element");
}
/** @type {CanvasRenderingContext2D} */ const context = canvas.getContext("2d");

// Begin Example Solution
/** @type {HTMLInputElement} */ const slider = /** @type {HTMLInputElement} */ (document.getElementById("n" + "points"));
/** @type {HTMLInputElement} */ const checkbox = /** @type {HTMLInputElement} */ (document.getElementById("connect"));
/** @type {HTMLInputElement} */ const cardinal = /** @type {HTMLInputElement} */ (document.getElementById("cardinal"));
/** @type {HTMLInputElement} */ const bezierBox = /** @type {HTMLInputElement} */ (document.getElementById("bezier"));
function draw() {
    // clear the canvas whenever the slider changes its value or the checkbox is checked
    // need to draw everything again otherwise the spirals will stack on each other 
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 2;
    context.fillStyle = "blue";
    /** @type {number} */ const npt = Number(slider.value);
    /**
     * parameterization of the points' positions on the spiral
     * @param {number} u Parameter
     */
    function fx(u) {
        return (200 + u * 180 * Math.cos(2 * Math.PI * 4 * u)); // CS559 Sample Code
    }
    /**
     * parameterization of the points' positions on the spiral
     * @param {number} u Parameter
     */
    function fy(u) {
        return (200 + u * 180 * Math.sin(2 * Math.PI * 4 * u)); // CS559 Sample Code
    }
    /**
     * parameterization of the points' derivatives on the spiral
     * @param {number} u Parameter
     */
    function dfx(u) {
        return (180 * Math.cos(2 * Math.PI * 4 * u) - 2 * Math.PI * 4 * 180 * Math.sin(2 * Math.PI * 4 * u) * u); // CS559 Sample Code
    }
    /**
     * parameterization of the points' derivatives on the spiral
     * @param {number} u Parameter
     */
    function dfy(u) {
        return (180 * Math.sin(2 * Math.PI * 4 * u) + 2 * Math.PI * 4 * 180 * Math.cos(2 * Math.PI * 4 * u) * u); // CS559 Sample Code
    }
    if (checkbox.checked) {
        for (let i = 0; i < npt; i++) {
            /** @type {number} */ const u = i / npt; // parameter corresponding to point i
            /** @type {number} */ const u1 = (i + 1) / npt; // parameter corresponding to point i+1 (next point)
            // used to draw lines from point i to i+1
            context.strokeStyle = "blue";
            context.beginPath();
            // get the coordinates of point i
            /** @type {number} */ const x1 = fx(u);
            /** @type {number} */ const y1 = fy(u);
            // get the coordinates of point i+1
            /** @type {number} */ const x2 = fx(u1);
            /** @type {number} */ const y2 = fy(u1);
            context.moveTo(x1, y1);
            if (bezierBox.checked) {
                if (cardinal.checked) {
                    // estimate the derivatives with finite differences
                    // effectively a cardinal spline
                    // but we need the points before and after
                    const u0 = (i-1) / npt;
                    const u3 = (i+2) / npt;
                    const x0 = fx(u0);
                    const y0 = fy(u0);
                    const x3 = fx(u3);
                    const y3 = fy(u3);
                    const dx1 = (x2-x0)/2;
                    const dy1 = (y2-y0)/2;
                    const dx2 = (x3-x1)/2;
                    const dy2 = (y3-y1)/2;
                    context.bezierCurveTo(x1 + dx1/3,y1+dy1/3, x2-dx2/3,y2-dy2/3, x2,y2);
                } else {
                    // get the coordinates of point i
                    /** @type {number} */ const dx1 = dfx(u);
                    /** @type {number} */ const dy1 = dfy(u);
                    // get the coordinates of point i+1
                    /** @type {number} */ const dx2 = dfx(u1);
                    /** @type {number} */ const dy2 = dfy(u1);
                    const scale = 1 / 3 / npt;
                    context.bezierCurveTo(x1 + dx1 * scale, y1 + dy1 * scale, x2 - dx2 * scale, y2 - dy2 * scale, x2, y2);
                }
            }
            else context.lineTo(x2, y2);
            context.stroke();
        }
    } else {
        for (let i = 0; i < npt + 1; i++) {
            /** @type {number} */ const u = i / npt;
            /** @type {number} */ const x = fx(u);
            /** @type {number} */ const y = fy(u);
            context.fillRect(x - 1, y - 1, 3, 3); // CS559 Sample Code
        }
    }
}
// set the onchange functions of both the slider and the checkbox
// call draw() whenever the slider or the checkbox change their values
slider.onchange = draw;
checkbox.onchange = draw;
bezierBox.onchange = draw;
cardinal.onchange = draw;
// draw the initial spiral when the window loads
draw();
// End Example Solution