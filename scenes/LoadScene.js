export default class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'load', active: false });
    }

    preload ()
    {
        this.load.image('six', '../assets/menu/six.png');
        this.load.image('start', '../assets/start.png');

        this.load.image('information', '../assets/sprites/information.png');
        this.load.image('map', '../assets/map/map.png');
        this.load.image('bicycle', '../assets/sprites/menu-bicycle.png');

        this.load.image('eye', '../assets/sprites/eye-plain.png');

        this.load.image('village', '../assets/village.png');
        this.load.video('game-over', '../assets/game-over.mp4');
        this.load.image('why', '../assets/why.png');

        this.load.image('restart', '../assets/restart.png');
        this.load.image('jail', '../assets/jail.png');

        this.load.image('map-pawn', '../assets/map/map-pawn.png');
        this.load.image('scene-chess', '../assets/scenes/scene-chess.png');
    
        this.load.image('map-helico', '../assets/map/map-helicopter.png');
        this.load.image('scene-helico', '../assets/scenes/scene-helicopter.png');
    
        this.load.image('map-freesea', '../assets/map/map-freesea.png');
        this.load.image('scene-freesea', '../assets/scenes/scene-freesea.png');
    
        this.load.image('map-ship', '../assets/map/map-ship.png');
        this.load.image('scene-ship', '../assets/scenes/scene-ship.png');
    
        this.load.image('map-shop', '../assets/map/map-shop.png');
        this.load.image('scene-shop', '../assets/scenes/scene-shop.png');
    
        this.load.image('map-two', '../assets/map/map-two.png');
        this.load.image('scene-two', '../assets/scenes/scene-dome.png');
    
        this.load.image('map-control', '../assets/map/map-control.png');
        this.load.image('scene-control', '../assets/scenes/scene-town-hall.png');
    
        this.load.image('map-labour-exchange', '../assets/map/map-labour-exchange.png');
        this.load.image('scene-labour-exchange', '../assets/scenes/scene-labour-exchange.png');
    
        this.load.image('map-sea', '../assets/map/map-sea.png');
        this.load.image('scene-sea', '../assets/scenes/scene-sea.png');
    
        this.load.image('map-beach', '../assets/map/map-beach.png');
        this.load.image('scene-beach', '../assets/scenes/scene-beach.png');
    
        this.load.image('map-hospital', '../assets/map/map-hospital.png');
        this.load.image('scene-hospital', '../assets/scenes/scene-hospital.png');
    
        this.load.image('map-cafe', '../assets/map/map-cafe.png');
        this.load.image('scene-cafe', '../assets/scenes/scene-cafe.png');
    
        this.load.image('map-private', '../assets/map/map-six-private.png');
        this.load.image('scene-private', '../assets/scenes/scene-six-private.png');
    
        this.load.image('map-phone', '../assets/map/map-phone.png');
        this.load.image('scene-phone', '../assets/scenes/scene-phone.png');

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