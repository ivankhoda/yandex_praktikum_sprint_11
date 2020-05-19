import {token, baseURL} from "../index.js"

export default class Api {
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


    postNewCard(name, link) {
        return fetch(`${this.options.baseURL}/cards`, {
                method: "POST",
                headers: {
                    authorization: token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    link: link
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

    deleteCard(id) {
        return fetch(`${this.options.baseURL}/cards/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: token,
                    'Content-Type': 'application/json'
                }
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


    likeCard(id){
       return fetch(`${this.options.baseURL}/cards/like/${id}`, {
                method: "PUT",
                headers: {
                    authorization: token,
                    'Content-Type': 'application/json'
                },
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
    dislikeCard(id) {
        return fetch(`${this.options.baseURL}/cards/like/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: token,
                    'Content-Type': 'application/json'
                },
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
    changeAvatar(avatar){
        return fetch(`${this.options.baseURL}/users/me/avatar`, {
                method: "PATCH",
                headers: {
                    authorization: token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatar,
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