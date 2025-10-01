let video;
let handposeModel;
let predictions = [];

let drums, bass, vocals, melody, transition;
let startButton;

// p5.js setup function
function setup() {
  // Create canvas in the container
  const container = document.getElementById("p5container");
  const canvas = createCanvas(648, 480);
  canvas.parent(container);
  background(0);

  // Setup video capture
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Load Handpose model
  handposeModel = ml5.handpose(video, () => {
    console.log("Handpose model loaded");
  });

  handposeModel.on("predict", (results) => {
    predictions = results;
  });

  // Initialize Tone.js players
  drums = new Tone.Player("experiments/ableton/drums.mp3").toDestination();
  bass = new Tone.Player("experiments/ableton/bass.mp3").toDestination();
  vocals = new Tone.Player("experiments/ableton/vocals.mp3").toDestination();
  melody = new Tone.Player("experiments/ableton/melody.mp3").toDestination();
  transition = new Tone.Player(
    "experiments/ableton/transition.mp3"
  ).toDestination();

  // Setup Start Audio button
  startButton = document.getElementById("startAudio");
  if (startButton) {
    startButton.style.display = "inline";
    startButton.onclick = async () => {
      await Tone.start();

      // Start all tracks
      drums.sync().start(0);
      bass.sync().start(0);
      vocals.sync().start(0);
      melody.sync().start(0);
      transition.sync().start(0);

      Tone.Transport.start();
      console.log("Audio started");
    };
  }
}

// p5.js draw loop
function draw() {
  background(0);
  image(video, 0, 0, width, height);

  if (predictions.length > 0) {
    const hand = predictions[0];
    const [thumb, index, middle, ring, pinky] = [
      hand.landmarks[4],
      hand.landmarks[8],
      hand.landmarks[12],
      hand.landmarks[16],
      hand.landmarks[20],
    ];

    // Distances from thumb to each finger
    const indexDist = dist(thumb[0], thumb[1], index[0], index[1]);
    const middleDist = dist(thumb[0], thumb[1], middle[0], middle[1]);
    const ringDist = dist(thumb[0], thumb[1], ring[0], ring[1]);
    const pinkyDist = dist(thumb[0], thumb[1], pinky[0], pinky[1]);

    // Map distances to volume (0 = mute, 1 = full)
    const indexVol = constrain(map(indexDist, 20, 150, 1, 0), 0, 1);
    const middleVol = constrain(map(middleDist, 20, 150, 1, 0), 0, 1);
    const ringVol = constrain(map(ringDist, 20, 150, 1, 0), 0, 1);
    const pinkyVol = constrain(map(pinkyDist, 20, 150, 1, 0), 0, 1);

    // Smoothly apply volumes
    drums.volume.value = Tone.gainToDb(lerp(drums.volume.value, indexVol, 0.2));
    bass.volume.value = Tone.gainToDb(lerp(bass.volume.value, middleVol, 0.2));
    melody.volume.value = Tone.gainToDb(
      lerp(melody.volume.value, ringVol, 0.2)
    );
    vocals.volume.value = Tone.gainToDb(
      lerp(vocals.volume.value, pinkyVol, 0.2)
    );

    // Draw visual feedback for pinches
    drawPinchEllipse(thumb, index, indexDist, "red");
    drawPinchEllipse(thumb, middle, middleDist, "yellow");
    drawPinchEllipse(thumb, ring, ringDist, "blue");
    drawPinchEllipse(thumb, pinky, pinkyDist, "pink");
  }
}

// Helper function to draw pinch indicators
function drawPinchEllipse(thumb, finger, distance, col) {
  const cx = (thumb[0] + finger[0]) / 2;
  const cy = (thumb[1] + finger[1]) / 2;
  noStroke();
  fill(col);
  ellipse(cx, cy, distance * 0.5);
}
