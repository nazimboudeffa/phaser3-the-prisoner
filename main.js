import LoadScene from './scenes/LoadScene.js';
import MenuScene from './scenes/MenuScene.js';
import GlobalScene from './scenes/GlobalScene.js';
import MapScene from './scenes/MapScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import ShopScene from './scenes/ShopScene.js';
import HomeScene from './scenes/HomeScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#1b1b1b',
    width: 800,
    height: 600,
    scene: [
        LoadScene, MenuScene, GlobalScene, MapScene, GameOverScene, ShopScene, HomeScene
    ]
};

const game = new Phaser.Game(config);
game.scene.start('load');