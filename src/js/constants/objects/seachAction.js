import { searchActionContainer } from './elements';
import SeachAction from '../../components/SeachAction';

/** Объект контейнера для отображения всех действий при поиске новостей */
const searchAction = new SeachAction({
  container: searchActionContainer,
  classOpened: 'search-action_is-opened',
});

export default searchAction;
