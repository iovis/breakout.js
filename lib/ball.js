export default class Ball {
  constructor(canvas, radius, color, x = 0, y = 0, vx = 0, vy = 0) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.radius = radius;
    this.color = color;

    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
