export default class NumberTwoScene extends Phaser.Scene {
    constructor() {
        super({ key: 'two' });
    }

    create() {
        this.add.image(400, 300, 'scene-dome-two');

        const dialogue = "Ah, Number Six...\nDo you know why you're here?";
        this.add.text(100, 100, dialogue, {
            font: '20px Courier',
            fill: '#ffffff',
            wordWrap: { width: 600 }
        });

        const choices = [
            { text: "Because I resigned.", outcome: 'resigned' },
            { text: "Where am I?", outcome: 'where' },
            { text: "Let me go.", outcome: 'refuse' }
        ];

        choices.forEach((choice, i) => {
            const btn = this.add.text(120, 250 + i * 40, choice.text, {
                font: '18px Arial',
                fill: '#0f0',
                backgroundColor: '#222',
                padding: { x: 8, y: 4 }
            }).setInteractive({ useHandCursor: true });

            btn.on('pointerdown', () => this.handleChoice(choice.outcome));
        });
    }

    handleChoice(outcome) {
        this.clearScene();

        let response;
        switch (outcome) {
            case 'resigned':
                response = "That’s not good enough. We need to know why.";
                break;
            case 'where':
                response = "You're in the Village. Safe... for now.";
                break;
            case 'refuse':
                response = "You can't leave, Number Six.";
                break;
        }

        this.add.text(100, 400, response, {
            font: '20px Courier',
            fill: '#ffffff',
            wordWrap: { width: 600 }
        });

        // 🔙 Bouton Back
        const backBtn = this.add.text(600, 520, '← Back', {
            font: '18px Arial',
            fill: '#fff',
            backgroundColor: '#333',
            padding: { x: 10, y: 5 }
        }).setInteractive({ useHandCursor: true })
        
        backBtn.on('pointerdown', () => {
            this.scene.start('village'); // ou 'village', 'global', etc.
        });
    }

    clearScene() {
        this.children.removeAll();
        this.add.image(400, 300, 'scene-dome-two');
    }
}