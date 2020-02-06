import SearchForm from '../../blocks/search/__form/SearchForm';
import { searchFormElement } from './elements';
import { searchNews } from '../utilits/callbacks';

/** Объект формы поиска новостей */
const searchForm = new SearchForm(searchFormElement, searchNews);

export default searchForm;
