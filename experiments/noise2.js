function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  frameRate(30);
  numRows = Math.floor(height / size);
  numCols = Math.floor(width / size);
}
let numRows, numCols;
const size = 6.5;
const divider = 10;

let t = 0.005;
let t2 = 0.0015;

function draw() {
  background(10, 20, 30, 60);
  drawFirstLayer();
  drawSecondLayer();

  t += 0.01;
  t2 += 0.03;
}

function drawFirstLayer() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t) * TWO_PI * 0.5;
      let dx = cos(angle) * size * 0.5;
      let dy = sin(angle) * size * 0.5;
      fill(10, 40, 120, 100);
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
      fill(0, 200, 255, 180);
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
