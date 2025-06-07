import VillageGraph from '../graph/VillageGraph.js';

export default class VillageScene extends Phaser.Scene {
    constructor() {
        super({ key: 'village', active: false });
    }

    create() {
        // Initialiser le graphe
        this.villageGraph = new VillageGraph();
        this.villageGraph.addLocation('Shop');
        this.villageGraph.addLocation('Home');
        this.villageGraph.addLocation('Phone Box'); // point central
        this.villageGraph.addLocation('Cafe');
        //this.villageGraph.addLocation('Labour Exchange');
        //this.villageGraph.addLocation('Hospital');
        //this.villageGraph.addLocation('Green Dome');
        //this.villageGraph.addLocation('Beach');
        this.villageGraph.addLocation('Sea');
        //this.villageGraph.addLocation('Recreation Hall');
        //this.villageGraph.addLocation('Town Hall');
        //this.villageGraph.addLocation('Tower');
        //this.villageGraph.addLocation('Helipad');
        //this.villageGraph.addLocation('Peoples Home');
        //this.villageGraph.addLocation('Lighthouse');
        //this.villageGraph.addLocation('Graveyard');
        //this.villageGraph.addLocation('Chess Lawn');
        //this.villageGraph.addLocation('Bandstand');

        // Connexions entre lieux
        this.villageGraph.connectLocations('Phone Box', 'Shop');
        this.villageGraph.connectLocations('Shop', 'Home');
        this.villageGraph.connectLocations('Phone Box', 'Cafe');
        this.villageGraph.connectLocations('Phone Box', 'Sea');
        //this.villageGraph.connectLocations('Cafe', 'Labour Exchange');
        //this.villageGraph.connectLocations('Labour Exchange', 'Hospital');
        //this.villageGraph.connectLocations('Phone Box', 'Town Hall');
        //this.villageGraph.connectLocations('Town Hall', 'Peoples Home');
        //this.villageGraph.connectLocations('Peoples Home', 'Beach');
        //this.villageGraph.connectLocations('Beach', 'Sea');
        //this.villageGraph.connectLocations('Peoples Home', 'Helipad');
        //this.villageGraph.connectLocations('Village', 'Green Dome');
        //this.villageGraph.connectLocations('Green Dome', 'Recreation Hall');
        //this.villageGraph.connectLocations('Recreation Hall', 'Tower');
        //this.villageGraph.connectLocations('Tower', 'Lighthouse');
        //this.villageGraph.connectLocations('Lighthouse', 'Graveyard');

        // Associe les lieux aux clés d'image
        const locationImages = {
            'Phone Box': 'scene-phone',
            'Sea': 'scene-sea',
            //'Hospital': 'scene-hospital',
            'Cafe': 'scene-cafe',
            'Shop': 'scene-shop',
            //'Labour Exchange': 'scene-labour-exchange',
            //'Control': 'scene-control',
            'Home': 'scene-home',
        };

        // Affiche l'image du lieu actuel
        this.currentLocation = this.registry.get('currentLocation');
        const imageKey = locationImages[this.currentLocation] || 'Phone Box';
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
