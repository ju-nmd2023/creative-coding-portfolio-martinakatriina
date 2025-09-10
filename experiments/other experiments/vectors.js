let x = 100;
let y = 100;
let speedX = 5;
let speedY = 8;

function draw() {
  fill(0, 0, 0);
  ellipse(x, y, 80);

  if (x > width || x > 0) {
    speedX *= -1;
  }
  if (y > height || y < 0) {
    speedY *= -1;
  }

  x += speedX;
  y += speedY;
}
