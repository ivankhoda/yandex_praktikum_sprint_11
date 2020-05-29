export default class CardList {
    constructor(container, cards, api) {
        this.container = container;
        this.cards = [];
        this.api = api;
    }
    addCard(card) {
        this.cards.push(card);
    }
    render( ) {
        this.cards.forEach((card) => {
            if(card.ownerId === "8f5d7ee133c09e43d0c56eaa") {
                this.container.appendChild(card.create());
            }
        });
    }
    renderOneCard(card){
        this.container.appendChild(card.create());
    }
}

