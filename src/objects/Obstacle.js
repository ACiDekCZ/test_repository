export default class Obstacle {
  constructor(height, speed) {
    this.width = 30;
    this.height = height;
    this.speed = speed;
    this.x = window.innerWidth;
    this.element = document.createElement('div');
    this.element.style.position = 'absolute';
    this.element.style.left = `${this.x}px`;
    this.element.style.bottom = '0px';
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.backgroundColor = 'red';
    document.body.appendChild(this.element);
  }

  update() {
    this.x -= this.speed;
    this.element.style.left = `${this.x}px`;
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

  remove() {
    this.element.remove();
  }
}
