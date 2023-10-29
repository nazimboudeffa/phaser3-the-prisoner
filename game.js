class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'load', active: false });
    }

    preload ()
    {
        this.load.image('six', 'assets/menu/six.png');
        this.load.image('start', 'assets/menu/start.png');

        this.load.image('phone', 'assets/scenes/scene-phone.png');

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff //white
            }
        });

        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.game.renderer.width / 2, this.game.renderer.height * percent, 50);
            console.log(percent);
        })

        this.load.on("complete", () => {
            console.log("complete");
        });

        this.load.on("load", (file) => {
            console.log(file.src)
        })
    }

    create ()
    {
        this.scene.start('menu');
    }
}

class MenuScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'menu', active: false });
    }

    create ()
    {
        this.add.image(400, 300, 'six');
        let startButton = this.add.image(400, 450, 'start');
        startButton.setInteractive();
        this.tweens.add({
            targets: startButton,
            alpha: 0,
            ease: 'Linear1',
            duration: 500,
            repeat: -1,
            yoyo: true
        });
        startButton.on('pointerdown', () => {
            this.scene.start('play');
        });
    }
}

class PlayScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'play', active: false });
    }

    create ()
    {
        this.add.image(400, 300, 'phone');
    }
}


const config = {
    type: Phaser.AUTO,
    parent: 'phaser3-the-prisoner',
    width: 800,
    height: 600,
    scene: [
        LoadScene, MenuScene, PlayScene
    ]
};

const game = new Phaser.Game(config);
game.scene.start('load');