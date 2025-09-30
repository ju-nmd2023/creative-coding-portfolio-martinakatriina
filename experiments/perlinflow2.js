// Code inspired by Daniel Shiffman,  https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

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
  //changed speed to random
  this.maxSpeed = random(2, 3);

  this.previousPosition = this.position.copy();

  this.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.follow = function (vectors) {
    let x = floor(this.position.x / flowScale);
    let y = floor(this.position.y / flowScale);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  };

  this.applyForce = function (force) {
    this.acceleration.add(force);
  };

  this.show = function () {
    stroke(
      this.color.levels[0],
      this.color.levels[1],
      this.color.levels[2],
      10
    );
    strokeWeight(1);
    line(
      this.position.x,
      this.position.y,
      this.previousPosition.x,
      this.previousPosition.y
    );
    //point(this.pos.x, this.pos.y);
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

// main sketch

let inc = 0.1;
let flowScale = 10;
let cols, rows;
let zOffset = 0;
let fr;
let particles = [];
let flowFieldVectors = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  cols = floor(width / flowScale);
  rows = floor(height / flowScale);

  flowFieldVectors = new Array(cols * rows);

  for (var i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
  background(5, 8, 1);
}

function draw() {
  let yOffset = 0;
  for (let y = 0; y < rows; y++) {
    let xOffset = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 5;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowFieldVectors[index] = v;
      xOffset += inc;
      stroke(0, 50);
    }
    yOffset += inc;
    zOffset += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowFieldVectors);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
