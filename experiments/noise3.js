function setup() {
  createCanvas(innerWidth, innerHeight);
  numRows = Math.floor(height / size);
  numCols = Math.floor(width / size);
  noStroke();
  frameRate(100);
}

const size = 8;
const divider = 10;

let t = 0;
let t1 = 500;

function draw() {
  //background(105, 0, 55);
  drawFirstLayer();
  drawSecondLayer();

  t += 0.03;
  t1 += 0.09;
}

function drawFirstLayer() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t) * TWO_PI * 1.2;
      let dx = cos(angle) * size * 0.5;
      let dy = sin(angle) * size * 0.5;

      // let c = lerpColor(
      //    color(200, 50, 50, 150),
      //    color(50, 50, 200, 150),
      //    x / numCols
      // );
      let hue = ((x / numCols) * 360 + frameCount) % 360;
      fill(hue, 80, 100, 150);
      ellipse(x * size + dx, y * size + dy, size * 0.7);

      // let n = noise(x / divider, y / divider, t * 2);
      // let c = lerpColor(color(200, 50, 50, 150), co lor(50, 50, 200, 150), n);
      // fill(c);
      //ellipse(x * size + dx, y * size + dy, size * 0.7);
    }
  }
}

function drawSecondLayer() {
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let angle = noise(x / divider, y / divider, t1) * TWO_PI * 1.5;
      let dx = cos(angle) * size * 0.5;
      let dy = sin(angle) * size * 0.5;

      let hue = ((y / numRows) * 360 + frameCount * 2) % 360;
      fill(hue, 90, 100, 180);
      ellipse(x * size + dx, y * size + dy, size * 0.7);

      // let c = lerpColor(
      //   color(200, 50, 50, 150),
      //  color(50, 50, 200, 150),
      //   x / numCols
      //  );
      //  fill(c);
      //  ellipse(x * size + dx, y * size + dy, size * 0.7);
    }
  }
}
// for (let y = 0; y < numRows; y++) {
//   for (let x = 0; x < numCols; x++) {
//     let angle = noise(x / divider, y / divider, t) * TWO_PI * 1.5;
//     let dx = cos(angle) * size * 0.5;
//     let dy = sin(angle) * size * 0.5;
//     fill(180, 176, 101);
//     ellipse(x * size + dx, y * size + dy, size * 0.7);
//   }
// }
// t += 0.03;

//     for (let x = 0; x < numCols; x++) {
//       ellipse(x * size, y * size, size);
//       fill(200, 40, 10);
//       const value = noise(x / divider, y / divider) * size;
//       ellipse(size / 2 + x * size, size / 2 + y * size, value);
//     }
//   }
//   counter += 0.1;
// }
