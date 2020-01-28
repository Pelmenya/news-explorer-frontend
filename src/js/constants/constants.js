const profileOwner = 'profileOwner';
const serverUrlHome = 'http://localhost:3000';
const serverUrlUsers = 'https://api.news-service.pro';
const serverUrlNews = 'https://newsapi.org/v2/everything';
const apiKeyNews = '51e915dcdcf546cca9ee006fbba7d401';
const pageSizeNews = 100;
const numberOfDays = 7;

const ERROR_SERVER_NEWS_DESCRIPTION = '«Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»';
const ERROR_SERVER_NEWS = 'Возникла ошибка при обращении на сервер!';


module.exports = {
  profileOwner,
  serverUrlHome,
  serverUrlUsers,
  serverUrlNews,
  apiKeyNews,
  pageSizeNews,
  numberOfDays,
  ERROR_SERVER_NEWS,
  ERROR_SERVER_NEWS_DESCRIPTION,
};
