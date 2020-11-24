class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url + "users/me", {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }

  updateUserInfo(newName, newAbout) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then((res) => this._getResponseData(res));
  }

  updateUserAvatar(newAvatar) {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  getCards() {
    return fetch(this._url + "cards", {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }

  addNewCard(cardName, cardLink) {
    return fetch(this._url + "cards", {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardID) {
    return fetch(this._url + "cards/" + cardID, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }

  putLike(cardID) {
    return fetch(this._url + "cards/likes/" + cardID, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }

  removeLike(cardID) {
    return fetch(this._url + "cards/likes/" + cardID, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._getResponseData(res));
  }
};

const api = new Api (
  "https://mesto.nomoreparties.co/v1/cohort-15/",
  "00e3d586-abb9-483a-af25-8c5b37844ed8"
);

export default api;
