//Used chatgpt for mousePressed functionalities: https://chatgpt.com/share/68dd77fb-c600-8009-92eb-fd6c3dcf98bc

let synth;
let circles = [];
let notes = ["C4", "D4", "E4", "G4", "A4", "C5"];

let toneLoop;
let transportStarted = false;
let loopRunning = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);

  synth = new Tone.Synth().toDestination();

  toneLoop = new Tone.Loop((time) => {
    let note = random(notes);
    synth.triggerAttackRelease(note, "8n", time);
    circles.push({
      x: mouseX,
      y: mouseY,
      size: 20,
      alpha: 255,
      col: color(random(30, 100), random(100, 255), random(100, 255), 255),
    });
  }, "8n");

  //Instructions
  textAlign(CENTER, CENTER);
  textSize(25);
  fill(255);
  noStroke();
  text("Click or press anywhere to make a sound!", width / 2, height / 2);
}

function draw() {
  background(83, 126, 114, 10);

  for (let c of circles) {
    noFill();
    stroke(c.col);
    strokeWeight(3);
    ellipse(c.x, c.y, c.size);

    c.size += 3;
    c.alpha -= 3;
    c.col.setAlpha(c.alpha);
  }
  circles = circles.filter((c) => c.alpha > 0);
}

function mousePressed() {
  Tone.start();

  if (!transportStarted) {
    Tone.Transport.start();
    transportStarted = true;
  }
  if (!loopRunning) {
    toneLoop.start();
    loopRunning = true;
  }
}
function mouseReleased() {
  toneLoop.stop();
  loopRunning = false;
}
function touchStarted() {
  mousePressed();

  return false;
}
function touchEnded() {
  mouseReleased();
  return false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
