import { startGame } from './game';
import { preloadAssets } from './preload';

console.log('Game initialized');
preloadAssets().then((assets) => {
  startGame(assets);
});
