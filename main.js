import LoadScene from './scenes/LoadScene.js';
import MenuScene from './scenes/MenuScene.js';
import IntroScene from './scenes/IntroScene.js';
import VillageScene from './scenes/VillageScene.js';
import MapScene from './scenes/MapScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import ShopScene from './scenes/ShopScene.js';
import HomeScene from './scenes/HomeScene.js';
import NumberTwoScene from './scenes/NumberTwoScene.js';
import SeaScene from './scenes/SeaScene.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#1b1b1b',
    width: 800,
    height: 600,
    scene: [
        LoadScene, MenuScene, IntroScene, VillageScene, SeaScene, ShopScene, HomeScene, MapScene, NumberTwoScene, GameOverScene
    ],
    scale : {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600
    },
};

const game = new Phaser.Game(config);
game.scene.start('load');