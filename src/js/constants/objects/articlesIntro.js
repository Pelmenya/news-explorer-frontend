import ArticlesIntro from '../../../blocks/articles-intro/ArticlesIntro';
import { numberWordsToAnd } from '../constants';
import { articlesIntroContainer } from './elements';
import { usersApi } from './api';

const articlesIntro = new ArticlesIntro(articlesIntroContainer, usersApi, numberWordsToAnd);

export default articlesIntro;
