//export default
class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }
    like (event) {
        if (event.currentTarget.classList.contains("place-card__like-icon")) {
            event.currentTarget.classList.toggle("place-card__like-icon_liked");
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
                                         <button class="place-card__delete-icon"></button>
                                            </div>
                                       <div class="place-card__description">
                                            <h3 class="place-card__name">${this.name}</h3>
                                            <button class="place-card__like-icon"></button>
                                       </div>`
        this.card = cardTemplate;
        this.eventsListeners();
        return cardTemplate;
    }
    eventsListeners () {
        this
            .card
            .querySelector(".place-card__like-icon")
            .addEventListener("click", this.like);
        this
            .card
            .querySelector(".place-card__delete-icon")
            .addEventListener("click", this.remove);
        this
            .card
            .querySelector(".place-card__image")
            .addEventListener("click", this.zoom);
    }
}