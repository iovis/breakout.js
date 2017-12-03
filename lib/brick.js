export default class Brick {
  constructor(canvas, height, width, color, x = 0, y = 0, broken = false) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.height = height;
    this.width = width;
    this.color = color;

    this.x = x;
    this.y = y;

    this.broken = broken;
  }

  draw() {
    if (this.broken) return;

    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
