import NewsApi from '../api/NewsApi';
import UsersApi from '../api/UsersApi';

/** Настройки api News */
import {
  serverUrlNews, apiKeyNews, pageSizeNews, numberOfDays,
} from './apiNewsSetup';

/** Настройки api User */
import { serverUrlUsers, headers } from './apiUsersSetup';

/** Объект для работы с api News */
const newsApi = new NewsApi({
  serverUrlNews,
  apiKeyNews,
  pageSizeNews,
  numberOfDays,
});

/** Объект для работы с api Users */
const usersApi = new UsersApi(serverUrlUsers, headers);

export { newsApi, usersApi };
