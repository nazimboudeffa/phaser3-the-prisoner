export default class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'shop' });
    }

    create() {
        // Initialiser argent si besoin
        if (!this.registry.has('money')) {
            this.registry.set('money', 50);
        }

        if (!this.registry.has('inventory')) {
            this.registry.set('inventory', []);
        }

        // Affiche fond
        this.add.image(400, 300, 'scene-shop-1').setDepth(0);

        // Affiche argent
        this.moneyText = this.add.text(500, 20, '', {
            font: '22px Arial',
            fill: '#ffff00',
            backgroundColor: '#000',
            padding: { x: 5, y: 2 }
        }).setDepth(1);
        this.updateMoneyText();

        // Liste des objets à vendre
        this.itemsForSale = [
            { name: 'Montre', price: 30 },
            { name: 'Plan', price: 50 },
            { name: 'Journal', price: 10 }
        ];

        // Affiche les objets avec boutons d'achat
        this.itemsForSale.forEach((item, idx) => {
            const yPos = 120 + idx * 50;
            this.add.text(100, yPos, `${item.name} - ${item.price} crédits`, {
                font: '20px Arial',
                fill: '#fff'
            }).setDepth(1);

            const buyBtn = this.add.text(350, yPos, 'Acheter', {
                font: '18px Arial',
                fill: '#000',
                backgroundColor: '#ffcc00',
                padding: { x: 10, y: 5 }
            }).setInteractive({ cursor: 'pointer' }).setDepth(1);

            buyBtn.on('pointerdown', () => {
                this.attemptPurchase(item);
            });
        });

        // Titre
        this.add.text(50, 20, "Boutique du Village", {
            font: '28px Arial',
            fill: '#fff',
            backgroundColor: '#000000aa',
            padding: { x: 10, y: 6 }
        }).setDepth(1);

        // Bouton retour
        const backBtn = this.add.text(600, 520, '← Retour', {
            font: '20px Arial',
            fill: '#fff',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 }
        }).setInteractive({ cursor: 'pointer' }).setDepth(1);

        backBtn.on('pointerdown', () => {
            this.scene.start('global');
        });
    }

    updateMoneyText() {
        this.moneyText.setText(`Argent : ${this.registry.get('money')} crédits`);
    }

    attemptPurchase(item) {
        let money = this.registry.get('money');
        if (money >= item.price) {
            money -= item.price;
            this.registry.set('money', money);
            this.updateMoneyText();

            const inventory = this.registry.get('inventory');
            inventory.push(item.name);
            this.registry.set('inventory', inventory);

            this.showMessage(`${item.name} acheté !`, '#0f0');
        } else {
            this.showMessage(`Pas assez d'argent pour ${item.name} !`, '#f00');
        }
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
        this.time.delayedCall(2000, () => {
            if (this.msgText) this.msgText.destroy();
            this.msgText = null;
        });
    }
}