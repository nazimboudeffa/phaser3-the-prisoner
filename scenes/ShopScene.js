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
        this.add.image(400, 300, 'scene-shop-private').setDepth(0);

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
            { name: 'Watch', price: 30 },
            { name: 'Map', price: 50 },
            { name: 'Journal', price: 10 }
        ];

        // Affiche les objets avec boutons d'achat
        this.itemsForSale.forEach((item, idx) => {
            const yPos = 120 + idx * 50;
            this.add.text(100, yPos, `${item.name} - ${item.price} credits`, {
                font: '20px Arial',
                fill: '#fff'
            }).setDepth(1);

            const buyBtn = this.add.text(350, yPos, 'Buy', {
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
        this.add.text(50, 20, "Village Shop", {
            font: '28px Arial',
            fill: '#fff',
            backgroundColor: '#000000aa',
            padding: { x: 10, y: 6 }
        }).setDepth(1);

        // Bouton retour
        const backBtn = this.add.text(600, 520, '← Back', {
            font: '20px Arial',
            fill: '#fff',
            backgroundColor: '#444',
            padding: { x: 10, y: 5 }
        }).setInteractive({ cursor: 'pointer' }).setDepth(1);

        backBtn.on('pointerdown', () => {
            this.scene.start('village');
        });
    }

    updateMoneyText() {
        this.moneyText.setText(`Money : ${this.registry.get('money')} credits`);
    }

    attemptPurchase(item) {
        this.money = this.registry.get('money');
        this.inventory = this.registry.get('inventory');
        if (this.inventory.includes(item.name)) {
            this.showMessage(`${item.name} is already in your inventory!`, '#f00');
        } else if (this.money >= item.price) {
            this.money -= item.price;
            this.inventory.push(item.name);

            this.registry.set('money', this.money);
            this.updateMoneyText();
            // Mettre à jour l'inventaire dans le registre
            this.registry.set('inventory', this.inventory);

            this.showMessage(`${item.name} bought !`, '#0f0');
        } else {
            this.showMessage(`Not enugh money for ${item.name} !`, '#f00');
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