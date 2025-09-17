function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  frameRate(30);
  numRows = Math.floor(height / size);
  numCols = Math.floor(width / size);
}
let numRows, numCols;
const size = 4;
const divider = 12;

let t = 0;
let t2 = 500;

function draw() {
  background(10, 20, 30);
  drawFirstLayer();
  drawSecondLayer();

  t += 0.002;
  t2 += 0.04;
}

function drawFirstLayer() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t) * TWO_PI * 1.2;
      let dx = cos(angle) * size * 0.5;
      let dy = sin(angle) * size * 0.5;
      fill(30, 20, 20, 80);
      ellipse(x * size + dx, y * size + dy, size * 0.8);
    }
  }
}
//background(9, 67, 95);

function drawSecondLayer() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t2) * TWO_PI * 1.2;
      let dx = cos(angle) * size * 0.5;
      let dy = sin(angle) * size * 0.5;
      fill(0, 220, 255, 190);
      ellipse(x * size + dx, y * size + dy, size * 0.8);
    }
  }
}
//     for (let x = 0; x < numCols; x++) {
//       ellipse(x * size, y * size, size);
//       fill(200, 40, 10);
//       const value = noise(x / divider, y / divider) * size;
//       ellipse(size / 2 + x * size, size / 2 + y * size, value);
//     }
//   }
//   counter += 0.1;
// }
