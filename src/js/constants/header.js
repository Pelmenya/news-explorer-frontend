import Header from '../../blocks/header/Header';
import { profileOwner } from './constants';

import { getProfile, removeProfile } from '../utilits/functions';
import { logoutHandlerClick } from '../utilits/callbacks';

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
      element: headerGamburgerLinesBtn,
      event: 'click',
      callBack: headerMobilMenu.open,
    },
    {
      element: headerGamburgerCrossBtn,
      event: 'click',
      callBack: headerMobilMenu.close,
    },
    {
      element: headerLogoutDesktopBtn,
      event: 'click',
      callBack: logoutHandlerClick,
    },
    {
      element: headerLogoutMobilBtn,
      event: 'click',
      callBack: logoutHandlerClick,
    },
  ],
  getProfile(profileOwner)
);

export default header;
