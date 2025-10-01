//Used chat gpt for help with shifting hue and triangles https://chatgpt.com/share/68dd9d0a-e6a0-8009-85b8-c0ecf8249327

let particles = [];
let flowFieldVectors = [];
let flowScale = 12;
let cols, rows;
let zOffset = 0;
let inc = 0.01;
let numParticles = 600;

function setup() {
  createCanvas(innerWidth, innerHeight);
  colorMode(HSB, 360, 100, 100, 100);
  cols = floor(width / flowScale);
  rows = floor(height / flowScale);
  flowFieldVectors = new Array(cols * rows);

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  background(10, 20, 15);
}

function draw() {
  fill(10, 20, 15, 10);
  rect(0, 0, width, height);

  let yOffset = 0;
  for (let y = 0; y < rows; y++) {
    let xOffset = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(map(y, 0, rows, 0.5, 2));
      flowFieldVectors[index] = v;
      xOffset += inc;
    }
    yOffset += inc;
  }
  zOffset += 0.003;

  for (let p of particles) {
    p.follow(flowFieldVectors);
    p.update();
    p.edges();
    p.show();
  }
}

function Particle() {
  this.position = createVector(random(width), random(height));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.maxSpeed = random(1.5, 3);
  this.size = random(4, 8);
  this.hue = random(180, 280);

  this.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.hue = (this.hue + 0.2) % 360;
  };

  this.applyForce = function (force) {
    this.acceleration.add(force);
  };

  this.follow = function (vectors) {
    let x = floor(this.position.x / flowScale);
    let y = floor(this.position.y / flowScale);
    let index = x + y * cols;
    let force = vectors[index];
    if (force) this.applyForce(force);
  };

  this.show = function () {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    fill(this.hue, 80, 100, 50);
    noStroke();
    triangle(
      -this.size / 2,
      this.size / 2,
      this.size / 2,
      this.size / 2,
      0,
      -this.size / 2
    );
    pop();
  };

  this.edges = function () {
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  };
}
