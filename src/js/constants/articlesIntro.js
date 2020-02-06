import ArticlesIntro from '../../blocks/articles-intro/ArticlesIntro';
import { articlesIntroContainer } from './elements';
import { usersApi } from './api';

const articlesIntro = new ArticlesIntro(articlesIntroContainer, usersApi);

export default articlesIntro;
