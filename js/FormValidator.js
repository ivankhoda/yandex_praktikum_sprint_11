export default class FormValidator {
    constructor(form) {
        this.form = form;
    }
    checkInputValidity(event) {
        const errorElement = document.querySelector(`.error-${event.target.name}`);

        if (event.target.value.length == 0) {
            errorElement.innerText = "Это обязательное поле";
            event.target.setAttribute("style", "margin-bottom: 6px");
            document.querySelector(".popup__button").setAttribute("style", "margin-top: 33px")
            document.querySelector(".popup__button").setAttribute("disabled", "disabled");
        }

        else if ((event.target.value.length <= 1 || event.target.value.length > 30) && event.target.type !== "url") {
            errorElement.innerText = "Должно быть от 2 до 30 символов";
            event.target.setAttribute("style", "margin-bottom: 6px");
            document.querySelector(".popup__button").setAttribute("style", "margin-top: 33px");
            document.querySelector(".popup__button").setAttribute("disabled", "disabled");
        }
        else if ((event.target.validity.typeMismatch) && event.target.type === "url") {
            errorElement.innerText = "Здесь должна быть ссылка";
        }
        else {
            errorElement.innerText = "";
            event.target.removeAttribute("style");
            document.querySelector(".popup__button").removeAttribute("style");
        }
    }
    setSubmitButtonState() {
        const inactiveButton = Array.from(document.querySelectorAll(".popup__button"));
        const inactiveButtonPlus = document.querySelectorAll(".popup__button_plus");
        const formUser = document.forms.user;
        const nameField = formUser.elements.userName.value;
        const jobField = formUser.elements.userFields.value;

        inactiveButton.forEach((button) => {

            if (nameField.length == 0 || jobField.length == 0 || nameField.length <= 1 || jobField.length <= 1 || nameField.length >= 30 || jobField.length >= 30) {
                button.classList.remove("popup__button_save");
                button.setAttribute("disabled", "disabled");
            } else {
                button.classList.add("popup__button_save");
                button.removeAttribute("disabled");
            }
        });
        const form = document.forms.new;
        const nameNew = form.elements.name.value;
        const linkNew = form.elements.link.value;
        inactiveButtonPlus.forEach((btn) => {
            if (nameNew.length === 0 || linkNew.length === 0 || nameNew.length <= 1 || nameNew.length > 30 || form.elements.link.validity.typeMismatch) {
                btn.classList.remove("popup__button_save");
                btn.setAttribute("disabled", "disabled");
            }
            else {
                btn.classList.add("popup__button_save");
                btn.removeAttribute("disabled");
            }
        })
    }
    setEventListeners(){
        this
            .form
            .querySelectorAll(".popup__input")
            .forEach((input) => {input.addEventListener("input", this.checkInputValidity)});

        this
            .form
            .querySelectorAll(".popup__input")
            .forEach((input) => {input.addEventListener("input", this.setSubmitButtonState)});
    }
}