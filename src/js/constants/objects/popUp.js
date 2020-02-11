import { popUpContainer, headerGamburgerLinesBtn } from './elements';

import PopUp from '../../../blocks/popup/PopUp';

/* Объекты контейнеров */
/** Объект контейнера для отображения форм аутентификации */
const popUp = new PopUp({
  container: popUpContainer,
  element: headerGamburgerLinesBtn,
  classOpened: 'popup_is-opened',
});

export default popUp;
