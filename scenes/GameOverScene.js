export default class GameOverScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'gameover', active: false });
    }

    create ()
    {
        let gameOver = this.add.video(400, 300, 'game-over');
        gameOver.play();
        gameOver.on('complete', () => {
            this.add.image(400, 300, 'jail');
            let restartButton = this.add.image(400, 300, 'restart').setInteractive({ cursor: 'pointer' });
            this.tweens.add({
                targets: restartButton,
                alpha: 0,
                ease: 'Linear1',
                duration: 500,
                repeat: -1,
                yoyo: true
            });
            restartButton.on('pointerdown', () => {
                // Reset the game state
                this.registry.set('currentLocation', 'Phone Box'); // Reset to initial location
                this.scene.start('menu');
            });
        });        
    }
}