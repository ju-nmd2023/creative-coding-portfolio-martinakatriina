let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(648, 480);

  video = createCapture(VIDEO);
  video.size(640, 480);

  handpose = ml5.handpose(video, modelReady);
  //handpose.detectStart(video, getHandsData);

  handpose.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Handpose loaded");
}

const drums = new Tone.Player("experiments/ableton/drums.mp3").toDestination();
const vocals = new Tone.Player(
  "experiments/ableton/vocals.mp3"
).toDestination();
const bass = new Tone.Player("experiments/ableton/bass.mp3").toDestination();
const melody = new Tone.Player(
  "experiments/ableton/melody.mp3"
).toDestination();
const transition = new Tone.Player(
  "experiments/ableton/transition.mp3"
).toDestination();

const startButton = document.getElementById("startAudio");
startButton.addEventListener("click", async () => {
  await Tone.start();
  drums.sync().start(0);
  vocals.sync().start(0);
  bass.sync().start(0);
  melody.sync().start(0);
  transition.sync().start(0);

  Tone.Transport.start();
  console.log("audio ready");
});

function draw() {
  background(0);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    let hand = predictions[0];

    //finger tips
    let indexFinger = hand.landmarks[8];
    let middleFinger = hand.landmarks[12];
    let ringFinger = hand.landmarks[16];
    let pinkyFinger = hand.landmarks[20];
    let thumb = hand.landmarks[4];

    //disytances between thumb and fingers

    let indexDist = dist(thumb[0], thumb[1], indexFinger[0], indexFinger[1]);
    let middleDist = dist(thumb[0], thumb[1], middleFinger[0], middleFinger[1]);
    let ringDist = dist(thumb[0], thumb[1], ringFinger[0], ringFinger[1]);
    let pinkyDist = dist(thumb[0], thumb[1], pinkyFinger[0], pinkyFinger[1]);

    //equaling distances to volumes
    let indexVolume = constrain(map(indexDist, 20, 150, 1, 0), 0, 1);
    let middleVolume = constrain(map(middleDist, 20, 150, 1, 0), 0, 1);
    let ringVolume = constrain(map(ringDist, 20, 150, 1, 0), 0, 1);
    let pinkyVolume = constrain(map(pinkyDist, 20, 150, 1, 0), 0, 1);

    // add volume to each track
    drums.volume.value = Tone.gainToDb(
      lerp(drums.volume.value, indexVolume, 0.2)
    );
    bass.volume.value = Tone.gainToDb(middleVolume);
    melody.volume.value = Tone.gainToDb(ringVolume);
    vocals.volume.value = Tone.gainToDb(pinkyVolume);

    //drawing circles to view changes
    drawChange(thumb, indexFinger, indexDist, "red");
    drawChange(thumb, middleFinger, middleDist, "yellow");
    drawChange(thumb, ringFinger, ringDist, "blue");
    drawChange(thumb, pinkyFinger, pinkyDist, "pink");
  }
}
function drawChange(thumb, finger, distance, col) {
  let centerX = (finger[0] + thumb[0]) / 2;
  let centerY = (finger[1] + thumb[1]) / 2;
  noStroke();
  fill(col);
  ellipse(centerX, centerY, distance * 0.5);
}

// let distance = dist(indexFinger[0], indexFinger[1], thumb[0], thumb[1]);

// let voluume = map(distance, 10, 100, 1, 0);
// volume = constrain(volume, 0, 1);

// for (let hand of hands) {
// let indexFinger = hand.index_finger_tip;
//  // let thumb = hand.thumb_tip;
//   let centerX = (indexFinger.x + thumb.x) / 2;
//   let centerY = (indexFinger.y + thumb.y) / 2;

//   let distance = dist(indexFinger.x, indexFinger.y, thumb.x, thumb.y);

//   noStroke();
//   fill(100, 200, 80);
//   ellipse(centerX, centerY, distance);
// if (distance !== null) {
// let volume = map(distance, 10, 100, 1, 0);
// volume = constrain(volume, 0, 1);

// drums.volume.value = Tone.gainToDb(volume);

//}
//}

//function getHandsData(results) {
//hands = results;
