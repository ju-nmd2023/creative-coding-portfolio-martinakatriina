// Gradient swirl with particle trails
// Inspired by Daniel Shiffman: https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

let inc = 0.01;
let flowScale = 15;
let cols, rows;
let zOffset = 0;
let particles = [];
let flowFieldVectors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  cols = floor(width / flowScale);
  rows = floor(height / flowScale);
  flowFieldVectors = new Array(cols * rows);

  for (let i = 0; i < 1000; i++) {
    particles.push(new Particle());
  }

  background(0, 0, 0);
}

function draw() {
  // Semi-transparent background for fading trails
  fill(0, 0, 0, 5);
  rect(0, 0, width, height);

  let yOffset = 0;
  let centerX = width / 2;
  let centerY = height / 2;

  // Build swirling flow field
  for (let y = 0; y < rows; y++) {
    let xOffset = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;

      let posX = x * flowScale;
      let posY = y * flowScale;

      // Polar coordinates from center
      let angle = atan2(posY - centerY, posX - centerX);

      // Swirl influenced by Perlin noise
      let noiseVal = noise(xOffset, yOffset, zOffset);
      let swirl = map(noiseVal, 0, 1, -PI, PI);

      let v = p5.Vector.fromAngle(angle + swirl);
      v.setMag(1);
      flowFieldVectors[index] = v;

      xOffset += inc;
    }
    yOffset += inc;
  }
  zOffset += 0.002; // speed up animation

  // Update and draw particles
  for (let p of particles) {
    p.follow(flowFieldVectors);
    p.update();
    p.edges();
    p.show();
  }
}

// --- Particle class ---
function Particle() {
  this.position = createVector(random(width), random(height));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.color = random([
    color(40, 60, 70, 30),
    color(125, 123, 62, 30),
    color(215, 202, 145, 30),
    color(207, 220, 140, 30),
    color(181, 200, 197, 30),
    color(237, 191, 228, 30),
  ]);
  this.maxSpeed = random(2, 3);
  this.previousPosition = this.position.copy();

  this.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.applyForce = function (force) {
    this.acceleration.add(force);
  };

  this.follow = function (vectors) {
    let x = constrain(floor(this.position.x / flowScale), 0, cols - 1);
    let y = constrain(floor(this.position.y / flowScale), 0, rows - 1);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  };

  this.show = function () {
    stroke(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      20
    );
    strokeWeight(1.5);
    line(
      this.position.x,
      this.position.y,
      this.previousPosition.x,
      this.previousPosition.y
    );
    this.updatePreviousPosition();
  };

  this.updatePreviousPosition = function () {
    this.previousPosition.x = this.position.x;
    this.previousPosition.y = this.position.y;
  };

  this.edges = function () {
    if (this.position.x > width) {
      this.position.x = 0;
      this.updatePreviousPosition();
    }
    if (this.position.x < 0) {
      this.position.x = width;
      this.updatePreviousPosition();
    }
    if (this.position.y > height) {
      this.position.y = 0;
      this.updatePreviousPosition();
    }
    if (this.position.y < 0) {
      this.position.y = height;
      this.updatePreviousPosition();
    }
  };
}
