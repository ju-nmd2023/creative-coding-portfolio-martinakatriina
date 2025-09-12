let handpose;
let video;
let hands = [];

//Loading ml5 function
function preload() {
  handpose = ml5.handPose();
}

function setup() {
  createCanvas(648, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  handpose.detectStart(video, getHandsData);
}

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
  }

  //   if (hands.length > 0) {
  //     let indexFinger = hands[0].index_finger_tip;
  //     let thumb = hands[0].thumb_tip;
  //   }

  //   fill(100, 200, 80);
  //   ellipse(indexFinger.x, index.Finger.y, 30, 30);
  //   ellipse(thumb.x, thumb.y, 30, 30);
}

function getHandsData(results) {
  hands = results;
}
