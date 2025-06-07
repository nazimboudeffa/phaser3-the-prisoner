export default class IntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'intro' });
    }

    create() {
        this.add.image(400, 300, 'village');       

        const story = [
            "You wake up in a strange place.",
            "No memory of how you got here.",
            "A voice echoes: 'You are Number 6.'",
            "Welcome to the Village..."
        ];

        this.textIndex = 0;
        this.textDisplay = this.add.text(100, 200, '', {
            font: '24px Courier',
            fill: '#ffffff',
            wordWrap: { width: 600 }
        });

        this.time.addEvent({
            delay: 2000,
            repeat: story.length - 1,
            callback: () => {
                this.textDisplay.setText(story[this.textIndex]);
                this.textIndex++;
            }
        });

        // Start button appears after all lines
        this.time.delayedCall(story.length * 2000, () => {
            const btn = this.add.text(300, 500, 'Enter the Village', {
                font: '20px Arial',
                fill: '#fff',
                backgroundColor: '#000'
            }).setInteractive({ cursor: 'pointer' });

            btn.on('pointerdown', () => {
                // Start the VillageScene after clicking the button
                if (!this.registry.has('currentLocation')) {
                    this.registry.set('currentLocation', 'Phone Box'); // Set initial location
                }
                this.scene.start('village'); // go to the aerial view
            });
        });
    }
}
