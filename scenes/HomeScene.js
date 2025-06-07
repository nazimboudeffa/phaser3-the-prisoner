// scenes/HomeScene.js

export default class HomeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'home' });
    }

    create() {
        // Affiche l'image de fond de la maison
        this.add.image(400, 300, 'scene-home-private').setDepth(0);

        // Titre ou indication
        this.add.text(50, 40, "Six Private - Inventory", {
            font: '26px Arial',
            fill: '#ffffff'
        });

        const inventory = this.registry.get('inventory') || [];

        if (inventory.length === 0) {
            this.add.text(60, 100, "Inventory is empty.", {
                font: '20px Arial',
                fill: '#999'
            });
        } else {
            inventory.forEach((item, i) => {
                this.add.text(60, 100 + i * 30, `- ${item}`, {
                    font: '20px Arial',
                    fill: '#fff'
                }).setInteractive({ cursor: 'pointer' })
                .on('pointerdown', () => {
                    console.log(`Clicked on item: ${item}`);
                    // Ici, vous pouvez ajouter une action pour l'item
                    if (item === 'Map') {
                        this.scene.start('map'); // Démarrer la scène de la montre
                    }
                });
            });
        }

        // Bouton retour
        const backBtn = this.add.text(600, 520, '← Back', {
            font: '20px Arial',
            fill: '#ffffff',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 }
        }).setInteractive({ cursor: 'pointer' });

        backBtn.on('pointerdown', () => {
            this.scene.start('village'); // Retour au village
        });
    }
}