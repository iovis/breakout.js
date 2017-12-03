import Ball from './lib/ball';
import Paddle from './lib/paddle';
import ScoreBoard from './lib/score_board';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// Score Board
const score_board = new ScoreBoard(canvas);

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
const paddleColor = '#dabeed';
const paddleInitialX = (canvas.width - paddleWidth) / 2;
const paddleInitialY = canvas.height - paddleHeight;
const paddleVX = 7;

const paddle = new Paddle(canvas, paddleHeight, paddleWidth, paddleColor, paddleInitialX, paddleInitialY, paddleVX);

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
        score_board.score++;

        if (score_board.score == brickRowCount * brickColumnCount) {
          alert('YOU WIN!');
          document.location.reload();
        }
      }
    }
  }
}

// Game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  ball.draw();
  paddle.draw();
  score_board.drawScore();
  score_board.drawLives();
  collisionDetection();

  // Collision
  if (ball.x > canvas.width - ball.radius || ball.x < ball.radius) {
    ball.vx = -ball.vx;
  }

  if (ball.y < ball.radius) {
    ball.vy = -ball.vy;
  } else if (ball.y > canvas.height - ball.radius - paddle.height) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.vy = -ball.vy;
    } else {
      score_board.lives--;

      if (score_board.lives) {
        ball = new Ball(canvas, ballRadius, ballColor, ballInitialX, ballInitialY, ballInitialVX, ballInitialVY);
        paddle.x = paddleInitialX;
      } else {
        alert('YOU SUCK!');
        document.location.reload();
      }
    }
  }

  paddle.move();
  ball.move();

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
