import Header from '../components/Header';
import { getProfile, removeProfile } from '../utilits/functions';
import { renderLoginHeader, renderNotLoginHeader } from '../utilits/callbacks';
import { profileOwner } from './constants';
import { popup } from './containers';

import {
  headerGamburgerLinesBtn,
  headerGamburgerCrossBtn,
  headerLogoutDesktopBtn,
  headerLogoutMobilBtn,
  headerMobilMenu,
} from './elements';

/** Объект хёдера, в основном управляет всей логикой приложения.
  * Инициализирует начальную страницу.
  * Отрисовывает шапки страниц и всплывающих меню
  * */
const header = new Header(
  [
    {
      element: document.querySelector('.popup__close'),
      event: 'click',
      callBack: popup.close,
    },
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
        removeProfile(profileOwner);
        window.location.href = 'index.html';
      },
    },
    {
      element: headerLogoutMobilBtn,
      event: 'click',
      callBack: () => {
        removeProfile(profileOwner);
        window.location.href = 'index.html';
      },
    },
  ],
  getProfile(profileOwner),
  { renderLoginHeader, renderNotLoginHeader },
);

export default header;
