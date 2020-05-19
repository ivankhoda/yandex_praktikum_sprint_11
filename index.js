import {
    addPlaceForm,
    api,
    cardList, changeAvatar,
    myId,
    popupAvatar,
    popupCard,
    popupPlace,
    popupUser,
    updateUserInfoForm,
    user
} from "./js/Variables.js";
import Card from "./js/Card.js";


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

let renderLoading = function (isLoading) {
    if(isLoading){
        document.querySelector(".popup__button_plus").innerHTML = "Загрузка..."
        document.querySelector(".popup__button_save").innerHTML = "Загрузка..."
    }
    else {
        document.querySelector(".popup__button_plus").innerHTML = "+"
        document.querySelector(".popup__button_save").innerHTML = "Сохранить"
    }
}

let addNewCard = function () {

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

document.querySelector(".popup__button_plus").addEventListener(
    'click',
    (event) => {
        event.preventDefault();
        renderLoading(true);
        addNewCard();

    }
);



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

let formReset = function () {
    document.new.reset();
    document.user.reset();
    document.avatar.reset();
    document.querySelectorAll(".warn").forEach((warn) => {
        warn.innerText ="";
    })
    document.querySelector(".popup__button_plus").classList.remove("popup__button_save")
    document.querySelector(".popup__button_plus").setAttribute("disabled", "disabled");
}



let updateUserInfo = function () {
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

let updateAvatar = function () {
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

updateUserInfoForm.setEventListeners();
addPlaceForm.setEventListeners();
changeAvatar.setEventListeners();





