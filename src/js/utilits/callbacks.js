import Card from '../../blocks/card/Card';
import CardsListControl from '../../blocks/cards-list/CardListControl';
// Константы
import { usersApi, newsApi } from '../constants/api';
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
  searchResultsAct,
  searchNewsTemplate,
  searchNothingTemplate,
  cardsListElement,
  cardsListBtn,
  userArticlesContainer,
} from '../constants/elements';
import { searchAct } from '../constants/containers';
import { profileOwner, numberCardsInLine } from '../constants/constants';
import { ERROR_DELETE_CARD, ERROR_SAVE_CARD, ERROR_SERVER_NEWS } from '../constants/errors';
import articlesIntro from '../constants/articlesIntro';

// Функции
import { getProfile, translateCardParametrsToUserApiParametrs, errorNewsServer } from './functions';

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
    },
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
    },
  );
  newCard.create();
  newCard.addEventListeners();
  return newCard.cardParametrs.card;
}

/** Callback для поиска новостей по ключевому слову */
function searchNews(keyword) {
  searchResultsAct.close();
  const cardsListControl = new CardsListControl(
    cardsListElement,
    addCardBookMark,
    cardsListBtn,
    numberCardsInLine,
  );
  if (searchAct.isFull) searchAct.close();
  searchAct.open(searchNewsTemplate.content.cloneNode(true), 'search-news');
  newsApi
    .getNews(keyword)
    .then((data) => {
      if (data.status) {
        if (String(data.status) === 'error') {
          errorNewsServer();
          return data;
        }
        if (String(data.totalResults) === '0') {
          searchAct.close();
          searchAct.open(searchNothingTemplate.content.cloneNode(true), 'search-nothing');
          return data;
        }
        if (String(data.totalResults) !== '0') {
          searchAct.close();
          searchResultsAct.open();
          cardsListControl.viewCards(data.articles, keyword);
          return data;
        }
      }
      return Promise.reject(new Error(ERROR_SERVER_NEWS));
    })
    .catch((err) => errorNewsServer(err));
}

export {
  renderLoginHeaderArticles,
  renderNotLoginHeaderArticles,
  renderLoginHeader,
  renderNotLoginHeader,
  addCardBookMark,
  addCardTrash,
  searchNews,
};
