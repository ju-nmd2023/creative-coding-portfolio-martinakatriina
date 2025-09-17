//Added stroke weight variation, random colors, a frame rate, and visual effect of layers adding on to each other

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(3);
}

const size = 60;
const layers = 9;

let gap = 0;

function getRandomValue(pos, variance) {
  return pos + random(-variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 50;
  stroke(random(255), random(255), random(255));

  noFill();
  for (let i = 0; i < layers; i++) {
    const s = (size / layers) * i;
    const half = s / 2;

    strokeWeight(random(0.3, 1.8));

    beginShape();
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y - half, variance)
    );
    vertex(
      getRandomValue(x + half, variance),
      getRandomValue(y + half, variance)
    );
    vertex(
      getRandomValue(x - half, variance),
      getRandomValue(y + half, variance)
    );
    endShape(CLOSE);
  }
}

function draw() {
  //background(50, 10, 0);
  background(220, 2);
  noFill();

  for (let y = 0; y < 200; y++) {
    for (x = 0; x < 200; x++) {
      push();
      drawLayers(
        size / 2 + x * (size + gap),
        size / 2 + y * (size + gap),
        size,
        layers
      );
      pop();
    }
  }
}
