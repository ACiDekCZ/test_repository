import dogSpriteBase64 from '../assets/images/dog_sprite.base64';
import jumpSoundBase64 from '../assets/audio/jump.base64';

export function preloadAssets() {
  const images = {};
  const audios = {};

  const imagePromises = [
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        images.dog = img;
        resolve();
      };
      img.onerror = reject;
      img.src = `data:image/png;base64,${dogSpriteBase64.trim()}`;
    }),
  ];

  const audioPromises = [
    new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.addEventListener('canplaythrough', () => {
        audios.jump = audio;
        resolve();
      }, { once: true });
      audio.onerror = reject;
      audio.src = `data:audio/wav;base64,${jumpSoundBase64.trim()}`;
      audio.load();
    }),
  ];

  return Promise.all([...imagePromises, ...audioPromises]).then(() => ({
    images,
    audios,
  }));
}
