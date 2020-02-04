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

  getUserArticles(key) {
    const objJSON = {};
    objJSON.headers = this.headers;
    objJSON.headers.authorization = this.bearer + key;

    return fetch(this.baseUrl + this.articlesUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => err);
  }

  postArticle(item, key) {
    const objJSON = {};
    objJSON.method = 'POST';
    objJSON.headers = this.headers;
    objJSON.body = JSON.stringify(item);
    objJSON.headers.authorization = this.bearer + key;

    return fetch(this.baseUrl + this.articlesUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => err);
  }

  deleteArticle(item, key) {
    const objJSON = {};
    objJSON.method = 'DELETE';
    objJSON.headers = this.headers;
    objJSON.headers.authorization = this.bearer + key;

    return fetch(`${this.baseUrl}${this.articlesUrl}/${item}`, objJSON)
      .then((res) => res.json())
      .catch((err) => err);
  }
}
