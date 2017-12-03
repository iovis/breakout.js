export default class CollisionEngine {
  constructor(canvas, ball, paddle, bricks, score_board) {
    this.canvas = canvas;
    this.ball = ball;
    this.paddle = paddle;
    this.bricks = bricks;
    this.score_board = score_board;
  }

  run() {
    this._walls();
    this._ball_paddle();
    this._ball_bricks();
  }

  // private

  _walls() {
    // Lateral walls
    if (this.ball.x > this.canvas.width - this.ball.radius
      || this.ball.x < this.ball.radius
    ) {
      this.ball.vx = -this.ball.vx;
    }

    // Ceiling
    if (this.ball.y < this.ball.radius) {
      this.ball.vy = -this.ball.vy;
    }
  }

  _ball_paddle() {
    // Ball is at the Paddle's height
    if (this.ball.y === this.canvas.height - this.ball.radius - this.paddle.height) {
      // Ball is at the Paddle's height, rebound
      if (this.ball.x > this.paddle.x
        && this.ball.x < this.paddle.x + this.paddle.width
      ) {
        this.ball.vy = -this.ball.vy;
      }
    // Ball can't rebound vertically anymore
    } else if (this.ball.y > this.canvas.height - this.ball.radius - this.paddle.height) {
      // Horizontal rebound
      if (this.ball.x > this.paddle.x - this.ball.radius
        && this.ball.x < this.paddle.x + this.paddle.width + this.ball.radius
      ) {
        this.ball.vx = -this.ball.vx;
      }

      // Lost ball
      if (this.ball.y > this.canvas.height + this.ball.radius + this.paddle.height) {
        document.dispatchEvent(new Event('lifeLost'));
      }
    }
  }

  _ball_bricks() {
    this.bricks.forEach(brick => {
      if (brick.broken) return;

      if (this.ball.x > brick.x - this.ball.radius
        && this.ball.x < brick.x + brick.width + this.ball.radius
        && this.ball.y > brick.y - this.ball.radius
        && this.ball.y < brick.y + brick.height + this.ball.radius
      ) {
        brick.broken = true;
        document.dispatchEvent(new Event('brickBroken'));

        if (this.ball.x > brick.x && this.ball.x < brick.x + brick.width) {
          this.ball.vy = -this.ball.vy;
        } else {
          this.ball.vx = -this.ball.vx;
        }
      }
    });
  }
}
