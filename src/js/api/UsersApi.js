export default class UsersApi {
  constructor(urls, headers, bearer) {
    this.baseUrl = urls.serverUrl;
    this.signInUrl = urls.signInUrl;
    this.signUpUrl = urls.signUpUrl;
    this.profileUrl = urls.profileUrl;
    this.articlesUrl = urls.articlesUrl;

    this.headers = headers;
    this.bearer = bearer;
  }

  postSignUp(item) {
    const objJSON = {};
    objJSON.method = 'POST';
    objJSON.headers = this.headers;
    objJSON.body = JSON.stringify(item);
    return fetch(this.baseUrl + this.signUpUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => alert(err));
  }

  postSignIn(item) {
    const objJSON = {};
    objJSON.method = 'POST';
    objJSON.headers = this.headers;
    objJSON.body = JSON.stringify(item);

    return fetch(this.baseUrl + this.signInUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => alert(err));
  }

  getUserMe(key) {
    const objJSON = {};
    objJSON.headers = this.headers;
    objJSON.headers.authorization = this.bearer + key;

    return fetch(this.baseUrl + this.profileUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => alert(err));
  }

  getUserArticles(key) {
    const objJSON = {};
    objJSON.headers = this.headers;
    objJSON.headers.authorization = this.bearer + key;

    return fetch(this.baseUrl + this.articlesUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => alert(err));
  }

  postArticle(item, key) {
    const objJSON = {};
    objJSON.method = 'POST';
    objJSON.headers = this.headers;
    objJSON.body = JSON.stringify(item);
    objJSON.headers.authorization = this.bearer + key;

    return fetch(this.baseUrl + this.articlesUrl, objJSON)
      .then((res) => res.json())
      .catch((err) => alert(err));
  }

  deleteArticle(item, key) {
    const objJSON = {};
    objJSON.method = 'DELETE';
    objJSON.headers = this.headers;
    objJSON.headers.authorization = this.bearer + key;

    return fetch(`${this.baseUrl}${this.articlesUrl}/${item}`, objJSON)
      .then((res) => res.json())
      .catch((err) => alert(err));
  }
}
