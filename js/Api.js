//export default
class Api {
  constructor(options) {
    this.options = options;
  }

  getUserInfo() {
    return fetch(`${this.options.baseURL}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.options.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();

        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
      });
  }

  getInitialCards() {
    return fetch(`${this.options.baseURL}/cards`, {
      method: "GET",
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status} `);
      })
      .catch((err) => {
        // Можно лучше
        // return Promise.reject(new Error(err.message));
        return Promise.reject(`Error: ${err.status}`);
      });
  }

  editProfile(name, about) {
    return fetch(`${this.options.baseURL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status} `);
      })
      .catch((err) => {
        return Promise.reject(`Error: ${err.status}`);
      });
  }
}


//     postNewCard(name, link){
//         fetch("https://praktikum.tk/cohort10/cards", {
//                 method: "POST",
//                 headers: {
//                     authorization: token,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     name: `${name}`,
//                     link: `${link}`
//                 })
//             }
//         )
//             .then(res => res.json())
//             .then((result) => {
//                 console.log(result);
//             });
//
//     }
//     countLikes(){
//
//     }
//     deleteCard(name, link){
//         fetch("https://praktikum.tk/cohort10/cards", {
//                 method: "DELETE",
//                 headers: {
//                     authorization: token,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     name: `${name}`,
//                     link: `${link}`
//                 })
//             }
//         )
//             .then(res => res.json())
//             .then((result) => {
//                 console.log(result);
//             });
//
//     }
//     toggleLike(){
//         fetch("https://praktikum.tk/cohort10/users/me/avatar", {
//                 method: "PATCH",
//                 headers: {
//                     authorization: token,
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     // name: `${name}`,
//                     // link: `${link}`
//                 })
//             }
//         )
//             .then(res => res.json())
//             .then((result) => {
//                 console.log(result);
//             });
//
//     }
//
// }

// class Api {
//     constructor(option) {
//         this.option = option;
//     }
// ​
//     getInitialCards() {
//
//         fetch(`${this.option.baseUrl}/users/me`, { ...this.option })
//
//             .then(res => {
//                 if (res.ok) {
//                     return res.json();
//                 }
//                 return Promise.reject(`Ошибка: ${res.status}`)
//             })
//
// ​
//     .then((result) => {
//             //console.log(result);
//             //console.log(result.name);
//         ​
//             /*  Надо исправить: Для реализации вы создавали в прошлом спринте отдельные классы и методы.
//             *  Не переносите и не дублируйте реализацию в  класс Api. С класса можно только возвращать данные
//             *  которые получены от сервера. Реализацию необходимо удалить, а этот метод вызывать из других классов(методов)
//             */
//             UserInfoName.textContent = result.name;
//             UserInfoJob.textContent = result.about;
//             userInfoOpen.insertAdjacentHTML(
//                 "beforebegin",
//                 `<div class="user-info__photo style="background-image: url(${result.avatar})">`
//             );
//         })
//             .catch ((err) => {
//                 console.log(err);
//             });
//     }
// }
//
// // Надо исправить: вызовы надо делать из классов
// api.getInitialCards();
// api.addArrayCard();
// api.addData();
// Collapse