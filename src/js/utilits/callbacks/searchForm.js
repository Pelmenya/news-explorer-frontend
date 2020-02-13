import { ERROR_SERVER_NEWS, ERRROR_NOT_CONNECT_NEWS_SERVER } from '../../constants/errors';
import {
  searchNewsTemplate,
  searchNothingTemplate,
  searchResultsAct,
} from '../../constants/objects/elements';
import { newsApi } from '../../constants/objects/api';
import searchAction from '../../constants/objects/seachAction';
import cardsListControl from '../../constants/objects/cardsListControl';
import { errorServer } from '../functions';

/** Callback для поиска новостей по ключевому слову */
function searchNews(keyword) {
  searchResultsAct.close();
  if (searchAction.isFull) searchAction.close();
  searchAction.open(searchNewsTemplate.content.cloneNode(true), 'search-news');
  return newsApi
    .getNews(keyword)
    .then((data) => {
      if (data.status) {
        if (String(data.status) === 'error') {
          errorServer();
          return data;
        }
        if (String(data.totalResults) === '0') {
          searchAction.close();
          searchAction.open(searchNothingTemplate.content.cloneNode(true), 'search-nothing');
          return data;
        }
        if (String(data.totalResults) !== '0') {
          searchAction.close();
          searchResultsAct.open();
          cardsListControl.viewCards(data.articles, keyword);
          return data;
        }
      }
      return Promise.reject(new Error(ERROR_SERVER_NEWS));
    })
    .catch((err) => {
      if (err.message === 'Failed to fetch') {
        return errorServer(new Error(ERRROR_NOT_CONNECT_NEWS_SERVER));
      }
      return errorServer(err);
    });
}

export default searchNews;
