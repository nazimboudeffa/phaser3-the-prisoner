import VillageGraph from '../graph/VillageGraph.js';

export default class GlobalScene extends Phaser.Scene {
    constructor() {
        super({ key: 'global', active: false });
        this.currentLocation = 'Village';
    }

    create() {
        // Initialiser le graphe
        this.villageGraph = new VillageGraph();
        this.villageGraph.addLocation('Village');
        this.villageGraph.addLocation('Phone');
        this.villageGraph.addLocation('Sea');
        this.villageGraph.addLocation('Hospital');
        this.villageGraph.addLocation('Cafe');
        this.villageGraph.addLocation('Shop');
        this.villageGraph.addLocation('Control');
        this.villageGraph.addLocation('Labour Exchange');
        this.villageGraph.addLocation('Home');

        // Connexions entre lieux
        this.villageGraph.connectLocations('Village', 'Sea');
        this.villageGraph.connectLocations('Village', 'Phone');
        this.villageGraph.connectLocations('Phone', 'Sea');
        this.villageGraph.connectLocations('Phone', 'Hospital');
        this.villageGraph.connectLocations('Phone', 'Cafe');
        this.villageGraph.connectLocations('Phone', 'Shop');
        this.villageGraph.connectLocations('Phone', 'Labour Exchange');
        this.villageGraph.connectLocations('Phone', 'Control');
        this.villageGraph.connectLocations('Shop', 'Home');

        // Associe les lieux aux clés d'image
        const locationImages = {
            'Village': 'village',
            'Phone': 'scene-phone',
            'Sea': 'scene-sea',
            'Hospital': 'scene-hospital',
            'Cafe': 'scene-cafe',
            'Shop': 'scene-shop',
            'Labour Exchange': 'scene-labour-exchange',
            'Control': 'scene-control',
            'Home': 'scene-private',
        };

        // Affiche l'image du lieu actuel
        const imageKey = locationImages[this.currentLocation] || 'village';
        this.add.image(400, 300, imageKey);

        // Affiche le nom du lieu
        this.add.text(20, 20, `Location : ${this.currentLocation}`, {
            font: '20px Arial',
            fill: '#ffffff'
        });

        // Affiche les boutons de navigation
        const connections = this.villageGraph.getConnections(this.currentLocation);
        connections.forEach((loc, idx) => {
            const btn = this.add.text(50, 100 + idx * 40, `Go to ${loc}`, {
                font: '18px Arial',
                fill: '#0f0',
                backgroundColor: '#222',
                padding: { x: 5, y: 3 }
            }).setInteractive({ cursor: 'pointer' });

            btn.on('pointerdown', () => {
                this.currentLocation = loc;

                if (loc === 'Sea') {
                    this.scene.start('gameover'); // Aller à la scène de fin
                } else {
                    this.scene.restart(); // Recharge la scène avec le nouveau lieu
                }
            });
        });

        // Si on est dans le Shop, affiche un bouton pour y entrer
        if (this.currentLocation === 'Shop') {
            const enterShopBtn = this.add.text(600, 500, 'Enter Shop', {
                font: '18px Arial',
                fill: '#ffffff',
                backgroundColor: '#007700',
                padding: { x: 10, y: 5 }
            }).setInteractive({ cursor: 'pointer' });

            enterShopBtn.on('pointerdown', () => {
                this.scene.start('shop'); // Passe à la scène ShopScene
            });
        }

        if (this.currentLocation === 'Home') {
            const homeBtn = this.add.text(600, 500, 'Enter Home', {
                font: '18px Arial',
                fill: '#fff',
                backgroundColor: '#007700',
                padding: { x: 10, y: 5 }
            }).setInteractive({ cursor: 'pointer' });

            homeBtn.on('pointerdown', () => {
                this.scene.start('home');
            });
        }
    }
}
