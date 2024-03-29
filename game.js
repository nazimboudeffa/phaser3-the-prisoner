class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'load', active: false });
    }

    preload ()
    {
        this.load.image('six', 'assets/menu/six.png');
        this.load.image('start', 'assets/start.png');

        this.load.image('information', 'assets/sprites/information.png');
        this.load.image('village', 'assets/map/map.png');
        this.load.image('bicycle', 'assets/sprites/menu-bicycle.png');

        this.load.image('eye', 'assets/sprites/eye-plain.png');

        this.load.image('global', 'assets/global.png');
        this.load.video('game-over', 'assets/game-over.mp4');
        this.load.image('why', 'assets/why.png');

        this.load.image('restart', 'assets/restart.png');
        this.load.image('jail', 'assets/jail.png');

        this.load.image('map-pawn', 'assets/map/map-pawn.png');
        this.load.image('scene-chess', 'assets/scenes/scene-chess.png');
    
        this.load.image('map-helico', 'assets/map/map-helicopter.png');
        this.load.image('scene-helico', 'assets/scenes/scene-helicopter.png');
    
        this.load.image('map-freesea', 'assets/map/map-freesea.png');
        this.load.image('scene-freesea', 'assets/scenes/scene-freesea.png');
    
        this.load.image('map-ship', 'assets/map/map-ship.png');
        this.load.image('scene-ship', 'assets/scenes/scene-ship.png');
    
        this.load.image('map-shop', 'assets/map/map-shop.png');
        this.load.image('scene-shop', 'assets/scenes/scene-shop.png');
    
        this.load.image('map-two', 'assets/map/map-two.png');
        this.load.image('scene-two', 'assets/scenes/scene-dome.png');
    
        this.load.image('map-control', 'assets/map/map-control.png');
        this.load.image('scene-control', 'assets/scenes/scene-town-hall.png');
    
        this.load.image('map-labour-exchange', 'assets/map/map-labour-exchange.png');
        this.load.image('scene-labour-exchange', 'assets/scenes/scene-labour-exchange.png');
    
        this.load.image('map-sea', 'assets/map/map-sea.png');
        this.load.image('scene-sea', 'assets/scenes/scene-sea.png');
    
        this.load.image('map-beach', 'assets/map/map-beach.png');
        this.load.image('scene-beach', 'assets/scenes/scene-beach.png');
    
        this.load.image('map-hospital', 'assets/map/map-hospital.png');
        this.load.image('scene-hospital', 'assets/scenes/scene-hospital.png');
    
        this.load.image('map-cafe', 'assets/map/map-cafe.png');
        this.load.image('scene-cafe', 'assets/scenes/scene-cafe.png');
    
        this.load.image('map-private', 'assets/map/map-six-private.png');
        this.load.image('scene-private', 'assets/scenes/scene-six-private.png');
    
        this.load.image('map-phone', 'assets/map/map-phone.png');
        this.load.image('scene-phone', 'assets/scenes/scene-phone.png');

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
        startButton.setInteractive({ cursor: 'pointer' });
        this.tweens.add({
            targets: startButton,
            alpha: 0,
            ease: 'Linear1',
            duration: 500,
            repeat: -1,
            yoyo: true
        });
        startButton.on('pointerdown', () => {
            this.scene.start('global');
        });
    }
}

class GlobalScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'global', active: false });
    }

    create ()
    {
        this.add.image(400, 300, 'global');
        let instructions = this.add.image(400, 450, 'why');
        instructions.setInteractive({ cursor: 'pointer' });
        instructions.on('pointerdown', () => {
            this.scene.start('map');
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
        this.add.image(0, 0, 'scene-phone').setOrigin(0, 0);

        const information = this.add.sprite(429, 137, 'information').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });

        information.on('pointerover', function (event)
        {
            this.setTint(0x00ff00);
        });

        information.on('pointerout', function (event)
        {
            this.clearTint();
        });

        information.on('pointerdown', () => {
            this.scene.start('map');
        });
    }
}

class MapScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'map', active: false });
    }

    create ()
    {
        this.add.image(400, 300, 'village');

        const phone = this.add.sprite(511, 272, 'eye').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });
        phone.setTint(0x00ff00);

        const thevillage = this.add.sprite(620, 600, 'eye').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });
        thevillage.setTint(0x00ff00);

        const sea = this.add.sprite(500, 600, 'eye').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });
        sea.setTint(0x00ff00);

        var cam = this.cameras.main;
        //cam.setZoom(2);

        this.input.on("pointermove", function (p) {
            if (!p.isDown) return;
        
            cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
            cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
        });

        phone.on('pointerdown', () =>
        {
            this.scene.start('play');
        });

        thevillage.on('pointerdown', () =>
        {
            this.scene.start('global');
        });

        sea.on('pointerdown', () =>
        {
            this.scene.start('sea');
        });
    }
}


class SeaScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'sea', active: false });
    }

    create ()
    {
        this.add.image(0, 0, 'scene-sea').setOrigin(0, 0);
        this.add.image(400, 300, 'eye').setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
            this.scene.start('gameover');
        });
    }
}

class GameOverScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'gameover', active: false });
    }

    create ()
    {
        let gameOver = this.add.video(400, 300, 'game-over')
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
                this.scene.start('global');
            });
        });        
    }
}


const config = {
    type: Phaser.AUTO,
    parent: 'phaser3-the-prisoner',
    scale: {
        mode: Phaser.Scale.FIT,
    },
    width: 800,
    height: 600,
    scene: [
        LoadScene, MenuScene, GlobalScene, SeaScene, PlayScene, MapScene, GameOverScene
    ]
};

const game = new Phaser.Game(config);
game.scene.start('load');