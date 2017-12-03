import Ball from './lib/ball';
import Brick from './lib/brick';
import CollisionEngine from './lib/collision_engine';
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

const ball = new Ball(canvas, ballRadius, ballColor, ballInitialX, ballInitialY, ballInitialVX, ballInitialVY);

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
const brickHeight = 20;
const brickWidth = 75;
const brickColor = '#dabeed';

const brickOffsetLeft = 30;
const brickOffsetTop = 30;
const brickPadding = 10;

let bricks = [];

// Build bricks
for (let i = 0; i < brickColumnCount; i++) {
  for (let j = 0; j < brickRowCount; j++) {
    let brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
    let brickY = j * (brickHeight + brickPadding) + brickOffsetTop;

    bricks.push(new Brick(canvas, brickHeight, brickWidth, brickColor, brickX, brickY));
  }
}

// CollisionEngine
const collision_engine = new CollisionEngine(canvas, ball, paddle, bricks, score_board);

// Events
document.addEventListener('brickBroken', handleBrickBroken, false);
document.addEventListener('gameWon', handleWin, false);
document.addEventListener('lifeLost', handleLost, false);

function handleBrickBroken() {
  score_board.score++;

  if (score_board.score === bricks.length) {
    document.dispatchEvent(new Event('gameWon'));
  }
}

function handleLost() {
  score_board.lives--;

  if (score_board.lives) {
    ball.x = ballInitialX;
    ball.y = ballInitialY;
    ball.vx = ballInitialVX;
    ball.vy = ballInitialVY;
    paddle.x = paddleInitialX;
  } else {
    alert('YOU SUCK!');
    document.location.reload();
  }
}

function handleWin() {
  alert('YOU WIN!');
  document.location.reload();
}

// Game
function draw() {
  // Clear the screen every frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render stuff
  bricks.forEach(brick => brick.draw());
  ball.draw();
  paddle.draw();
  score_board.drawScore();
  score_board.drawLives();

  // Break stuff
  collision_engine.run();

  // Move stuff
  paddle.move();
  ball.move();

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
