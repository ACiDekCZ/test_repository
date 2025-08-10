import dogSpriteBase64 from '../assets/images/dog_sprite.base64';
import Obstacle from './objects/Obstacle';

const GRAVITY = 0.5;
const JUMP_VELOCITY = 8;
const JUMP_COOLDOWN = 250; // milliseconds
const OBSTACLE_SPEED = 3;
const OBSTACLE_MIN_HEIGHT = 20;
const OBSTACLE_MAX_HEIGHT = 120;
const OBSTACLE_MIN_GAP = 1500;
const OBSTACLE_MAX_GAP = 3000;

export function startGame() {
  const dog = new Image();
  dog.src = `data:image/png;base64,${dogSpriteBase64.trim()}`;
  dog.style.position = 'absolute';
  dog.style.left = '50px';
  dog.style.bottom = '0px';
  document.body.appendChild(dog);

  let velocity = 0;
  let y = 0;
  let onGround = true;
  let lastJumpTime = 0;
  let obstacles = [];
  let lastObstacleTime = 0;
  let nextObstacleTime = randomRange(OBSTACLE_MIN_GAP, OBSTACLE_MAX_GAP);

  function spawnObstacle() {
    const height = randomRange(OBSTACLE_MIN_HEIGHT, OBSTACLE_MAX_HEIGHT);
    const obstacle = new Obstacle(height, OBSTACLE_SPEED);
    obstacles.push(obstacle);
  }

  function update() {
    const now = Date.now();
    if (now - lastObstacleTime > nextObstacleTime) {
      spawnObstacle();
      lastObstacleTime = now;
      nextObstacleTime = randomRange(OBSTACLE_MIN_GAP, OBSTACLE_MAX_GAP);
    }

    obstacles.forEach((obstacle) => obstacle.update());
    obstacles = obstacles.filter((obstacle) => {
      if (obstacle.isOffScreen()) {
        obstacle.remove();
        return false;
      }
      return true;
    });

    if (!onGround) {
      velocity -= GRAVITY;
      y += velocity;
      if (y <= 0) {
        y = 0;
        velocity = 0;
        onGround = true;
      }
      dog.style.bottom = `${y}px`;
    }
    requestAnimationFrame(update);
  }

  function jump() {
    const now = Date.now();
    if (!onGround) return;
    if (now - lastJumpTime < JUMP_COOLDOWN) return;
    velocity = JUMP_VELOCITY;
    onGround = false;
    lastJumpTime = now;
  }

  window.addEventListener('pointerdown', jump);
  requestAnimationFrame(update);
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
