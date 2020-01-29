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
      button: document.querySelector('.popup__close'),
      event: 'click',
      callBack: () => popup.close(),
    },
    {
      button: headerGamburgerLinesBtn,
      event: 'click',
      callBack: () => {
        headerMobilMenu.classList.add('header__mobil-menu_is-opened');
      },
    },
    {
      button: headerGamburgerCrossBtn,
      event: 'click',
      callBack: () => {
        headerMobilMenu.classList.remove('header__mobil-menu_is-opened');
      },
    },
    {
      button: headerLogoutDesktopBtn,
      event: 'click',
      callBack: () => {
        removeProfile(profileOwner);
        renderNotLoginHeader();
      },
    },
    {
      button: headerLogoutMobilBtn,
      event: 'click',
      callBack: () => {
        removeProfile(profileOwner);
        renderNotLoginHeader();
      },
    },
  ],
  getProfile(profileOwner),
  { renderLoginHeader, renderNotLoginHeader }
);

export default header;
