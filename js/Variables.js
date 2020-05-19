import Api from "./Api.js";
import CardList from "./CardList.js";
import Popup from "./Popup.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";

const token = "f22aff37-eb29-4584-988f-49dedb4638b8";
const baseURL = "https://praktikum.tk/cohort10";
const myId = "8f5d7ee133c09e43d0c56eaa";
const api = new Api({baseURL, token});
const cardList = new CardList(document.querySelector(".places-list"), api);
const popupUser = new Popup(document.querySelector(".edit-profile"));
const popupPlace = new Popup(document.querySelector(".add-place"));
const popupCard = new Popup(document.querySelector(".wide-card"));
const popupAvatar = new Popup(document.querySelector(".edit-avatar"));
const options = {token, baseURL};

const user = new UserInfo((document.querySelector(".user-info__name")), (document.querySelector(".user-info__job")));
const updateUserInfoForm = new FormValidator(document.querySelector(".add-place-form"));
const addPlaceForm = new FormValidator(document.querySelector(".edit-user-info"));
const changeAvatar = new FormValidator(document.querySelector(".edit-user-avatar"));

export {token, baseURL, myId, api, cardList, popupUser, popupPlace, popupCard, popupAvatar, options, user, updateUserInfoForm, addPlaceForm, changeAvatar};