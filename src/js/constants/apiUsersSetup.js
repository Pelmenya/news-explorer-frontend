const serverUrl = 'https://api.396697-pelmenya.tmweb.ru';
const signInUrl = '/signin';
const signUpUrl = '/signup';
const profileUrl = '/users/me';
const articlesUrl = '/articles';
const bearer = 'Bearer ';

const urls = {
  serverUrl,
  signInUrl,
  signUpUrl,
  profileUrl,
  articlesUrl,
};

const headers = {
  'Content-Type': 'application/json; charset=UTF-8',
};

export { urls, headers, bearer };
