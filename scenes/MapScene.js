export default class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'map' });
    }

    preload() {
        this.load.image('village-map', 'assets/map.png'); // adapte le chemin
    }

    create() {
        this.add.image(400, 300, 'village-map').setScale(0.8);

        // Exemple de hotspots
        const hotspots = [
            { name: 'Shop', x: 460, y: 140 },
            { name: 'Hospital', x: 990, y: 330 },
            { name: 'Cafe', x: 680, y: 120 },
            { name: 'Phone Box', x: 420, y: 140 },
            { name: 'Town Hall', x: 530, y: 260 }
            // Ajoute d'autres lieux ici
        ];

        hotspots.forEach(h => {
            const zone = this.add.zone(h.x, h.y, 40, 40)
                .setInteractive()
                .on('pointerdown', () => {
                    this.showMessage(`${h.name}`, '#0f0');
                });

            // Optionnel : cercle visuel
            this.add.circle(h.x, h.y, 6, 0xff0000).setStrokeStyle(2, 0xffffff);
        });

        // Camera movement for navigating the map
        let cam = this.cameras.main;

        this.input.on("pointermove", function (p) {
            if (!p.isDown) return;
        
            cam.scrollX -= (p.x - p.prevPosition.x) / cam.zoom;
            cam.scrollY -= (p.y - p.prevPosition.y) / cam.zoom;
        });

        // Bouton retour
        this.add.text(20, 550, '← Back', {
            font: '20px Arial',
            fill: '#ffffff',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 }
        }).setInteractive()
          .on('pointerdown', () => {
              this.scene.start('home'); // retour à la scène globale
        });
    }

    showMessage(text, color) {
        if (this.msgText) this.msgText.destroy();
        this.msgText = this.add.text(300, 480, text, {
            font: '18px Arial',
            fill: color,
            backgroundColor: '#000',
            padding: { x: 5, y: 3 }
        }).setDepth(1);

        // Supprimer le message après 2 secondes
        this.time.delayedCall(1000, () => {
            if (this.msgText) this.msgText.destroy();
            this.msgText = null;
        });
    };
}