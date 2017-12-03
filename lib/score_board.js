export default class ScoreBoard {
  constructor(canvas, score = 0, lives = 3) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.score = score;
    this.lives = lives;

    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#dabeed';

    this.score_x = 8;
    this.score_y = 20;
    this.lives_x = this.canvas.width - 65;
    this.lives_y = 20;
  }

  drawScore() {
    this.ctx.fillText(`Score: ${this.score}`, this.score_x, this.score_y);
  }

  drawLives() {
    this.ctx.fillText(`Lives: ${this.lives}`, this.lives_x, this.lives_y);
  }
}
