export default class SeaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'sea' });
        this.resultText = null;
        this.rollBtn = null;
    }

    create() {
        this.add.text(200, 50, 'You are facing the Hover', {
            font: '22px Arial',
            fill: '#ffffff',
        });

        this.rollBtn = this.add.text(340, 500, '🎲 Roll dice', {
            font: '24px Arial',
            backgroundColor: '#222',
            fill: '#0f0',
            padding: { x: 10, y: 5 }
        }).setInteractive({ useHandCursor: true })
          .on('pointerdown', () => this.rollDice());
    }

    rollDice() {
        // Nettoyage de l'ancien bouton si existant
        if (this.rollBtn) {
            this.rollBtn.destroy();
            this.rollBtn = null;
        }

        // Désactiver résultat précédent
        if (this.resultText) {
            this.resultText.destroy();
            this.resultText = null;
        }

        // Création des dés et textes
        const playerDice = this.add.image(250, 300, 'dice1');
        this.add.text(200, 200, 'Your dice', { font: '18px Arial', fill: '#fff' });

        const hoverDice = this.add.image(500, 300, 'dice1');
        this.add.text(450, 200, 'Hover dice', { font: '18px Arial', fill: '#fff' });

        // Prépare le texte de résultat vide
        this.resultText = this.add.text(250, 420, '', {
            font: '22px Arial',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        }).setDepth(10);

        // Animation de lancer
        const maxRolls = 10;
        let rollCount = 0;

        const rollInterval = this.time.addEvent({
            delay: 80,
            repeat: maxRolls - 1,
            callback: () => {
                playerDice.setTexture(`dice${Phaser.Math.Between(1, 6)}`);
                hoverDice.setTexture(`dice${Phaser.Math.Between(1, 6)}`);
                rollCount++;
                if (rollCount >= maxRolls) {
                    rollInterval.remove(false); // Stop the interval
                    // Final roll and result
                    const finalPlayer = Phaser.Math.Between(1, 6);
                    const finalHover = Phaser.Math.Between(1, 6);

                    playerDice.setTexture(`dice${finalPlayer}`);
                    hoverDice.setTexture(`dice${finalHover}`);

                    let resultMsg = '';
                    if (finalPlayer > finalHover) {
                        resultMsg = "You win !";
                    } else if (finalPlayer < finalHover) {
                        resultMsg = "Hover wins...";
                    } else {
                        resultMsg = "Same score, play again!";
                    }

                    this.resultText.setText(resultMsg);
                    this.tweens.add({
                        targets: this.resultText,
                        alpha: { from: 0, to: 1 },
                        duration: 300
                    });

                    // Réagir au résultat
                    if (finalPlayer > finalHover) {
                        this.time.delayedCall(1500, () => {
                            const inv = this.registry.get('inventory') || [];
                            if (!inv.includes('Talisman')) {
                                this.registry.set('inventory', [...inv, 'Talisman']);
                            }
                            this.scene.start('village');
                        });
                    } else if (finalPlayer < finalHover) {
                        this.time.delayedCall(1500, () => {
                            this.scene.start('gameover');
                        });
                    } else {
                        this.time.delayedCall(1000, () => {
                            this.rollBtn = this.add.text(340, 500, '🎲 Roll again', {
                                font: '24px Arial',
                                backgroundColor: '#444',
                                fill: '#0f0',
                                padding: { x: 10, y: 5 }
                            }).setInteractive()
                            .on('pointerdown', () => this.rollDice());
                        });
                    }
                }
            }
        });
    }
}
