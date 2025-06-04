import VillageGraph from '../graph/VillageGraph.js';

export default class GlobalScene extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'global', active: false });
        this.currentLocation = 'Village';
    }

    create ()
    {
        this.villageGraph = new VillageGraph();
        this.villageGraph.addLocation('Village');
        this.villageGraph.addLocation('Phone');
        this.villageGraph.addLocation('Sea');
        this.villageGraph.addLocation('Hospital');
        this.villageGraph.addLocation('Cafe');
        this.villageGraph.addLocation('Shop');
        this.villageGraph.addLocation('Control');
        this.villageGraph.addLocation('Labour Exchange');
        
        this.villageGraph.connectLocations('Village', 'Sea');
        this.villageGraph.connectLocations('Village', 'Phone');
        this.villageGraph.connectLocations('Phone', 'Sea');
        this.villageGraph.connectLocations('Phone', 'Hospital');
        this.villageGraph.connectLocations('Phone', 'Cafe');
        this.villageGraph.connectLocations('Phone', 'Shop');
        this.villageGraph.connectLocations('Phone', 'Labour Exchange');
        this.villageGraph.connectLocations('Phone', 'Control');

        // Map locations to their image keys
        const locationImages = {
            'Village': 'village',
            'Phone': 'scene-phone',
            'Sea': 'scene-sea',
            'Hospital': 'scene-hospital',
            'Cafe': 'scene-cafe',
            'Shop': 'scene-shop',
            'Labour Exchange': 'scene-labour-exchange',
            'Control': 'scene-control'
        };

        // Display the image for the current location
        const imageKey = locationImages[this.currentLocation] || 'village';
        this.add.image(400, 300, imageKey);

        // Show current location
        this.add.text(20, 20, `Location: ${this.currentLocation}`, { font: '20px Arial', fill: '#fff' });

        // Show connected locations as buttons
        const connections = this.villageGraph.getConnections(this.currentLocation);
        connections.forEach((loc, idx) => {
            const btn = this.add.text(50, 100 + idx * 40, `Go to ${loc}`, { font: '18px Arial', fill: '#0f0', backgroundColor: '#222' })
                .setInteractive({ cursor: 'pointer' });
            btn.on('pointerdown', () => {
                this.currentLocation = loc;
                        if (loc === 'Sea') {
                this.scene.start('gameover'); // Trigger GameOver scene
                } else {
                    this.scene.restart(); // Restart to update view and image
                }
            });
        });
    }
}