class Menu extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'menu', active: false });
    }

    init (data)
    {
        this.png = data.image;
    }

    preload ()
    {
        this.load.image('mech', 'assets/menu/' + this.png);
    }

    create (data)
    {
        this.add.image(data.x, data.y, 'mech');
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser3-the-prisoner',
    width: 800,
    height: 600,
    scene: Menu
};

const game = new Phaser.Game(config);
game.scene.start('menu', { image: 'six.png', x: 400, y: 300 });