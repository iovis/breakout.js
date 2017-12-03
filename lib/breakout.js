import Ball from './ball';
import Brick from './brick';
import CollisionEngine from './collision_engine';
import Paddle from './paddle';
import ScoreBoard from './score_board';

export default class Breakout {
  constructor(width, height) {
    this.canvas = this._buildCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');

    // Score Board
    this.score_board = new ScoreBoard(this.canvas);

    // Ball
    const ballRadius = 10;
    const ballColor = '#dabeed';
    this.ballInitialX = this.canvas.width / 2;
    this.ballInitialY = this.canvas.height - 30;
    this.ballInitialVX = 5;
    this.ballInitialVY = -5;

    this.ball = new Ball(this.canvas, ballRadius, ballColor, this.ballInitialX, this.ballInitialY, this.ballInitialVX, this.ballInitialVY);

    // Paddle
    const paddleHeight = 10;
    const paddleWidth = 75;
    const paddleColor = '#dabeed';
    this.paddleInitialX = (this.canvas.width - paddleWidth) / 2;
    this.paddleInitialY = this.canvas.height - paddleHeight;
    const paddleVX = 7;

    this.paddle = new Paddle(this.canvas, paddleHeight, paddleWidth, paddleColor, this.paddleInitialX, this.paddleInitialY, paddleVX);

    // Bricks
    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickHeight = 20;
    const brickWidth = 75;
    const brickColor = '#dabeed';

    const brickOffsetLeft = 30;
    const brickOffsetTop = 30;
    const brickPadding = 10;

    this.bricks = [];

    // Build bricks
    for (let i = 0; i < brickColumnCount; i++) {
      for (let j = 0; j < brickRowCount; j++) {
        let brickX = i * (brickWidth + brickPadding) + brickOffsetLeft;
        let brickY = j * (brickHeight + brickPadding) + brickOffsetTop;

        this.bricks.push(new Brick(this.canvas, brickHeight, brickWidth, brickColor, brickX, brickY));
      }
    }

    // CollisionEngine
    this.collision_engine = new CollisionEngine(this.canvas, this.ball, this.paddle, this.bricks, this.score_board);

    // Events
    document.addEventListener('brickBroken', this._brickBroken.bind(this), false);
    document.addEventListener('gameLost', this._gameLost.bind(this), false);
    document.addEventListener('gameWon', this._gameWon.bind(this), false);
    document.addEventListener('lifeLost', this._lifeLost.bind(this), false);
  }

  run() {
    requestAnimationFrame(this._render.bind(this));
  }

  // private

  _brickBroken() {
    this.score_board.score++;

    if (this.score_board.score === this.bricks.length) {
      document.dispatchEvent(new Event('gameWon'));
    }
  }

  _lifeLost() {
    this.score_board.lives--;

    if (this.score_board.lives) {
      this.ball.x = this.ballInitialX;
      this.ball.y = this.ballInitialY;
      this.ball.vx = this.ballInitialVX;
      this.ball.vy = this.ballInitialVY;
      this.paddle.x = this.paddleInitialX;
    } else {
      document.dispatchEvent(new Event('gameLost'));
    }
  }

  _gameWon() {
    alert('YOU WIN!');
    document.location.reload();
  }

  _gameLost() {
    alert('YOU LOSE!');
    document.location.reload();
  }

  _buildCanvas(width, height) {
    const canvas = document.createElement('canvas');

    canvas.id = 'breakout';
    canvas.width = width;
    canvas.height = height;

    document.body.appendChild(canvas);

    return canvas;
  }

  _render() {
    // Clear the screen every frame
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Render stuff
    this.bricks.forEach(brick => brick.draw());
    this.ball.draw();
    this.paddle.draw();
    this.score_board.drawScore();
    this.score_board.drawLives();

    // Break stuff
    this.collision_engine.run();

    // Move stuff
    this.paddle.move();
    this.ball.move();

    requestAnimationFrame(this._render.bind(this));
  }
}
