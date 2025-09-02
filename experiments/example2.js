function setup() {
  createCanvas(innerWidth, innerHeight);
}

const size = 10;
const divider = 20;
const numRows = 60;
const numCols = 60;

let counter = 0;
function draw() {
  background(255, 255, 255);
  noStroke();
  fill(0, 0, 0);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      ellipse(x * size, y * size, size);

      const value = noise(x / divider, y / divider) * size;
      ellipse(size / 2 + x * size, size / 2 + y * size, value);
    }
  }
  counter += 0.1;
}
