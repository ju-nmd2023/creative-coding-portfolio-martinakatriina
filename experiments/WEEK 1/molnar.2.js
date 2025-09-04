function setup() {
  createCanvas(innerWidth, innerHeight);
}

const size = 100;
const layers = 10;

function getRandomValue(pos, variance) {
  return pos + random(-variance, variance);
}

function drawLayers(x, y, size, layers) {
  const variance = size / 20;

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
  background(190, 250, 210);

  for (let y = 0; y < 10; y++) {
    for (x = 0; x < 10; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }
  noLoop();
}
