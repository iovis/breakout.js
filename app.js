import Ball from './lib/ball';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Ball
const ballRadius = 10;
const ballColor = '#dabeed';
const ballInitialX = canvas.width / 2;
const ballInitialY = canvas.height - 30;
const ballInitialVX = 5;
const ballInitialVY = -5;

let ball = new Ball(canvas, ballRadius, ballColor, ballInitialX, ballInitialY, ballInitialVX, ballInitialVY);

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
document.addEventListener('mousemove', mouseMoveHandler, false);

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

      if (ball.x > brick.x - ball.radius && ball.x < brick.x + brickWidth + ball.radius && ball.y > brick.y - ball.radius && ball.y < brick.y + brickHeight + ball.radius) {
        ball.vy = -ball.vy;
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

// Lives
let lives = 3;

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#dabeed';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

// Game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.draw();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  // Collision
  if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
    ball.vx = -ball.vx;
  }

  if (ball.y < ball.radius) {
    ball.vy = -ball.vy;
  } else if (ball.y > canvas.height - ball.radius - paddleHeight) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.vy = -ball.vy;
    } else {
      lives--;

      if (lives) {
        paddleX = (canvas.width - paddleWidth) / 2;
        ball = new Ball(canvas, ballRadius, ballColor, ballInitialX, ballInitialY, ballInitialVX, ballInitialVY);
      } else {
        alert('YOU SUCK!');
        document.location.reload();
      }
    }
  }

  // Paddle movement
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  ball.x += ball.vx;
  ball.y += ball.vy;

  requestAnimationFrame(draw);
}

draw();
