import './pages/index.css';

import Form from './js/components/Form';
import Popup from './js/components/Popup';
import Header from './js/components/Header';
import UserApi from './js/api/UserApi';

function main() {
  /* Константы */
  const profileOwner = 'profileOwner';
  // const serverUrl = 'http://localhost:3000';

  const serverUrl = 'https://api.news-service.pro';

  //
  let loginProfile = JSON.parse(localStorage.getItem(profileOwner));

  /* Кнопки */

  const headerGamburgerLinesBtn = document.querySelector('.header .header__gamburger_lines');
  const headerGamburgerCrossBtn = document.querySelector('.header .header__gamburger_cross');
  const headerAuthDesktopBtn = document.querySelector('.header__button_auth_desktop');
  const headerAuthMobilBtn = document.querySelector('.header__button_auth_mobil');
  const headerLogoutDesktopBtn = document.querySelector('.header__button_logout_desktop');
  const headerLogoutMobilBtn = document.querySelector('.header__button_logout_mobil');
  const headerLogoutBtnCaptionDesktop = document.querySelector('.header__button-caption_desktop');
  const headerLogoutBtnCaptionMobil = document.querySelector('.header__button-caption_mobil');

  /* Ссылки */
  const headerChangeHeadLink = document.querySelector('.header__change_head');
  const headerChangeSaveLink = document.querySelector('.header__change_save');
  const headerSaveMobilLink = document.querySelector('.header__mobil-link_save');

  /* Header menu */
  const headerMobilMenu = document.querySelector('.header__mobil-menu');

  /* Popup */
  const popUpContainer = document.querySelector('.popup');

  /* Формы */
  const signInForm = document.querySelector('.form-signin');
  const signUpForm = document.querySelector('.form-signup');
  const signUpIsOkForm = document.querySelector('.form-signup-is-ok');

  /* Объекты */

  const popup = new Popup(popUpContainer, headerGamburgerLinesBtn);

  const userApi = new UserApi(serverUrl, {
    'Content-Type': 'application/json; charset=UTF-8',
  });

  function renderLoginHeader() {
    headerLogoutDesktopBtn.classList.add('header__button_is-opened');
    headerChangeSaveLink.classList.add('header__change_is-opened');
    headerSaveMobilLink.classList.add('header__mobil-link_is-opened');
    headerLogoutMobilBtn.classList.add('header__button_is-opened');

    headerLogoutBtnCaptionDesktop.textContent = loginProfile.user.name;
    headerLogoutBtnCaptionMobil.textContent = loginProfile.user.name;

    headerAuthMobilBtn.classList.remove('header__button_is-opened');
    headerAuthDesktopBtn.classList.remove('header__button_is-opened');
  }

  function renderNotLoginHeader() {
    headerLogoutDesktopBtn.classList.remove('header__button_is-opened');
    headerChangeSaveLink.classList.remove('header__change_is-opened');
    headerSaveMobilLink.classList.remove('header__mobil-link_is-opened');
    headerLogoutMobilBtn.classList.remove('header__button_is-opened');

    headerAuthMobilBtn.classList.add('header__button_is-opened');
    headerAuthDesktopBtn.classList.add('header__button_is-opened');
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
          renderNotLoginHeader();
        },
      },
      {
        button: headerLogoutMobilBtn,
        event: 'click',
        callBack: () => {
          localStorage.removeItem(profileOwner);
          renderNotLoginHeader();
        },
      },
    ],
    loginProfile,
    { renderLoginHeader, renderNotLoginHeader },
  );
  // Callbacks
  // Регистрация
  /** Callback открывает попап и клонирует в него форму Регистрация,
   * назначает обработчик(и) события(й) перехода на форме и вешает CallBack
   * на главную кнопку. Итак рекурсивно запускает переход из Вход-Регистрация-Вход
   * и т.д.
  */
  function authUser() {
    //
    localStorage.removeItem(profileOwner);
    function signInUser(item) {
      return userApi
        .postSignIn(item)
        .then((data) => {
          // Здесь и записываем localStorage
          if (data.key) {
            localStorage.setItem(profileOwner, JSON.stringify({ key: data.key }));
            return userApi
              .getUserMe(data.key)
              .then((user) => {
                JSON.parse(localStorage.getItem(profileOwner));
                localStorage.setItem(
                  profileOwner,
                  JSON.stringify({ ...JSON.parse(localStorage.getItem(profileOwner)), user }),
                );
                loginProfile = JSON.parse(localStorage.getItem(profileOwner));
              })
              .then(() => {
                header.render(loginProfile);
                popup.close();
              })
              .catch((err) => err);
          }
          return data.message;
        })
        .catch((err) => err);
    }

    function openFormSignIn() {
      popup.close();
      popup.open(signInForm.content.cloneNode(true), 'form-signin');
      const formObj = new Form(
        [
          {
            button: document.querySelector('.popup .popup__transition'),
            event: 'click',
            callBack: () => {
              popup.close();
              authUser();
            },
          },
        ],
        popUpContainer,
        signInUser,
      );
    }

    function openFormSignUpIsOk() {
      popup.close();
      popup.open(signUpIsOkForm.content.cloneNode(true), 'form-signup-is-ok');
      const formObj = new Form(
        [
          {
            button: document.querySelector('.popup .popup__transition'),
            event: 'click',
            callBack: openFormSignIn,
          },
        ],
        popUpContainer,
      );
    }

    function signUpUser(item) {
      return userApi
        .postSignUp(item)
        .then((data) => {
          if (data._id) {
            openFormSignUpIsOk();
          }
          return data.message;
        })
        .catch((err) => err);
    }

    function openFormSignUp() {
      popup.open(signUpForm.content.cloneNode(true), 'form-signup');
      const formObj = new Form(
        [
          {
            button: document.querySelector('.popup .popup__transition'),
            event: 'click',
            callBack: openFormSignIn,
          },
        ],
        popUpContainer,
        signUpUser,
      );
    }

    openFormSignUp();
  }

  header.addListeners([
    {
      button: headerAuthDesktopBtn,
      event: 'click',
      callBack: () => {
        // если не снять фокус, клонирует форму несколько раз при нажатии Enter
        headerAuthDesktopBtn.blur();
        authUser();
      },
    },
    {
      button: headerAuthMobilBtn,
      event: 'click',
      callBack: () => {
        headerMobilMenu.classList.remove('header__mobil-menu_is-opened');
        authUser();
      },
    },
  ]);
}

main();
