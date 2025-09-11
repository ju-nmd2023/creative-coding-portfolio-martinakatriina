function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  frameRate(30);
}

const size = 4;
const divider = 12;
const numRows = 100;
const numCols = 100;
let t = 0;
let t2 = 500;

function draw() {
  background(30, 80, 90);
  drawFirstLayer();
  drawSecondLayer();

  t += 0.002;
  t2 += 0.04;
}

function drawFirstLayer() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t) * TWO_PI * 1.5;
      let dx = cos(angle) * size * 0.5;
      let dy = sin(angle) * size * 0.5;
      fill(30, 100, 200, 160);
      ellipse(x * size + dx, y * size + dy, size * 0.8);
    }
  }
}
//background(9, 67, 95);

function drawSecondLayer() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t2) * TWO_PI * 1.5;
      let dx = cos(angle) * size * 0.5;
      let dy = sin(angle) * size * 0.5;
      fill(0, 180, 255, 120);
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
