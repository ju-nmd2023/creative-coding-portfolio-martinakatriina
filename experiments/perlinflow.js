// Code inspired by Daniel Shiffman,  https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

function Particle() {
  this.position = createVector(random(width), random(height));
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);

  //changed speed to random
  this.maxSpeed = random(2, 4);

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
    stroke(0, 5);
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

// main

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
  background(255);
}

function draw() {
  let yOffset = 0;
  for (let y = 0; y < rows; y++) {
    let xOffset = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 5;
      let v = p5.Vector.fromAngle(angle);

      //changed flow field magnitude
      v.setMag(2);
      flowFieldVectors[index] = v;
      xOffset += inc;
      stroke(0, 50);
    }
    yOffset += 0.05;
    zOffset += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowFieldVectors);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
