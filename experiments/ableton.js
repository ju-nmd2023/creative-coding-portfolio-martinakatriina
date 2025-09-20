function preload() {
  handpose = ml5.handPose();
}
let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(648, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  //handpose.detectStart(video, getHandsData);

  handpose.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Handpose loaded");
}

const drums = new Tone.Player(drums.mp3).toDestination();
const vocals = new Tone.Player(vocals.mp3).toDestination();
const bass = new Tone.Player(bass.mp3).toDestination();
const melody = new Tone.Player(melody.mp3).toDestination();
const transition = new Tone.Player(transition.mp3).toDestination();

drums.sync().start(0);
vocals.sync().start(0);
bass.sync().start(0);
melody.sync().start(0);
transition.sync().start(0);

Tone.Transport.start();

document.querySelector("button")?.addEventListener("click", async () => {
  await Tone.start();
  console.log("audio ready");
});

function draw() {
  image(video, 0, 0, width, height);

  for (let hand of hands) {
    let indexFinger = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let centerX = (indexFinger.x + thumb.x) / 2;
    let centerY = (indexFinger.y + thumb.y) / 2;

    let distance = dist(indexFinger.x, indexFinger.y, thumb.x, thumb.y);

    noStroke();
    fill(100, 200, 80);
    ellipse(centerX, centerY, distance);
    if (distance !== null) {
      let volume = map(distance, 10, 100, 1, 0);
      volume = constrain(volume, 0, 1);
    }
  }
}

function getHandsData(results) {
  hands = results;
}
