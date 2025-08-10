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
    const y = canvasHeight - this.height;
    ctx.fillStyle = '#556b2f';
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.fillRect(this.x, y, this.width, this.height);
    ctx.strokeRect(this.x, y, this.width, this.height);
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
