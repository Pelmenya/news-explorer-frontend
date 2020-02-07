import '../pages/articles.css';

import { profileOwner, NOT_CREATE_RESOURCE, NOT_ARTICLES } from '../js/constants/constants';
import { usersApi } from '../js/constants/objects/api';
import { cardsListElement, userArticlesContainer } from '../js/constants/objects/elements';
import header from '../js/constants/objects/header';
import articlesIntro from '../js/constants/objects/articlesIntro';

import CardsList from '../blocks/cards-list/CardsList';
import { getProfile, translateUsersApiParametrsToCardParametrs } from '../js/utilits/functions';
import {
  renderLoginHeaderArticles,
  renderNotLoginHeaderArticles,
  addCardTrash,
} from '../js/utilits/callbacks';

function main() {
  const cardsList = new CardsList(cardsListElement, addCardTrash);

  header.create(renderLoginHeaderArticles, renderNotLoginHeaderArticles);
  articlesIntro.create();
  articlesIntro.render();

  usersApi
    .getUserArticles(getProfile(profileOwner).key)
    .then((articles) => {
      userArticlesContainer.close();
      if (articles.message === NOT_CREATE_RESOURCE) {
        throw Error(`${getProfile(profileOwner).user.name}${NOT_ARTICLES}`);
      } else if (articles.myArticles) {
        userArticlesContainer.open();
        cardsList.viewCards(
          articles.myArticles.map((item) => translateUsersApiParametrsToCardParametrs(item)),
        );
      } else throw new Error(articles.message);
    })
    .catch((err) => {
      document.querySelector('.articles-intro__sub-title').textContent = err.message;
      userArticlesContainer.close();
    });
}

if (getProfile(profileOwner)) {
  main();
} else window.location.href = 'index.html';
