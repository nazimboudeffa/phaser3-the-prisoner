export default class MapScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'map', active: false });
    }

    create ()
    {
        this.add.image(400, 300, 'village');

        // Create interactive elements for different locations in the village
        const locations = [
            { name: 'phone', x: 511, y: 272, scene: 'phone' },
            { name: 'village', x: 620, y: 600, scene: 'village' },
            { name: 'sea', x: 500, y: 600, scene: 'sea' }
        ];

        locations.forEach(location => {
            const sprite = this.add.sprite(location.x, location.y, 'eye').setOrigin(0, 0).setInteractive({ cursor: 'pointer' });
            sprite.setTint(0x00ff00);
            sprite.on('pointerdown', () => {
                this.scene.start(location.scene);
            });
        });

        // Camera movement for navigating the map
        let cam = this.cameras.main;

        this.input.on("pointermove", function (p) {
            if (!p.isDown) return;
        
            cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
            cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
        });
    }
}