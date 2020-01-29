export default class UsersApi {
  constructor(baseUrl, headers) {
    this.baseUrl = baseUrl;
    this.headers = headers;

    this.signInUrl = '/signin';
    this.signUpUrl = '/signup';
    this.profileUrl = '/users/me';
    this.articlesUrl = '/articles';
    this.bearer = 'Bearer ';
  }

  postSignUp(item) {
    const objJSON = {};
    objJSON.method = 'POST';
    objJSON.headers = this.headers;
    objJSON.body = JSON.stringify(item);
    return fetch(this.baseUrl + this.signUpUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => err);
  }

  postSignIn(item) {
    const objJSON = {};
    objJSON.method = 'POST';
    objJSON.headers = this.headers;
    objJSON.body = JSON.stringify(item);
    return fetch(this.baseUrl + this.signInUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => err);
  }

  getUserMe(key) {
    const objJSON = {};
    objJSON.headers = this.headers;
    objJSON.headers.authorization = this.bearer + key;
    return fetch(this.baseUrl + this.profileUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => err);
  }
  /*
  getProfileOwner() {

    return fetch(this.baseUrl + this.profileUrl, this.headers)
      .then((res) => res.json())
      .catch((err) => {
        alert('Ошибка: ' + err);
      });
  }

  getInitialCards() {
    return fetch(this.baseUrl + this.cardsUrl, this.headers)
      .then((res) => res.json())
      .catch((err) => {
        alert('Ошибка: ' + err);
      });
  }

  patchProfileOwner(item, path) {
    const objJSON = {};
    objJSON.method = 'PATCH';
    objJSON.headers = this.headers.headers;
    objJSON.body = JSON.stringify(item);
    return fetch(this.baseUrl + this.profileUrl + path, objJSON)
      .then((data) => {
        if (data.ok) return data;
      })
      .catch((err) => {
        alert('Ошибка: ' + err);
      });
  }

  deleteCardFromServer(cardId) {
    const objJSON = {};
    objJSON.method = 'DELETE';
    objJSON.headers = this.headers.headers;
    return fetch(this.baseUrl + this.cardsUrl + `/${cardId}`, objJSON)
      .then((data) => {
        if (data.ok) return data;
      })
      .catch((err) => {
        alert('Ошибка: ' + err);
      });
  }

  postCardOnServer(item) {
    const objJSON = {};
    objJSON.method = 'POST';
    objJSON.headers = this.headers.headers;
    objJSON.body = JSON.stringify(item);
    return fetch(this.baseUrl + this.cardsUrl, objJSON)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .catch((err) => {
        alert('Ошибка: ' + err);
      });
  }

  likeCardOnServer(cardId, queryMethod) {
    const objJSON = {};
    objJSON.method = queryMethod;
    objJSON.headers = this.headers.headers;
    return fetch(this.baseUrl + this.cardsUrl + this.cardsLikeUrl + `/${cardId}`, objJSON)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .catch((err) => {
        alert('Ошибка: ' + err);
      });
  }
*/
}
