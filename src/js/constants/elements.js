import Element from '../components/Element';

/** Кнопки */
const cardsListBtn = new Element({
  element: document.querySelector('.cards-list__button'),
  classOpened: 'cards-list__button_is-opened',
});

const headerGamburgerLinesBtn = document.querySelector('.header .header__gamburger_lines');
const headerGamburgerCrossBtn = document.querySelector('.header .header__gamburger_cross');
const headerAuthDesktopBtn = document.querySelector('.header__button_auth_desktop');
const headerAuthMobilBtn = document.querySelector('.header__button_auth_mobil');

const headerLogoutDesktopBtn = new Element({
  element: document.querySelector('.header__button_logout_desktop'),
  classOpened: 'header__button_is-opened',
});

const headerLogoutMobilBtn = new Element({
  element: document.querySelector('.header__button_logout_mobil'),
  classOpened: 'header__button_is-opened',
});

const popUpCloseBtn = new Element({
  element: document.querySelector('.popup__close'),
  classOpened: 'popup__close_is-opened',
});

const headerLogoutBtnCaptionDesktop = document.querySelector('.header__button-caption_desktop');
const headerLogoutBtnCaptionMobil = document.querySelector('.header__button-caption_mobil');

/** Ссылки */
const headerChangeHeadLink = document.querySelector('.header__change_head');
const headerChangeSaveLink = new Element({
  element: document.querySelector('.header__change_save'),
  classOpened: 'header__change_is-opened',
});
const headerSaveMobilLink = new Element({
  element: document.querySelector('.header__mobil-link_save'),
  classOpened: 'header__mobil-link_is-opened',
});

/** Header menu */
const headerMobilMenu = new Element({
  element: document.querySelector('.header__mobil-menu'),
  classOpened: 'header__mobil-menu_is-opened',
});

/** Контейнеры */
const popUpContainer = document.querySelector('.popup');
const searchActionContainer = document.querySelector('.search-action');
const userArticlesContainer = new Element({
  element: document.querySelector('.user-articles'),
  classOpened: 'search-results_is-opened',
});

const cardsListElement = document.querySelector('.cards-list');

const articlesIntroContainer = new Element({
  element: document.querySelector('.articles-intro'),
  classOpened: 'articles-intro__is-opened',
});

/** Формы */
const signInForm = document.querySelector('.form-signin'); // <template>
const signUpForm = document.querySelector('.form-signup'); // <template>
const signUpIsOkForm = document.querySelector('.form-signup-is-ok'); // <template>
const searchFormElement = document.querySelector('.search__form');

/* Action */
const searchNewsTemplate = document.querySelector('.search-news'); // лоадер при поиске новостей
const searchNothingTemplate = document.querySelector('.search-nothing'); // ничего не найдено

/** Блок отображения результатов поиска карточек */
const searchResultsAct = new Element({
  element: document.querySelector('.search-results'),
  classOpened: 'search-results_is-opened',
});

export {
  /** Кнопки */
  cardsListBtn,
  headerGamburgerLinesBtn,
  headerGamburgerCrossBtn,
  headerAuthDesktopBtn,
  headerAuthMobilBtn,
  headerLogoutDesktopBtn,
  headerLogoutMobilBtn,
  headerLogoutBtnCaptionDesktop,
  headerLogoutBtnCaptionMobil,
  popUpCloseBtn,
  /** Ссылки */
  headerChangeHeadLink,
  headerChangeSaveLink,
  headerSaveMobilLink,
  /** Header menu */
  headerMobilMenu,
  /** Контейнеры */
  popUpContainer,
  searchActionContainer,
  cardsListElement,
  articlesIntroContainer,
  userArticlesContainer,
  /** Формы */
  signInForm,
  signUpForm,
  signUpIsOkForm,
  searchFormElement,
  /* Action */
  searchNewsTemplate,
  searchNothingTemplate,
  searchResultsAct,
};
