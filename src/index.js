import './pages/index.css';

import Form from './js/components/Form';
import Popup from './js/components/Popup';
import Header from './js/components/Header';

function main() {
  /* Константы */
  const popup = new Popup(document.querySelector('.popup'));

  function registrationUser() {
    popup.close();
  }

  function authUser() {
    popup.open(document.querySelector('.form-signin').content.cloneNode(true), 'form-signin');
    const form = new Form(
      [
        {
          button: document.querySelector('.popup .popup__transition'),
          event: 'click',
          callBack: () => {
            popup.close();
            popup.open(document.querySelector('.form-signup').content.cloneNode(true), 'form-signup');
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
              registrationUser,
            );
          },
        },
      ],
      document.querySelector('.popup'),
      registrationUser,
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
