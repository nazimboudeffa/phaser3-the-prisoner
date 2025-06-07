export default class LoadScene extends Phaser.Scene
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
        this.load.image('village-map', 'assets/map/map.png');
        this.load.image('bicycle', 'assets/sprites/menu-bicycle.png');

        this.load.image('eye', 'assets/sprites/eye-plain.png');

        this.load.image('village', 'assets/scenes/scene-village.png');
        this.load.video('game-over', 'assets/game-over.mp4');
        this.load.image('why', 'assets/why.png');

        this.load.image('restart', 'assets/restart.png');
        this.load.image('jail', 'assets/jail.png');

        // Load scenes images
        this.load.image('scene-chess', 'assets/scenes/scene-chess.png');
        this.load.image('scene-helico', 'assets/scenes/scene-helicopter.png');
        this.load.image('scene-freesea', 'assets/scenes/scene-freesea.png');
        this.load.image('scene-ship', 'assets/scenes/scene-ship.png');
        this.load.image('scene-shop', 'assets/scenes/scene-shop.png');
        this.load.image('scene-shop-private', 'assets/scenes/scene-shop-1.png');
        this.load.image('scene-dome', 'assets/scenes/scene-dome.png');
        this.load.image('scene-dome-two', 'assets/scenes/scene-two.png');
        this.load.image('scene-control', 'assets/scenes/scene-town-hall.png');
        this.load.image('scene-labour-exchange', 'assets/scenes/scene-labour-exchange.png');
        this.load.image('scene-sea', 'assets/scenes/scene-sea.png');
        this.load.image('scene-beach', 'assets/scenes/scene-beach.png');
        this.load.image('scene-hospital', 'assets/scenes/scene-hospital.png');
        this.load.image('scene-cafe', 'assets/scenes/scene-cafe.png');
        this.load.image('scene-home', 'assets/scenes/scene-home.png');
        this.load.image('scene-home-private', 'assets/scenes/scene-sixprivate.png');
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