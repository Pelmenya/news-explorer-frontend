import Card from '../../blocks/card/Card';
// Константы
import { usersApi } from '../constants/api';
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
import { profileOwner } from '../constants/constants';
import { ERROR_DELETE_CARD, ERROR_SAVE_CARD } from '../constants/errors';
import articlesIntro from '../constants/articlesIntro';

// Функции
import { getProfile, translateCardParametrsToUserApiParametrs } from './functions';

// CallBacks

/** CallBack отображения хёдера, если пользователь залогинен. Cтраница пользователя */
function renderLoginHeaderArticles() {
  headerLogoutDesktopBtn.classList.add('header__button_is-opened');
  headerLogoutMobilBtn.classList.add('header__button_is-opened');
  headerLogoutBtnCaptionDesktop.textContent = getProfile(profileOwner).user.name;
  headerLogoutBtnCaptionMobil.textContent = getProfile(profileOwner).user.name;
}

/** CallBack отображения хёдера, если пользователь залогинен. Главная страница */
function renderLoginHeader() {
  renderLoginHeaderArticles();
  headerChangeSaveLink.classList.add('header__change_is-opened');
  headerSaveMobilLink.classList.add('header__mobil-link_is-opened');
  headerAuthMobilBtn.classList.remove('header__button_is-opened');
  headerAuthDesktopBtn.classList.remove('header__button_is-opened');
}

/** CallBack отображения хёдера, если пользователь не залогинен. Cтраница пользователя */
function renderNotLoginHeaderArticles() {
  headerLogoutDesktopBtn.classList.remove('header__button_is-opened');
  headerLogoutMobilBtn.classList.remove('header__button_is-opened');
  headerChangeHeadLink.classList.add('header__change_is-opened');
}

/** CallBack отображения хёдера, если пользователь не залогинен. Главная страница */
function renderNotLoginHeader() {
  renderNotLoginHeaderArticles();
  headerChangeSaveLink.classList.remove('header__change_is-opened');
  headerSaveMobilLink.classList.remove('header__mobil-link_is-opened');
  headerAuthMobilBtn.classList.add('header__button_is-opened');
  headerAuthDesktopBtn.classList.add('header__button_is-opened');
}

function toDoOnClickTopRightBtn(item, method) {
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
        if (String(data.remove._id) === String(cardParametrs._id)) {
          if (cardParametrs.type === 'bookmark') return null;
          if (cardParametrs.type === 'trash') {
            cardParametrs.card.parentNode.removeChild(cardParametrs.card);
            articlesIntro.render();
            return method;
          }
        }
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
  const newCard = new Card(
    { ...item, type: 'bookmark' },
    {
      toDoOnClickTopRightBtn,
      toDoOnClickCard,
    }
  );
  newCard.create();
  newCard.addEventListeners();
  return newCard.cardParametrs.card;
}

function addCardTrash(item) {
  const newCard = new Card(
    { ...item, type: 'trash' },
    {
      toDoOnClickTopRightBtn,
      toDoOnClickCard,
    }
  );
  newCard.create();
  newCard.addEventListeners();
  return newCard.cardParametrs.card;
}

export {
  renderLoginHeaderArticles,
  renderNotLoginHeaderArticles,
  renderLoginHeader,
  renderNotLoginHeader,
  addCardBookMark,
  addCardTrash,
};
