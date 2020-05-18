// Очень здорово что вы освоили модули, но по условиям задания принта
// скрипты должны быть подключены через <script>
// Надо исправить
// Комментарий: Подключил все скриптами;

// import Card from "./js/Card.js";
// import CardList from "./js/CardList.js";
// import Popup from "./js/Popup.js";
// import UserInfo from "./js/UserInfo.js";
// import FormValidator from "./js/FormValidator.js";
// import Api from "./js/Api.js";
// import { initialCards } from "./js/initialCards.js";

const token = "f22aff37-eb29-4584-988f-49dedb4638b8";
const baseURL = "https://praktikum.tk/cohort10";

const api = new Api({ baseURL, token });

const cardList = new CardList(document.querySelector(".places-list"));
api.getInitialCards()
  .then(result => {
    for (let card of result) {
      card = new Card(card.name, card.link);
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

document.querySelector(".popup__button_plus").addEventListener(
  'click',
  (event) => {
    event.preventDefault();
    // const
    const card = new Card(document.new.name.value, document.new.link.value);
    cardList.addCard(card);
    cardList.renderOneCard(card);
    document.new.reset();
    document.querySelector(".add-place").classList.remove("popup_is-opened");
  }
);

// Эта троица попапов вся сплошь const
// Можно лучше
let popupUser = new Popup(document.querySelector(".edit-profile"));
let popupPlace = new Popup(document.querySelector(".add-place"));
let popupCard = new Popup(document.querySelector(".wide-card"));

document.querySelector(".user-info__edit").addEventListener(
  "click",
  () => {
    popupUser.open();
    user.setUserInfo();
  });
document.querySelector(".user-info__button").addEventListener(
  "click",
  () => {
    popupPlace.open()
  });
document.querySelectorAll(".popup__close").forEach((
  closeButton) => {
  closeButton.addEventListener(
    "click",
    evt => {
      formReset();
      popupUser.close();
      popupPlace.close();
      popupCard.close();

    }
  )
}
);
function formReset() {
  document.new.reset();
  document.user.reset();
  document.querySelectorAll(".warn").forEach((warn) => {
    warn.innerText = "";
  })
  document.querySelector(".popup__button_plus").classList.remove("popup__button_save")
  document.querySelector(".popup__button_plus").setAttribute("disabled", "disabled");
}

let user = new UserInfo((document.querySelector(".user-info__name")), (document.querySelector(".user-info__job")));

function updateUserInfo() {
  api.editProfile(document.user.userName.value, document.user.userFields.value)
    .then((res) => {

      document.querySelector(".user-info__name").textContent = res.name;
      document.querySelector(".user-info__job").textContent = res.about;
      document.querySelector(".edit-profile").classList.remove("popup_is-opened");
    })
    .catch((err) => {
      // Можно лучше -- здесь и в подобных случаях
      // Здесь, если дальше цепочка промисов не продолжается, уже возвращать реджект не надо
      // тут как раз достаточно черкануть в консоль
      return Promise.reject(`Error: ${err.status}`)
    });

  user.updateUserInfo();

}

document.querySelector(".popup__button_save").addEventListener(
  "click",
  updateUserInfo
);

const updateUserInfoForm = new FormValidator(document.querySelector(".add-place-form"));
const addPlaceForm = new FormValidator(document.querySelector(".edit-user-info"));
updateUserInfoForm.setEventListeners();
addPlaceForm.setEventListeners();







