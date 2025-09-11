function setup() {
  createCanvas(innerWidth, innerHeight);
  noStroke();
}

const size = 5;
const divider = 10;
const numRows = 200;
const numCols = 200;
let t = 0;

function draw() {
  background(9, 67, 95);

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t) * TWO_PI * 1.5;
      let dx = cos(angle) * size * 0.5;
      let dy = sin(angle) * size * 0.5;
      fill(56, 165, 190);
      ellipse(x * size + dx, y * size + dy, size * 0.8);
    }
  }
  t += 0.05;
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
