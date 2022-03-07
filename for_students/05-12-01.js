/**
 * CS559 Spring 2021 Example Solution
 * Written by CS559 course staff
 */

// @ts-check
/* jshint -W069, esversion:6 */

/**
 * drawing function for box 1
 *
 * draw something.
 **/

// note that checking that canvas is the right type of element tells typescript
// that this is the right type - it's a form of a safe cast 
let canvas = document.getElementById("canvas1");
if (!(canvas instanceof HTMLCanvasElement))
    throw new Error("Canvas is not HTML Element");

let context = canvas.getContext("2d");

context.beginPath();

// change these so that rather than connecting with straight lines,
// they use cardinal interpolation
// your points should cycle - to make a loop

context.moveTo(50, 150);     // you don't need to change this line
context.lineTo(350, 150);    // this line gets replaced by a bezierCurveTo
context.lineTo(350, 50);     // this line gets replaced by a bezierCurveTo
context.lineTo(200, 100);    // this line gets replaced by a bezierCurveTo
context.lineTo(50, 50);      // this line gets replaced by a bezierCurveTo
context.lineTo(50, 150);     // this line gets replaced by a bezierCurveTo

// Begin Example Solution
context.closePath();
context.lineWidth = 3;
context.strokeStyle = "black";
context.stroke();
context.beginPath();
context.moveTo(50, 150);
context.bezierCurveTo(50 + (350 - 50) / 6, 150 + (150 - 50) / 6, 350 + (50 - 350) / 6, 150 + (150 - 50) / 6, 350, 150);
context.bezierCurveTo(350 + (350 - 50) / 6, 150 + (50 - 150) / 6, 350 + (350 - 200) / 6, 50 + (150 - 100) / 6, 350, 50);
context.bezierCurveTo(350 + (200 - 350) / 6, 50 + (100 - 150) / 6, 200 + (350 - 50) / 6, 100 + (50 - 50) / 6, 200, 100);
context.bezierCurveTo(200 + (50 - 350) / 6, 100 + (50 - 50) / 6, 50 + (200 - 50) / 6, 50 + (100 - 150) / 6, 50, 50);
context.bezierCurveTo(50 + (50 - 200) / 6, 50 + (150 - 100) / 6, 50 + (50 - 350) / 6, 150 + (50 - 150) / 6, 50, 150);
context.strokeStyle = "red";
// End Example Solution

context.closePath();
context.lineWidth = 3;
context.stroke();

// Begin Example Solution for 06-01-02
class point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    times(a) {
        return new point(this.x * a, this.y * a);
    }
    add(anotherPoint) {
        return new point(this.x + anotherPoint.x, this.y + anotherPoint.y);
    }
}
let p0 = new point(0, 100);
let p1 = new point(50, 0);
let p2 = new point(100, 150);
let p3 = new point(150, 0);
function interpolate(p, q, u) {
    return p.times(1 - u).add(q.times(u));
}
function computeCtrlPoints(p0, p1, p2, p3, u) {
    let p01 = interpolate(p0, p1, u);
    let p12 = interpolate(p1, p2, u);
    let p23 = interpolate(p2, p3, u);
    let p0112 = interpolate(p01, p12, u);
    let p1223 = interpolate(p12, p23, u);
    let p01121223 = interpolate(p0112, p1223, u);
    return {
        "p0": p0,
        "p1": p1,
        "p2": p2,
        "p3": p3,
        "p01": p01,
        "p12": p12,
        "p23": p23,
        "p0112": p0112,
        "p1223": p1223,
        "p01121223": p01121223
    };
}
// divide the curve at 1/3
let cp1 = computeCtrlPoints(p0, p1, p2, p3, 1 / 3);
// divide the next at its halfway point
let cp2 = computeCtrlPoints(cp1['p01121223'], cp1['p1223'], cp1['p23'], p3, 1 / 2);
// first curve
console.log("M " + cp1["p0"].x + "," + cp1["p0"].y +
    " C " + cp1["p01"].x + "," + cp1["p01"].y +
    " , " + cp1["p0112"].x + "," + cp1["p0112"].y +
    " , " + cp1["p01121223"].x + "," + cp1["p01121223"].y);
// second curve
console.log("M " + cp2["p0"].x + "," + cp2["p0"].y +
    " C " + cp2["p01"].x + "," + cp2["p01"].y +
    " , " + cp2["p0112"].x + "," + cp2["p0112"].y +
    " , " + cp2["p01121223"].x + "," + cp2["p01121223"].y);
// third curve
console.log("M " + cp2["p01121223"].x + "," + cp2["p01121223"].y +
    " C " + cp2["p1223"].x + "," + cp2["p1223"].y +
    " , " + cp2["p23"].x + "," + cp2["p23"].y +
    " , " + cp2["p3"].x + "," + cp2["p3"].y);
// End Example Solution for 06-01-02