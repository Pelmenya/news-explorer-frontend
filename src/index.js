import './pages/index.css';

import FormPopUp from './js/components/FormPopUp';
import FormSearchNews from './js/components/FormSearchNews';
import CardsList from './js/components/CardsList';

import { profileOwner, numberCardsInLine } from './js/constants/constants';
import { usersApi, newsApi } from './js/constants/api';
import { popup, searchAct } from './js/constants/containers';
import header from './js/constants/header';
import { ERROR_SERVER_NEWS } from './js/constants/errors';
import {
  cardsListBtn,
  headerAuthDesktopBtn,
  headerAuthMobilBtn,
  headerMobilMenu,
  popUpContainer,
  cardsListContainer,
  signInForm,
  signUpForm,
  signUpIsOkForm,
  searchForm,
  searchNewsTemplate,
  searchNothingTemplate,
  searchResultsAct,
} from './js/constants/elements';

import { getProfile, removeProfile, errorNewsServer } from './js/utilits/functions';
import { addCardBookMark } from './js/utilits/callbacks';

function main() {
  /* Константы */
  console.log(window.location.href);

  const cardsList = new CardsList(
    [],
    cardsListContainer,
    cardsListBtn,
    numberCardsInLine,
    addCardBookMark
  );
  /** Callback для поиска новостей по ключевому слову */
  function searchNews(keyword) {
    searchResultsAct.close();
    if (searchAct.isFull) searchAct.close();
    searchAct.open(searchNewsTemplate.content.cloneNode(true), 'search-news');
    newsApi
      .getNews(keyword)
      .then((data) => {
        if (data.status) {
          if (String(data.status) === 'error') {
            errorNewsServer();
            return data;
          }
          if (String(data.totalResults) === '0') {
            searchAct.close();
            searchAct.open(searchNothingTemplate.content.cloneNode(true), 'search-nothing');
            return data;
          }
          if (String(data.totalResults) !== '0') {
            searchAct.close();
            searchResultsAct.open();
            cardsList.viewCards(data.articles, keyword);
            return data;
          }
        }
        return Promise.reject(new Error(ERROR_SERVER_NEWS));
      })
      .catch((err) => errorNewsServer(err));
  }

  /** Объект формы поиска новостей */
  const searchFormObj = new FormSearchNews(searchForm, searchNews);

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
        .catch((err) => alert(err));
    }

    function openFormSignIn() {
      popup.close();
      popup.open(signInForm.content.cloneNode(true), 'form-signin');
      const formObj = new FormPopUp(
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
      const formObj = new FormPopUp(
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
        .catch((err) => alert(err));
    }

    function openFormSignUp() {
      popup.open(signUpForm.content.cloneNode(true), 'form-signup');
      const formObj = new FormPopUp(
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
