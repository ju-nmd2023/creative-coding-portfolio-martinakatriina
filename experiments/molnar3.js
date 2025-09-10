//Added stroke weight variation, a color palette, and frame rate

function setup() {
  createCanvas(innerWidth, innerHeight);
  frameRate(30);

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      squares.push(
        new Square(
          x * (startingSize + gap) + startingSize / 2,
          y * (startingSize + gap) + startingSize / 2
        )
      );
    }
  }
}

let startingSize = 60;
const layers = 9;
let gap = 5;
let squares = [];

const Palette = [
  [89, 80, 130],
  [44, 38, 63],
  [66, 100, 74],
  [102, 2, 60],
  [43, 12, 26],
  [0, 54, 49],
  [153, 38, 43],
  [202, 237, 184],
];
//const size = 60;
// let minSize = 40;
// let maxSize = 120;
// let growing = true;

function getRandomValue(pos, variance) {
  return pos + random(-variance, variance);
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(40, 120);
    this.minSize = 50;
    this.maxSize = 90;
    this.growing = random([true, false]);
    this.speed = (3, 6);
    this.color = random(Palette);
    this.colorTimer = 0;
    this.colorInterval = floor(random(60, 600));
  }
  update() {
    if (this.growing) {
      this.size += this.speed;
      if (this.size >= this.maxSize) this.growing = false;
    } else {
      this.size -= this.speed;
      if (this.size <= this.minSize) this.growing = true;
    }

    this.colorTimer++;
    if (this.colorTimer >= this.colorInterval) {
      this.color = random(Palette);
      this.colorTimer = 0;
    }
  }

  display() {
    frameRate(10);
    const variance = this.size / 60;
    let c = random(Palette);
    stroke(this.color[0], this.color[1], this.color[2]);
    noFill();

    for (let i = 0; i < layers; i++) {
      const s = (this.size / layers) * i;
      const half = s / 2;

      strokeWeight(random(0.5, 3));

      //  rectMode(CENTER);
      // rect(x - half, y - half, s, s);

      beginShape();
      vertex(
        getRandomValue(this.x - half, variance),
        getRandomValue(this.y - half, variance)
      );
      vertex(
        getRandomValue(this.x + half, variance),
        getRandomValue(this.y - half, variance)
      );
      vertex(
        getRandomValue(this.x + half, variance),
        getRandomValue(this.y + half, variance)
      );
      vertex(
        getRandomValue(this.x - half, variance),
        getRandomValue(this.y + half, variance)
      );
      endShape(CLOSE);
    }
  }
}
function draw() {
  background(249, 198, 98);
  for (let s1 of squares) {
    s1.update();
    s1.display();
  }
}
