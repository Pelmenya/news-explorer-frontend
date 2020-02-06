import './pages/index.css';

import FormPopUp from './js/components/FormPopUp';
import FormSearchNews from './js/components/FormSearchNews';

import { profileOwner } from './js/constants/constants';
import { usersApi } from './js/constants/api';
import { popup } from './js/constants/containers';
import header from './js/constants/header';
import {
  headerAuthDesktopBtn,
  headerAuthMobilBtn,
  headerMobilMenu,
  popUpContainer,
  signInForm,
  signUpForm,
  signUpIsOkForm,
  searchForm,
} from './js/constants/elements';

import { getProfile, removeProfile } from './js/utilits/functions';
import { renderLoginHeader, renderNotLoginHeader, searchNews } from './js/utilits/callbacks';

function main() {
  /** Объект формы поиска новостей */
  const formSearchNews = new FormSearchNews(searchForm, searchNews);

  formSearchNews.create();
  header.create(renderLoginHeader, renderNotLoginHeader);

  // Регистрация
  /** Callback открывает попап и клонирует в него форму Регистрация,
   * назначает обработчик(и) события(й) перехода на форме и вешает CallBack
   * на главную кнопку. Итак рекурсивно запускает переход из Вход-Регистрация-Вход
   * и т.д. Сценарий аутентификации.
   * CallBack
  */
  function authUser() {
    removeProfile(profileOwner);
    function signInUser(item) {
      return usersApi
        .postSignIn(item)
        .then((data) => {
          // Здесь и записываем localStorage
          if (data.key) {
            localStorage.setItem(profileOwner, JSON.stringify({ key: data.key }));
            return usersApi
              .getUserMe(data.key)
              .then((user) => {
                getProfile(profileOwner);
                localStorage.setItem(
                  profileOwner,
                  JSON.stringify({ ...getProfile(profileOwner), user })
                );
                getProfile(profileOwner);
              })
              .then(() => {
                header.render(getProfile(profileOwner));
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
      const formPoPup = new FormPopUp(
        [
          {
            element: document.querySelector('.popup .popup__transition'),
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
      const formPoPup = new FormPopUp(
        [
          {
            element: document.querySelector('.popup .popup__transition'),
            event: 'click',
            callBack: openFormSignIn,
          },
        ],
        popUpContainer
      );
    }

    function signUpUser(item) {
      return usersApi
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
      const formPoPup = new FormPopUp(
        [
          {
            element: document.querySelector('.popup .popup__transition'),
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
      element: document.querySelector('.popup__close'),
      event: 'click',
      callBack: popup.close,
    },
    {
      element: headerAuthDesktopBtn,
      event: 'click',
      callBack: () => {
        // если не снять фокус, клонирует форму несколько раз при нажатии Enter
        headerAuthDesktopBtn.blur();
        authUser();
      },
    },
    {
      element: headerAuthMobilBtn,
      event: 'click',
      callBack: () => {
        headerMobilMenu.classList.remove('header__mobil-menu_is-opened');
        authUser();
      },
    },
  ]);
}

main();
