import './pages/index.css';

import { profileOwner } from './js/constants/constants';
import { usersApi } from './js/constants/objects/api';
import popUp from './js/constants/objects/popUp';
import header from './js/constants/objects/header';
import searchForm from './js/constants/objects/searchForm';
import {
  headerAuthDesktopBtn,
  headerAuthMobilBtn,
  headerMobilMenu,
  popUpCloseBtn,
  popUpContainer,
  signInForm,
  signUpForm,
  signUpIsOkForm,
} from './js/constants/objects/elements';

import PopUpForm from './blocks/popup/__form/PopUpForm';
import { getProfile, removeProfile } from './js/utilits/functions';
import { renderLoginHeader, renderNotLoginHeader } from './js/utilits/callbacks';

function main() {
  header.create(renderLoginHeader, renderNotLoginHeader);
  searchForm.create();
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
                  JSON.stringify({ ...getProfile(profileOwner), user }),
                );
                getProfile(profileOwner);
              })
              .then(() => {
                header.render(getProfile(profileOwner));
                popUp.close();
              })
              .catch((err) => err);
          }
          return data.message;
        })
        .catch((err) => err);
    }

    function openFormSignIn() {
      popUp.close();
      popUp.open(signInForm.content.cloneNode(true), 'form-signin');
      popUp.addEventsListeners();
      const popUpForm = new PopUpForm(
        [
          {
            element: document.querySelector('.popup .popup__transition'),
            event: 'click',
            callBack: () => {
              popUp.close();
              authUser();
            },
          },
        ],
        popUpContainer,
        signInUser,
      );
      popUpForm.create();
    }

    function openFormSignUpIsOk() {
      popUp.close();
      popUp.open(signUpIsOkForm.content.cloneNode(true), 'form-signup-is-ok');
      popUp.addEventsListeners();
      const popUpForm = new PopUpForm(
        [
          {
            element: document.querySelector('.popup .popup__transition'),
            event: 'click',
            callBack: openFormSignIn,
          },
        ],
        popUpContainer,
      );
      popUpForm.create();
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
      popUp.open(signUpForm.content.cloneNode(true), 'form-signup');
      popUp.addEventsListeners();
      const popUpForm = new PopUpForm(
        [
          {
            element: document.querySelector('.popup .popup__transition'),
            event: 'click',
            callBack: openFormSignIn,
          },
        ],
        popUpContainer,
        signUpUser,
      );
      popUpForm.create();
    }
    openFormSignUp();
  }

  header.addListeners([
    { element: popUpCloseBtn, event: 'click', callBack: popUp.close },
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
        headerMobilMenu.close();
        authUser();
      },
    },
  ]);
}

main();
