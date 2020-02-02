import Card from '../components/Card';
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
import { getProfile, translateCardParametrsToUserApiParametrs } from './functions';
import { profileOwner } from '../constants/constants';

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

function toDoOnClickBookMark(cardParametrs, method) {
  if (method === 'POST') {
    return usersApi
      .postArticle(
        translateCardParametrsToUserApiParametrs(cardParametrs),
        getProfile(profileOwner).key,
      )
      .then((card) => card.data._id)
      .catch((err) => err);
  }
  if (method === 'DELETE') {
    return usersApi
      .deleteArticle(cardParametrs._id, getProfile(profileOwner).key)
      .then((card) => card.data._id)
      .catch((err) => err);
  }
  return method;
}

function toDoOnClickCard(url) {
  window.open(url);
}

function addCardBookMark(item) {
  const objCard = new Card([], item, 'bookmark', toDoOnClickBookMark, { toDoOnClickCard });
  return objCard.card;
}

function addCardTrash(item) {
  const objCard = new Card([], item, 'trash');
  return objCard.card;
}

export { renderLoginHeader, renderNotLoginHeader, addCardBookMark, addCardTrash };
