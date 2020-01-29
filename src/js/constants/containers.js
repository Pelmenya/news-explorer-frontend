import Container from '../components/Container';
import {
  popUpContainer,
  headerGamburgerLinesBtn,
  searchActionContainer,
} from './elements';

/* Объекты контейнеров */
/** Объект контейнера для отображения форм аутентификации */
const popup = new Container({
  container: popUpContainer,
  element: headerGamburgerLinesBtn,
  classOpened: 'popup_is-opened',
});

/** Объект контейнера для отображения всех действий при поиске новостей */
const searchAct = new Container({
  container: searchActionContainer,
  classOpened: 'search-action_is-opened',
});

export { popup, searchAct };
