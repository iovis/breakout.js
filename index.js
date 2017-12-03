const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Ball
const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 5;
let dy = -5;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = '#dabeed';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  // Collision
  if (x > canvas.width - ballRadius || x < ballRadius) {
    dx = -dx;
  }

  if (y < ballRadius) {
    dy = -dy;
  } else if (y > canvas.height - ballRadius) {
    alert('YOU SUCK!');
    document.location.reload();
  }

  // Paddle movement
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

// Paddle
const paddleHeight = 10;
const paddleWidth = 75;

let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#dabeed';
  ctx.fill();
  ctx.closePath();
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 37) {
    leftPressed = false;
  }
}
