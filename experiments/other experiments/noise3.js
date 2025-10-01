let numRows, numCols;
const size = 7;
const divider = 12;

let t = 0;
let t2 = 0;

function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
  frameRate(30);
  numRows = Math.floor(height / size);
  numCols = Math.floor(width / size);
}

function draw() {
  background(10, 20, 30, 60);

  drawFirstLayer();
  drawSecondLayer();

  t += 0.01;
  t2 += 0.015;
}

function drawFirstLayer() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t) * TWO_PI;
      let offset = size * 0.5 * sin(t + x * 0.1 + y * 0.1);
      let px = x * size + cos(angle) * offset;
      let py = y * size + sin(angle) * offset;

      let hue = map(noise(x / 20, y / 20, t), 0, 1, 180, 250);
      fill(hue, 70, 100, 120);

      push();
      translate(px, py);
      rotate(angle * 2);
      triangle(-size / 2, size / 2, size / 2, size / 2, 0, -size / 2);
      pop();
    }
  }
}

function drawSecondLayer() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t2) * TWO_PI * 1.5;
      let offset = size * 0.3 * cos(t2 + x * 0.2 + y * 0.2);
      let px = x * size + cos(angle) * offset;
      let py = y * size + sin(angle) * offset;

      fill(160, 100, 100, 180);
      ellipse(px, py, size * 0.7 + offset);
    }
  }
}
