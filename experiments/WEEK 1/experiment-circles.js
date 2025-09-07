let circles = [];
let numCircles = 50; // fewer circles to avoid clutter
let colors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  strokeWeight(1);

  // Limited color palette
  colors = [
    color(0, 0, 100), // white
    color(0, 0, 0), // black
    color(0, 100, 100), // red
    color(240, 100, 100), // blue
    color(270, 100, 100), // purple
    color(147, 171, 237),
    color(109, 140, 39), // purple
    color(178, 144, 51), // purple
  ];
  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < numCircles; i++) {
    let radius = random(40, 100);
    let angle = random(TWO_PI);
    let speed = random(0.04, 0.09);
    let spiralOffset = 0;

    // Create a separate graphics layer for each circle
    let pg = createGraphics(width, height);
    pg.colorMode(HSB, 360, 100, 100);
    pg.strokeWeight(1);
    pg.noFill();

    // Random center and color
    let centerX = random(width);
    let centerY = random(height);
    let col = random(colors);

    circles.push({
      x: centerX,
      y: centerY,
      radius,
      angle,
      speed,
      spiralOffset,
      layer: pg,
      col: col,
    });
  }
}

function draw() {
  background(150, 155, 138); // black background

  for (let c of circles) {
    let r = c.radius - c.spiralOffset;
    let px = c.x + r * cos(c.angle);
    let py = c.y + r * sin(c.angle);

    // Draw the point on its own layer
    c.layer.stroke(c.col);
    c.layer.ellipse(px, py, 2, 2);

    // Update angle and spiral offset
    c.angle += c.speed;
    c.spiralOffset += 0.1;

    if (c.spiralOffset >= c.radius) {
      c.spiralOffset = 0;
      c.angle = random(TWO_PI);
    }

    // Draw the layer onto the main canvas
    image(c.layer, 0, 0);
  }
}
