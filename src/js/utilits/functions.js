import { searchNothingTemplate } from '../constants/elements';
import { searchAct } from '../constants/containers';
import { ERROR_SERVER_NEWS_DESCRIPTION } from '../constants/errors';

/** Функция для создания DOM элемента */
function createElementDOM(
  element,
  classElement,
  textContent = '',
  styleElement = '',
  datetime = ''
) {
  const newElement = document.createElement(element);
  newElement.className = classElement;
  if (textContent !== '') {
    newElement.textContent = textContent;
    console.log(textContent);
  }
  if (styleElement !== '') {
    newElement.style = styleElement;
  }
  if (datetime !== '') {
    newElement.dateTime = datetime;
  }
  return newElement;
}

/** Функция возвращает профиль из localStorage */
function getProfile(item) {
  return JSON.parse(localStorage.getItem(item));
}

/** Функция удаляет профиль из localStorage */
function removeProfile(item) {
  localStorage.removeItem(item);
}

/** Функция для отображения ошибки с сервера News */
function errorNewsServer(error = '') {
  if (searchAct.isFull) searchAct.close();
  searchAct.open(searchNothingTemplate.content.cloneNode(true), 'search-nothing');
  document.querySelector('.search-action__search-nothing .search-action__title').textContent =
    error.message;
  document.querySelector(
    '.search-action__search-nothing .search-action__description'
  ).textContent = ERROR_SERVER_NEWS_DESCRIPTION;
}

function dataToStrRus(str) {
  const strObj = str.split('-');
  /* const date = new Date(str.split('-'))
     const year = date.getFullYear(date);
     const month = date.getMonth(date);
     const day = date.getDate(date);
  срабатывает в браузерах  Google, Opera, FireFox и в других,
  но не работает в Safari, EDGE.
   */
  const year = strObj[0];
  const month = strObj[1];
  const day = strObj[2];
  const objMonth = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return `${day} ${objMonth[Number(month) - 1]}, ${year}`;
}

export { createElementDOM, getProfile, removeProfile, errorNewsServer, dataToStrRus };
