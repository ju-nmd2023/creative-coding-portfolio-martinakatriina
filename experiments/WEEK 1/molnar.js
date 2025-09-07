function setup() {
  createCanvas(innerWidth, innerHeight);
  background(100, 30, 200);
}

let flowerSize = 20;
let amount = 8;
let gap = 80;

function flower() {
  noStroke();
  let petals = 14;

  for (let y = 0; y < petals; y++) {
    for (let x = 0; x < petals; x++) {
      fill(200, 20, 80);
      rect(x, y, 40, 1, 200);

      fill(14, random(20, 200), 100);
      rect(x, y, 20, 15, 50);

      fill(100, 190, 20);
      ellipse(x, y, 10);

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
  noLoop();
}
