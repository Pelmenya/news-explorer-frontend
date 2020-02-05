import '../pages/articles.css';

import Header from '../js/components/Header';
import { getProfile, translateUsersApiParametrsToCardParametrs } from '../js/utilits/functions';

import { profileOwner } from '../js/constants/constants';
import { usersApi } from '../js/constants/api';
import CardsList from '../js/components/CardsList';
import { cardsListContainer } from '../js/constants/elements';
import { addCardTrash } from '../js/utilits/callbacks';

//

/* Константы */

/* Кнопки */

const headerGamburgerLinesBtn = document.querySelector('.header .header__gamburger_lines');
const headerGamburgerCrossBtn = document.querySelector('.header .header__gamburger_cross');
const headerLogoutDesktopBtn = document.querySelector('.header__button_logout_desktop');
const headerLogoutMobilBtn = document.querySelector('.header__button_logout_mobil');
const headerLogoutBtnCaptionDesktop = document.querySelector('.header__button-caption_desktop');
const headerLogoutBtnCaptionMobil = document.querySelector('.header__button-caption_mobil');

/* Ссылки */
const headerChangeHeadLink = document.querySelector('.header__change_head');

/* Header menu */
const headerMobilMenu = document.querySelector('.header__mobil-menu');

function renderLoginHeader() {
  headerLogoutDesktopBtn.classList.add('header__button_is-opened');
  headerLogoutMobilBtn.classList.add('header__button_is-opened');

  headerLogoutBtnCaptionDesktop.textContent = getProfile(profileOwner).user.name;
  headerLogoutBtnCaptionMobil.textContent = getProfile(profileOwner).user.name;
}

function renderNotLoginHeader() {
  headerLogoutDesktopBtn.classList.remove('header__button_is-opened');
  headerLogoutMobilBtn.classList.remove('header__button_is-opened');
  headerChangeHeadLink.classList.add('header__change_is-opened');
}

const header = new Header(
  [
    {
      element: headerGamburgerLinesBtn,
      event: 'click',
      callBack: () => {
        headerMobilMenu.classList.add('header__mobil-menu_is-opened');
      },
    },
    {
      element: headerGamburgerCrossBtn,
      event: 'click',
      callBack: () => {
        headerMobilMenu.classList.remove('header__mobil-menu_is-opened');
      },
    },
    {
      element: headerLogoutDesktopBtn,
      event: 'click',
      callBack: () => {
        localStorage.removeItem(profileOwner);
        window.location.href = 'index.html';
      },
    },
    {
      element: headerLogoutMobilBtn,
      event: 'click',
      callBack: () => {
        localStorage.removeItem(profileOwner);
        window.location.href = 'index.html';
      },
    },
  ],
  getProfile(profileOwner),
  { renderLoginHeader, renderNotLoginHeader }
);

const cardsList = new CardsList(cardsListContainer, addCardTrash);

function main() {
  usersApi
    .getUserArticles(getProfile(profileOwner).key)
    .then((articles) => {
      cardsList.viewCards(
        articles.myArticles.map((item) => translateUsersApiParametrsToCardParametrs(item)),
      );
    })
    .catch((err) => alert(err));
}

if (getProfile(profileOwner)) {
  main();
} else window.location.href = 'index.html';
