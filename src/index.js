import './pages/index.css';

import FormPopUp from './js/components/FormPopUp';
import Container from './js/components/Container';
import Header from './js/components/Header';
import UserApi from './js/api/UserApi';
import NewsApi from './js/api/NewsApi';
import FormSearchNews from './js/components/FormSearchNews';
import Section from './js/components/Section';

const {
  profileOwner,
  serverUrlUsers,
  serverUrlNews,
  apiKeyNews,
  pageSizeNews,
  numberOfDays,
  ERROR_SERVER_NEWS,
  ERROR_SERVER_NEWS_DESCRIPTION,
} = require('./js/constants/constants');

function main() {
  /* Константы */

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

  /* Контейнеры */
  const popUpContainer = document.querySelector('.popup');
  const searchActionContainer = document.querySelector('.search-action');

  /* Формы */
  const signInForm = document.querySelector('.form-signin'); // <template>
  const signUpForm = document.querySelector('.form-signup'); // <template>
  const signUpIsOkForm = document.querySelector('.form-signup-is-ok'); // <template>
  const searchForm = document.querySelector('.search__form');

  /* Action */
  const searchNewsTemplate = document.querySelector('.search-news'); // лоадер при поиске новостей
  const searchNothingTemplate = document.querySelector('.search-nothing'); // ничего не найдено

  const searchResultsAct = new Section({
    section: document.querySelector('.search-results'),
    classOpened: 'search-results_is-opened',
  });

  /* Объекты */

  /* Объекты контейнеров */

  /** Объект контейнера для отображения форм аутентификации */
  const popup = new Container({
    container: popUpContainer,
    element: headerGamburgerLinesBtn,
    classOpened: 'popup_is-opened',
  });

  /** Объект контейнера для отображения поиска всех действий при поиске новостей */
  const searchAct = new Container({
    container: searchActionContainer,
    classOpened: 'search-action_is-opened',
  });

  /** Объект для работы с api News */
  const newsApi = new NewsApi({
    serverUrlNews,
    apiKeyNews,
    pageSizeNews,
    numberOfDays,
  });

  /** Объект для работы с api Users */
  const userApi = new UserApi(serverUrlUsers, {
    'Content-Type': 'application/json; charset=UTF-8',
  });

  /** Функция для отображения ошибки с сервера News */
  function errorNewsServer(error = '') {
    if (searchAct.isFull) searchAct.close();
    searchAct.open(searchNothingTemplate.content.cloneNode(true), 'search-nothing');
    document.querySelector('.search-action__search-nothing .search-action__title').textContent =
      error.message;
    document.querySelector(
      '.search-action__search-nothing .search-action__description'
    ).textContent = ERROR_SERVER_NEWS_DESCRIPTION;
  }

  /** Callback для поиска новостей по ключевому слову */
  function searchNews(keyword) {
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
            return data;
          }
        }
        return Promise.reject(new Error(ERROR_SERVER_NEWS));
      })
      .catch((err) => errorNewsServer(err));
  }

  /** CallBack отображения хёдера, если пользователь залогинен */
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

  /** CallBack отображения хёдера, если пользователь не залогинен */
  function renderNotLoginHeader() {
    headerLogoutDesktopBtn.classList.remove('header__button_is-opened');
    headerChangeSaveLink.classList.remove('header__change_is-opened');
    headerSaveMobilLink.classList.remove('header__mobil-link_is-opened');
    headerLogoutMobilBtn.classList.remove('header__button_is-opened');

    headerAuthMobilBtn.classList.add('header__button_is-opened');
    headerAuthDesktopBtn.classList.add('header__button_is-opened');
    headerChangeHeadLink.classList.add('header__change_is-opened');
  }

  /** Объект формы поиска новостей */
  const searchFormObj = new FormSearchNews(searchForm, searchNews);

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
    { renderLoginHeader, renderNotLoginHeader }
  );

  // Callbacks
  // Регистрация
  /** Callback открывает попап и клонирует в него форму Регистрация,
   * назначает обработчик(и) события(й) перехода на форме и вешает CallBack
   * на главную кнопку. Итак рекурсивно запускает переход из Вход-Регистрация-Вход
   * и т.д.
   * CallBack
  */
  function authUser() {
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
      const formObj = new FormPopUp(
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
      const formObj = new FormPopUp(
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
      const formObj = new FormPopUp(
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
