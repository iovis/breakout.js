export default class ScoreBoard {
  constructor(canvas, score = 0) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.score = score;

    this.font = '16px Arial';
    this.color = '#dabeed';
    this.x = 8;
    this.y = 20;
  }

  draw() {
    this.ctx.font = this.font;
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(`Score: ${this.score}`, this.x, this.y);
  }
}
