import './pages/index.css';

import Form from './js/components/Form';
import Popup from './js/components/Popup';
import Header from './js/components/Header';
import UserApi from './js/api/UserApi';
import ButtonsListeners from './js/components/ButtonsListeners';

function main() {
  /* Константы */
  const serverUrl = 'http://localhost:3000';

  const popup = new Popup(document.querySelector('.popup'));

  const userApi = new UserApi(serverUrl, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  // Callback's

  /**  Если регистрация успешна создается форма перехода на страницу в режиме
  *  залогинен
  */
  function signUpIsOk() {
    popup.close();
    popup.open(
      document.querySelector('.form-signup-is-ok').content.cloneNode(true),
      'form-signup-is-ok'
    );
    const form = new Form(
      [
        {
          button: document.querySelector('.popup .popup__transition'),
          event: 'click',
          callBack: () => {
            popup.close();
          },
        },
      ],
      document.querySelector('.popup')
    );
  }
  // Логин
  function signInUser(item) {
    return userApi
      .postSignIn(item)
      .then((data) => {
        console.log(data.message);
        // Здесь и записываем localStorage
        if (data.key) {
        } else return data.message;
      })
      .catch((err) => {});
  }

  // Регистрация
  function signUpUser(item) {
    return userApi
      .postSignUp(item)
      .then((data) => {
        if (data._id) {
          signUpIsOk();
        } else return data.message;
      })
      .catch((err) => {});
  }

  /** Callback открывает попап и клонирует в него форму Вход,
   * назначает обработчик(и) события(й) перехода на форме и вешает CallBack
   * на главную кнопку. Итак рекурсивно запускает переход из Вход-Регистрация-Вход
   * и т.д.
  */
  function authUser() {
    popup.open(document.querySelector('.form-signup').content.cloneNode(true), 'form-signup');
    const form = new Form(
      [
        {
          button: document.querySelector('.popup .popup__transition'),
          event: 'click',
          callBack: () => {
            popup.close();
            popup.open(
              document.querySelector('.form-signin').content.cloneNode(true),
              'form-signin'
            );
            const form = new Form(
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
              document.querySelector('.popup'),
              signInUser
            );
          },
        },
      ],
      document.querySelector('.popup'),
      signUpUser
    );
  }

  const headerButtons = new ButtonsListeners([
    {
      button: document.querySelector('.header__button_auth'),
      event: 'click',
      callBack: authUser,
    },
  ]);
}

main();
