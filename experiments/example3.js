function setup() {
  createCanvas(innerWidth, innerHeight);
  background(100, 30, 200);
}

let flowerSize = 20;
let amount = 5;
let gap = 80;

function flower() {
  noStroke();
  let petals = 10;

  for (let y = 0; y < petals; y++) {
    for (let x = 0; x < petals; x++) {
      fill(200, 20, 80);
      rect(x, y, 40, 1);

      fill(14, 24, 100);
      rect(x, y, 20, 15);

      fill(100, 140, 20);
      ellipse(x, y, 20);

      rotate(PI / 5);
    }
  }
}

function draw() {
  let y = (height - flowerSize * amount - gap * (amount - 1)) / 2;
  for (let i = 0; i < amount; i++) {
    let x = width - flowerSize * amount - gap * (amount - 1) - 2;
    for (let j = 0; j < amount; j++) {
      push();
      translate(x, y);
      flower();
      pop();
      x += flowerSize + gap;
    }
    y += flowerSize + gap;
  }
}
