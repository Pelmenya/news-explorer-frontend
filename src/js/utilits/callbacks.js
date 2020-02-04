import Card from '../components/Card';
// Константы
import {
  headerAuthDesktopBtn,
  headerAuthMobilBtn,
  headerLogoutDesktopBtn,
  headerLogoutMobilBtn,
  headerLogoutBtnCaptionDesktop,
  headerLogoutBtnCaptionMobil,
  headerChangeHeadLink,
  headerChangeSaveLink,
  headerSaveMobilLink,
} from '../constants/elements';
import { usersApi } from '../constants/api';
import { profileOwner } from '../constants/constants';
import { ERROR_DELETE_CARD, ERROR_SAVE_CARD } from '../constants/errors';

// Функции
import { getProfile, translateCardParametrsToUserApiParametrs } from './functions';

// CallBacks
/** CallBack отображения хёдера, если пользователь залогинен */
function renderLoginHeader() {
  headerLogoutDesktopBtn.classList.add('header__button_is-opened');
  headerChangeSaveLink.classList.add('header__change_is-opened');
  headerSaveMobilLink.classList.add('header__mobil-link_is-opened');
  headerLogoutMobilBtn.classList.add('header__button_is-opened');

  headerLogoutBtnCaptionDesktop.textContent = getProfile(profileOwner).user.name;
  headerLogoutBtnCaptionMobil.textContent = getProfile(profileOwner).user.name;

  headerAuthMobilBtn.classList.remove('header__button_is-opened');
  headerAuthDesktopBtn.classList.remove('header__button_is-opened');
}

/** CallBack отображения хёдера, если пользователь не залогинен */
function renderNotLoginHeader() {
  headerLogoutDesktopBtn.classList.remove('header__button_is-opened');
  headerChangeSaveLink.classList.remove('header__change_is-opened');
  headerSaveMobilLink.classList.remove('header__mobil-link_is-opened');
  headerLogoutMobilBtn.classList.remove('header__button_is-opened');

  headerAuthMobilBtn.classList.add('header__button_is-opened');
  headerAuthDesktopBtn.classList.add('header__button_is-opened');
  headerChangeHeadLink.classList.add('header__change_is-opened');
}

function toDoOnClickBookMark(item, method) {
  const cardParametrs = Object.assign(item);
  if (method === 'POST') {
    return usersApi
      .postArticle(
        translateCardParametrsToUserApiParametrs(cardParametrs),
        getProfile(profileOwner).key
      )
      .then((card) => {
        if (card.data._id) return card.data._id;
        return Promise.reject(new Error(ERROR_SAVE_CARD));
      })
      .catch(() => alert(ERROR_SAVE_CARD));
  }
  if (method === 'DELETE') {
    return usersApi
      .deleteArticle(cardParametrs._id, getProfile(profileOwner).key)
      .then((data) => {
        if (String(data.remove._id) === String(cardParametrs._id)) return null;
        return Promise.reject(new Error(ERROR_DELETE_CARD));
      })
      .catch(() => alert(ERROR_DELETE_CARD));
  }
  return method;
}

function toDoOnClickCard(url) {
  window.open(url);
}

function addCardBookMark(item) {
  const objCard = new Card([], { ...item, type: 'bookmark' }, toDoOnClickBookMark, {
    toDoOnClickCard,
  });
  return objCard.cardParametrs.card;
}

function addCardTrash(item) {
  const objCard = new Card([], item, { ...item, type: 'trash' });
  return objCard.card;
}

export { renderLoginHeader, renderNotLoginHeader, addCardBookMark, addCardTrash };
