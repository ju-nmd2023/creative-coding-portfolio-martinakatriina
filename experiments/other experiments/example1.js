function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(255, 255, 255);

  const originalY = 300;
  const divider = 24;
  noiseSeed(0);

  beginShape();
  for (let x = 0; x < 600; x++) {
    // const y = originalY + Math.random() * 25;
    const y = originalY + noise(x / divider) * 150;
    vertex(x, y);
  }

  endShape();
  noLoop();
}
