export default class LoadScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'load', active: false });
    }

    preload ()
    {
        // Dimensions
        const { width, height } = this.cameras.main;

        // Barre visuelle
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 320, 50);

        // Texte de chargement
        const loadingText = this.add.text(width / 2, height / 2 - 60, 'Loading...', {
            font: '20px monospace',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        const percentText = this.add.text(width / 2, height / 2, '0%', {
            font: '18px monospace',
            fill: '#ffffff'
        }).setOrigin(0.5, 0.5);

        // Mise à jour du pourcentage
        this.load.on('progress', (value) => {
            percentText.setText(`${Math.floor(value * 100)}%`);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        // Clean-up une fois terminé
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });

        // Chargement des ressources
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
    }

    create ()
    {
        this.scene.start('menu');
    }
}