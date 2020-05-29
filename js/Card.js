export default class Card {
    constructor(name, link, likes, ownerId, cardId, myId, api) {
        this.name = name;
        this.link = link;
        this.likes = likes;
        this.ownerId = ownerId;
        this.cardId = cardId;
        this.myId = myId;
        this.api = api;
    }
    like () {
        if (!this.card.querySelector(".place-card__like-icon").classList.contains("place-card__like-icon_liked")){
            this.api.likeCard(this.cardId)
                .then((res) => {
                    this.card.querySelector(".place-card__like-icon").classList.add('place-card__like-icon_liked');
                    this.card.querySelector('.place-card__like-count').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err)
                });
        } else {
            this.api.dislikeCard(this.cardId)
                .then((res) => {
                    this.card.querySelector(".place-card__like-icon").classList.remove('place-card__like-icon_liked');
                    this.card.querySelector('.place-card__like-count').textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }
    remove(event) {
        if (event.currentTarget.classList.contains("place-card__delete-icon")) {
            event.target.parentElement.parentElement.parentElement.removeChild(event.target.parentElement.parentElement);
        }
    }
    zoom(event) {
        if(event.target.classList.contains("place-card__image")) {
            document.querySelector(".wide-card").classList.add("popup_is-opened");
            document.querySelector(".place-card__image_is-wide").setAttribute("style",
                `${event.target.getAttribute("style")}`);
        }
    }
    create() {
        const cardTemplate = document.createElement("div");
        cardTemplate.classList.add("place-card");
        cardTemplate.innerHTML = `<div class="place-card__image" style="background-image: url(${this.link})">
                                            </div>
                                       <div class="place-card__description">
                                            <h3 class="place-card__name">${this.name}</h3>
                                            <div class="place-card__attributes">
                                            <button class="place-card__like-icon"></button>
                                                <p class="place-card__like-count">${this.likes.length}</p>
                                            </div>
                                       </div>`
        this.card = cardTemplate;
        if (this.ownerId === this.myId) {
            this
                .card
                .querySelector(".place-card__image")
                .insertAdjacentHTML(
                    "beforeend",
                    `<button class="place-card__delete-icon"></button>`
                )
            this
                .card
                .querySelector('.place-card__delete-icon')
                .addEventListener(
                    'click',
                    (event) => {
                        if (window.confirm()) {
                            this.api.deleteCard(this.cardId)
                                .then(() => {
                                    this.card.remove()
                                })
                                .catch((err) => {
                                    console.log(err)
                                });
                        }
                    })
        }
        this.likes.forEach((like)=> {
            if (like._id === this.myId){
                this.card.querySelector(".place-card__like-icon").classList.add('place-card__like-icon_liked');
            }
        });
        this.eventsListeners();
        return cardTemplate;
    }
    eventsListeners () {
        this
            .card
            .querySelector(".place-card__like-icon")
            .addEventListener(
                "click",
                () => {
                    this.like()
                })
        this
            .card
            .querySelector(".place-card__image")
            .addEventListener("click", this.zoom);
    }
}