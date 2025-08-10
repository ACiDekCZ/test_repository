export default class Obstacle {
  constructor(height, speed, canvas) {
    this.width = 30;
    this.height = height;
    this.speed = speed;
    this.x = canvas.width;
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx, canvasHeight) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, canvasHeight - this.height, this.width, this.height);
  }

  isOffScreen() {
    return this.x + this.width < 0;
  }

  getBounds() {
    return {
      left: this.x,
      right: this.x + this.width,
      top: this.height,
      bottom: 0,
    };
  }
}
