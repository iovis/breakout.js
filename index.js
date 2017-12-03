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
document.addEventListener("mousemove", mouseMoveHandler, false);

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

function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;

  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

// Bricks
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = {};
for (let i = 0; i < brickColumnCount; i++) {
  bricks[i] = [];

  for (let j = 0; j < brickRowCount; j++) {
    bricks[i][j] = { x: 0, y: 0, status: 1 };
  }
}

function drawBricks() {
  for (let i = 0; i < brickColumnCount; i++) {
    for (let j = 0; j < brickRowCount; j++) {
      if (bricks[i][j].status != 1) continue;

      let brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
      let brickY = j * (brickHeight + brickPadding) + brickOffsetTop;

      bricks[i][j].x = brickX;
      bricks[i][j].y = brickY;
      ctx.beginPath();
      ctx.rect(brickX, brickY, brickWidth, brickHeight);
      ctx.fillStyle = '#dabeed';
      ctx.fill();
      ctx.closePath();
    }
  }
}

function collisionDetection() {
  for (let i = 0; i < brickColumnCount; i++) {
    for (let j = 0; j < brickRowCount; j++) {
      let brick = bricks[i][j];

      if (brick.status === 0) continue;

      if (x > brick.x - ballRadius && x < brick.x + brickWidth + ballRadius && y > brick.y - ballRadius && y < brick.y + brickHeight + ballRadius) {
        dy = -dy;
        brick.status = 0;
        score++;

        if (score == brickRowCount * brickColumnCount) {
          alert('YOU WIN!');
          document.location.reload();
        }
      }
    }
  }
}

// Score
let score = 0;

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#dabeed';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

// Game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();

  // Collision
  if (x > canvas.width - ballRadius || x < ballRadius) {
    dx = -dx;
  }

  if (y < ballRadius) {
    dy = -dy;
  } else if (y > canvas.height - ballRadius - paddleHeight) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert('YOU SUCK!');
      document.location.reload();
    }
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

draw();
