export default class SeaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'sea' });
    }

    create() {
        this.add.text(300, 50, 'Duel de dés contre le Hover', {
            font: '22px Arial',
            fill: '#ffffff',
        });

        const rollBtn = this.add.text(340, 500, '🎲 Roll dice', {
            font: '24px Arial',
            backgroundColor: '#222',
            fill: '#0f0',
            padding: { x: 10, y: 5 }
        }).setInteractive()
          .on('pointerdown', () => this.rollDice());
    }

    rollDice() {
        const playerRoll = Phaser.Math.Between(1, 6);
        const hoverRoll = Phaser.Math.Between(1, 6);

        // Afficher les dés
        this.add.image(250, 300, `dice${playerRoll}`).setScale(0.3);
        this.add.image(500, 300, `dice${hoverRoll}`).setScale(0.3);

        const resultText = this.add.text(250, 400, '', {
            font: '22px Arial',
            fill: '#fff'
        });

        if (playerRoll > hoverRoll) {
            resultText.setText("You win !");
            this.time.delayedCall(1500, () => {
                this.scene.start('village'); // ou retour à Prison
            });
        } else if (playerRoll < hoverRoll) {
            resultText.setText("Hover win...");
            this.time.delayedCall(1500, () => {
                this.scene.start('gameover'); // ou retour à Prison
            });
        } else {
            resultText.setText("Back to the village !");
            this.time.delayedCall(1500, () => {
                this.scene.start('village'); // ou retour à Prison
            });
        }
    }
}