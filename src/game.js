import dogSpriteBase64 from '../assets/images/dog_sprite.base64';

const GRAVITY = 0.5;
const JUMP_VELOCITY = 8;
const JUMP_COOLDOWN = 250; // milliseconds

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

  function update() {
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
