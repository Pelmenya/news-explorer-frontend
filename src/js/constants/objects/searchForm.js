import { searchFormElement } from './elements';

import SearchForm from '../../../blocks/search/__form/SearchForm';
import searchNews from '../../utilits/callbacks/searchForm';

/** Объект формы поиска новостей */
const searchForm = new SearchForm(searchFormElement, searchNews);

export default searchForm;
