import Obstacle from './objects/Obstacle';

const GRAVITY = 0.5;
const JUMP_VELOCITY = 8;
const JUMP_COOLDOWN = 250; // milliseconds
const OBSTACLE_SPEED = 3;
const OBSTACLE_MIN_HEIGHT = 20;
const OBSTACLE_MAX_HEIGHT = 120;
const OBSTACLE_MIN_GAP = 1500;
const OBSTACLE_MAX_GAP = 3000;
const DOG_WIDTH = 50;
const DOG_HEIGHT = 50;

export function startGame(assets) {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('orientationchange', resizeCanvas);
  resizeCanvas();

  const dog = assets.images.dog;
  const jumpSound = assets.audios.jump;

  const scoreElement = document.getElementById('score');
  scoreElement.textContent = '0.00';
  const startTime = Date.now();
  let gameOver = false;
  let velocity = 0;
  let y = 0;
  let onGround = true;
  let lastJumpTime = 0;
  let obstacles = [];
  let lastObstacleTime = 0;
  let nextObstacleTime = randomRange(OBSTACLE_MIN_GAP, OBSTACLE_MAX_GAP);

  function spawnObstacle() {
    const height = randomRange(OBSTACLE_MIN_HEIGHT, OBSTACLE_MAX_HEIGHT);
    const obstacle = new Obstacle(height, OBSTACLE_SPEED, canvas);
    obstacles.push(obstacle);
  }

  let lastFrameTime = 0;
  function update(timestamp) {
    if (timestamp - lastFrameTime < 1000 / 60) {
      requestAnimationFrame(update);
      return;
    }
    lastFrameTime = timestamp;
    const now = Date.now();
    const elapsed = (now - startTime) / 1000;
    scoreElement.textContent = elapsed.toFixed(2);
    if (now - lastObstacleTime > nextObstacleTime) {
      spawnObstacle();
      lastObstacleTime = now;
      nextObstacleTime = randomRange(OBSTACLE_MIN_GAP, OBSTACLE_MAX_GAP);
    }

    obstacles.forEach((obstacle) => obstacle.update());
    obstacles = obstacles.filter((obstacle) => !obstacle.isOffScreen());

    const dogBounds = {
      left: 50,
      right: 50 + DOG_WIDTH,
      bottom: y,
      top: y + DOG_HEIGHT,
    };

    for (const obstacle of obstacles) {
      const ob = obstacle.getBounds();
      if (
        dogBounds.right > ob.left &&
        dogBounds.left < ob.right &&
        dogBounds.top > ob.bottom &&
        dogBounds.bottom < ob.top
      ) {
        endGame();
        return;
      }
    }

    if (!onGround) {
      velocity -= GRAVITY;
      y += velocity;
      if (y <= 0) {
        y = 0;
        velocity = 0;
        onGround = true;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(dog, 50, canvas.height - DOG_HEIGHT - y, DOG_WIDTH, DOG_HEIGHT);
    obstacles.forEach((obstacle) => obstacle.draw(ctx, canvas.height));

    if (!gameOver) {
      requestAnimationFrame(update);
    }
  }

  function jump() {
    const now = Date.now();
    if (!onGround) return;
    if (now - lastJumpTime < JUMP_COOLDOWN) return;
    velocity = JUMP_VELOCITY;
    onGround = false;
    lastJumpTime = now;
    if (jumpSound) {
      jumpSound.currentTime = 0;
      jumpSound.play();
    }
  }

  function endGame() {
    gameOver = true;
    canvas.removeEventListener('pointerdown', jump);
    const finalScore = scoreElement.textContent;
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.color = 'white';
    overlay.style.padding = '20px';
    overlay.style.fontFamily = 'sans-serif';
    overlay.style.fontSize = '24px';
    overlay.textContent = `Game Over! Final Score: ${finalScore}s`;
    document.body.appendChild(overlay);
  }

  canvas.addEventListener('pointerdown', jump);
  requestAnimationFrame(update);
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
