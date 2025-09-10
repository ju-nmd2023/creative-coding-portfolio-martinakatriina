function setup() {
  createCanvas(innerWidth, innerHeight);
}

const size = 10;
const divider = 10;
const numRows = 80;
const numCols = 80;

let counter = 100;
function draw() {
  background(255, 255, 255);
  noStroke();

  for (let y = 0; y < numRows; y++) {
    fill(200, 40, 50);

    for (let x = 0; x < numCols; x++) {
      ellipse(x * size, y * size, size);
      fill(200, 40, 10);
      const value = noise(x / divider, y / divider) * size;
      ellipse(size / 2 + x * size, size / 2 + y * size, value);
    }
  }
  counter += 0.1;
}
