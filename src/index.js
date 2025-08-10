import dogSpriteBase64 from '../assets/images/dog_sprite.base64';

console.log('Game initialized');

const img = new Image();
img.src = `data:image/png;base64,${dogSpriteBase64.trim()}`;
document.body.appendChild(img);
