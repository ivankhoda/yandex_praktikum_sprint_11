export default class UserInfo {
    constructor(name, job) {
        this.name = name;
        this.job = job;
    }
    setUserInfo() {
        this.name = document.querySelector(".user-info__name").innerText;
        this.job = document.querySelector(".user-info__job").innerText;
        document.user.userName.value = this.name;
        document.user.userFields.value = this.job;
    }
    updateUserInfo() {
        event.preventDefault();
    }
}