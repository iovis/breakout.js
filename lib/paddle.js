export default class Paddle {
  constructor(canvas, height, width, color, x = 0, y = 0, vx = 5, vy = 0) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.height = height;
    this.width = width;
    this.color = color;

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this._rightPressed = false;
    this._leftPressed = false;

    document.addEventListener('keydown', this._keyDownHandler.bind(this), false);
    document.addEventListener('keyup', this._keyUpHandler.bind(this), false);
    document.addEventListener('mousemove', this._mouseMoveHandler.bind(this), false);
  }

  move() {
    if (this._rightPressed && this.x < this.canvas.width - this.width) {
      this.x += this.vx;
    } else if (this._leftPressed && this.x > 0) {
      this.x -= this.vx;
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  // private

  _keyDownHandler(e) {
    if (e.keyCode == 39) {
      this._rightPressed = true;
    } else if (e.keyCode == 37) {
      this._leftPressed = true;
    }
  }

  _keyUpHandler(e) {
    if (e.keyCode == 39) {
      this._rightPressed = false;
    } else if (e.keyCode == 37) {
      this._leftPressed = false;
    }
  }

  _mouseMoveHandler(e) {
    let relativeX = e.clientX - this.canvas.offsetLeft;

    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.x = relativeX - this.width / 2;
    }
  }
}
