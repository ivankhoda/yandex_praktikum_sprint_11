import './index.css';
import Card from "../js/Card.js";
import CardList from "../js/CardList.js";
import Popup from "../js/Popup.js";
import UserInfo from "../js/UserInfo.js";
import FormValidator from "../js/FormValidator.js";
import {Api} from "../js/Api.js";



const token = "f22aff37-eb29-4584-988f-49dedb4638b8";
let baseURL;
if(NODE_ENV === 'production') {
    baseURL =  "https://praktikum.tk/cohort10"
}
if (NODE_ENV === 'development') {
    baseURL =  "http://praktikum.tk/cohort10"
}

const myId = "8f5d7ee133c09e43d0c56eaa";
const api = new Api({baseURL, token});
const cardList = new CardList(document.querySelector(".places-list"), api);

api.getInitialCards()
    .then(result => {
        for (let card of result) {
            card = new Card(card.name, card.link, card.likes, card.owner._id, card._id, myId, api);
            cardList.addCard(card);
        }
    })
    .then(() => {
        cardList.render()
    })
    .catch((err) => {
        return Promise.reject(`Error: ${err.status}`)
    });

api.getUserInfo()
    .then(result => {
        document.querySelector(".user-info__name").innerText = result.name;
        document.querySelector(".user-info__job").innerText = result.about;
        document.querySelector(".user-info__photo").style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((err) => {
        return Promise.reject(`Error: ${err.status}`)
    });

function renderLoading(isLoading) {
    if(isLoading){
        document.querySelector(".popup__button_plus").innerHTML = "Загрузка..."
        document.querySelector(".popup__button_save").innerHTML = "Загрузка..."
    }
    else {
        document.querySelector(".popup__button_plus").innerHTML = "+"
        document.querySelector(".popup__button_save").innerHTML = "Сохранить"
    }
}

function addNewCard () {

    api.postNewCard(document.new.name.value, document.new.link.value)
        .then((res) => {

            const card = new Card(res.name, res.link, res.likes, res.owner._id, res._id, myId, api);

            cardList.addCard(card);
            cardList.renderOneCard(card);

        })
        .catch((err) => {
            return Promise.reject(`Error: ${err.status}`)
        })
        .finally(() => {
            document.new.reset();
            document.querySelector(".add-place").classList.remove("popup_is-opened");
            renderLoading(false);
        })
}
const popupBtnPlus = document.querySelector(".popup__button_plus")
popupBtnPlus
    .addEventListener(
    'click',
    (event) => {
        event.preventDefault();
        renderLoading(true);
        addNewCard();

    }
);

const popupUser = new Popup(document.querySelector(".edit-profile"));
const popupPlace = new Popup(document.querySelector(".add-place"));
const popupCard = new Popup(document.querySelector(".wide-card"));
const popupAvatar = new Popup(document.querySelector(".edit-avatar"));

document.querySelector(".user-info__edit").addEventListener(
    "click",
    () => {
        popupUser.open();
        user.setUserInfo();
    });
document.querySelector(".user-info__button").addEventListener(
    "click",
    () => {
        popupPlace.open();
    });
document.querySelector(".user-info__photo").addEventListener(
    "click",
    () => {
        popupAvatar.open();
    }
)

document.querySelectorAll(".popup__close").forEach((
    closeButton) => {
        closeButton.addEventListener(
            "click",
            evt => {
                popupCard.close();
                popupAvatar.close();
                popupUser.close();
                popupPlace.close();
                formReset();
            }
        )
    }
);
function formReset () {
    document.new.reset();
    document.user.reset();
    document.avatar.reset();
    document.querySelectorAll(".warn").forEach((warn) => {
        warn.innerText ="";
    })
    document.querySelector(".popup__button_plus").classList.remove("popup__button_save")
    document.querySelector(".popup__button_plus").setAttribute("disabled", "disabled");
}

const user = new UserInfo((document.querySelector(".user-info__name")), (document.querySelector(".user-info__job")));

function updateUserInfo() {
    api.editProfile(document.user.userName.value, document.user.userFields.value)
        .then((res) => {
            document.querySelector(".user-info__name").textContent = res.name;
            document.querySelector(".user-info__job").textContent = res.about;

        })
        .catch((err) => {
            return Promise.reject(`Error: ${err.status}`)
        })
        .finally(()=>{
            document.querySelector(".edit-profile").classList.remove("popup_is-opened");
            renderLoading(false);
        })

    user.updateUserInfo();

}

document.querySelector(".popup__button_save").addEventListener(
    "click",
    ()=> {
        renderLoading(true)
        updateUserInfo();
    }
);

function updateAvatar() {
    api.changeAvatar(document.avatar.userAvatar.value)
        .then((res) => {
            document.querySelector(".user-info__photo").style.backgroundImage = `url(${res.avatar})`
        })
        .catch((err) => {
            return Promise.reject(`Error: ${err.status}`)
        });
}
document.querySelector(".popup__button_avatar").addEventListener(
    "click",
    updateAvatar
);


const updateUserInfoForm = new FormValidator(document.querySelector(".add-place-form"));
const addPlaceForm = new FormValidator(document.querySelector(".edit-user-info"));
const changeAvatar = new FormValidator(document.querySelector(".edit-user-avatar"));
updateUserInfoForm.setEventListeners();
addPlaceForm.setEventListeners();
changeAvatar.setEventListeners();


export {token, baseURL}



