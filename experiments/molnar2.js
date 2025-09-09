function setup() {
  createCanvas(innerWidth, innerHeight);
}

const size = 60;
const layers = 10;
let gap = 20;

function getRandomValue(pos, variance) {
  return pos + random(-variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 20;
  stroke(202, 209, 131);

  noFill();
  for (let i = 0; i < layers; i++) {
    const s = (size / layers) * i;
    const half = s / 2;
    //  rectMode(CENTER);
    // rect(x - half, y - half, s, s);

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
  background(102, 2, 60);

  for (let y = 0; y < 10; y++) {
    for (x = 0; x < 10; x++) {
      drawLayers(
        size / 2 + x * (size + gap),
        size / 2 + y * (size + gap),
        size,
        layers
      );
    }
  }
  noLoop();
}
