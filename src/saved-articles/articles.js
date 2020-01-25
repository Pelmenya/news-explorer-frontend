import '../pages/articles.css';

import Header from '../js/components/Header';


function main() {

  /* Константы */
  const profileOwner = 'profileOwner';

  const serverUrl = 'http://localhost:3000';

  //
  const loginProfile = JSON.parse(localStorage.getItem(profileOwner));

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

    headerLogoutBtnCaptionDesktop.textContent = loginProfile.user.name;
    headerLogoutBtnCaptionMobil.textContent = loginProfile.user.name;
  }

  function renderNotLoginHeader() {
    headerLogoutDesktopBtn.classList.remove('header__button_is-opened');
    headerLogoutMobilBtn.classList.remove('header__button_is-opened');
    headerChangeHeadLink.classList.add('header__change_is-opened');
  }


  const header = new Header(
    [
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
          localStorage.removeItem(profileOwner);
          window.location.href = 'index.html';
          renderNotLoginHeader();
        },
      },
      {
        button: headerLogoutMobilBtn,
        event: 'click',
        callBack: () => {
          localStorage.removeItem(profileOwner);
          window.location.href = 'index.html';
          renderNotLoginHeader();
        },
      },
    ],
    loginProfile,
    { renderLoginHeader, renderNotLoginHeader }
  );


}

main();
