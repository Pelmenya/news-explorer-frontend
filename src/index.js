import './pages/index.css';

import Form from './js/components/Form';
import Popup from './js/components/Popup';
import Header from './js/components/Header';
import UserApi from './js/api/UserApi';

function main() {
  /* Константы */
  const serverUrl = 'http://localhost:3000';

  const userApi = new UserApi(serverUrl, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });
  // Callback's
  // Логин
  function signInUser(item) {
    return userApi
      .postSignIn({
        email: item.email,
        password: item.password,
      })
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
    userApi
      .postSignIn({
        email: item.email,
        password: item.password,
      })
      .then((key) => {
        console.log(key);
      })
      .catch((err) => {});
  }

  const popup = new Popup(document.querySelector('.popup'));

  const registrtion = true;
  /**  Если регистрация успешна создается форма перехода на страницу в режиме
  *  залогинен
  */
  function registrationUser() {
    if (registrtion) {
      popup.close();
      popup.open(
        document.querySelector('.form-signup-is-ok').content.cloneNode(true),
        'form-signup-is-ok'
      );
    }
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
      registrationUser
    );
  }

  const header = new Header([
    {
      button: document.querySelector('.header__button_auth'),
      event: 'click',
      callBack: authUser,
    },
  ]);
}

main();
