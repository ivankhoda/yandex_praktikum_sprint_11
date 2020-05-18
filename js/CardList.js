//export default
class CardList {
    constructor(container, cards) {
        this.container = container; //document.querySelector(".places-list");
        this.cards = [];
    }
    addCard(card) {
        this.cards.push(card);
    }
    render( ) {
        this.cards.forEach((card) => {
            this.container.appendChild(card.create());
        });
    }
    renderOneCard(card){
        this.container.appendChild(card.create());
    }

}

