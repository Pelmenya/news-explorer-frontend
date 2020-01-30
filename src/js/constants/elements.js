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
const headerLogoutDesktopBtn = document.querySelector('.header__button_logout_desktop');
const headerLogoutMobilBtn = document.querySelector('.header__button_logout_mobil');
const headerLogoutBtnCaptionDesktop = document.querySelector('.header__button-caption_desktop');
const headerLogoutBtnCaptionMobil = document.querySelector('.header__button-caption_mobil');

/** Ссылки */
const headerChangeHeadLink = document.querySelector('.header__change_head');
const headerChangeSaveLink = document.querySelector('.header__change_save');
const headerSaveMobilLink = document.querySelector('.header__mobil-link_save');

/** Header menu */
const headerMobilMenu = document.querySelector('.header__mobil-menu');

/** Контейнеры */
const popUpContainer = document.querySelector('.popup');
const searchActionContainer = document.querySelector('.search-action');
const cardsListContainer = document.querySelector('.cards-list');

/** Формы */
const signInForm = document.querySelector('.form-signin'); // <template>
const signUpForm = document.querySelector('.form-signup'); // <template>
const signUpIsOkForm = document.querySelector('.form-signup-is-ok'); // <template>
const searchForm = document.querySelector('.search__form');

/* Action */
const searchNewsTemplate = document.querySelector('.search-news'); // лоадер при поиске новостей
const searchNothingTemplate = document.querySelector('.search-nothing'); // ничего не найдено

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
  /** Ссылки */
  headerChangeHeadLink,
  headerChangeSaveLink,
  headerSaveMobilLink,
  /** Header menu */
  headerMobilMenu,
  /** Контейнеры */
  popUpContainer,
  searchActionContainer,
  cardsListContainer,
  /** Формы */
  signInForm,
  signUpForm,
  signUpIsOkForm,
  searchForm,
  /* Action */
  searchNewsTemplate,
  searchNothingTemplate,
};
