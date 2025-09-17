function setup() {
  createCanvas(innerWidth, innerHeight);
}

const size = 50;

function getRandomValue(pos, variance) {
  return pos + random(-variance, variance);
}

function drawLayers(x, y, size) {
  const variance = size / 30;
  const layers = floor(random(5, 12));

  stroke(random(10, 130));

  noFill();
  for (let i = 0; i < layers; i++) {
    const s = (size / layers) * i;
    const half = s / 2;

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
  background(255);

  for (let y = 0; y < 200; y++) {
    for (x = 0; x < 200; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size);
    }
  }
  noLoop();
}
