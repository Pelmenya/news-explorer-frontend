import './pages/index.css';

import Form from './js/components/Form';
import Popup from './js/components/Popup';
import Header from './js/components/Header';
import UserApi from './js/api/UserApi';

function main() {
  /** Константы
  * Кнопки */
  const headerGamburgerLinesBtn = document.querySelector('.header .header__gamburger_lines');
  const headerGamburgerCrossBtn = document.querySelector('.header .header__gamburger_cross');
  const headerAuthBtn = document.querySelector('.header__button_auth');
  const headerAuthMobilBtn = document.querySelector('.header__button_auth_mobil');

  /* Header menu */
  const headerMobilMenu = document.querySelector('.header__mobil-menu');

  /* Popup */
  const popUpContainer = document.querySelector('.popup');

  /* Формы */
  const signInForm = document.querySelector('.form-signin');
  const signUpForm = document.querySelector('.form-signup');
  const signUpIsOkForm = document.querySelector('.form-signup-is-ok');

  /* Объекты */
  const serverUrl = 'http://localhost:3000';

  const profileOwner = 'profileOwner';

  const popup = new Popup(popUpContainer, headerGamburgerLinesBtn);

  const userApi = new UserApi(serverUrl, {
    'Content-Type': 'application/json; charset=UTF-8',
  });

  const header = new Header([
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
  ]);
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
                  JSON.stringify({ ...JSON.parse(localStorage.getItem(profileOwner)), user })
                );
              })
              .then(() => {
                //header.render();

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
        signInUser
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
        popUpContainer
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
        signUpUser
      );
    }

    openFormSignUp();
  }

  header.addListeners([
    {
      button: headerAuthBtn,
      event: 'click',
      callBack: () => {
        // если не снять фокус, клонирует форму несколько раз при нажатии Enter
        headerAuthBtn.blur();

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
