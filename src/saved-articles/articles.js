import '../pages/articles.css';


import CardsList from '../blocks/cards-list/CardsList';

import { profileOwner, NOT_CREATE_RESOURCE } from '../js/constants/constants';
import { usersApi } from '../js/constants/api';
import { cardsListElement } from '../js/constants/elements';
import header from '../js/constants/header';
import articlesIntro from '../js/constants/articlesIntro';
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
      if (articles.message === NOT_CREATE_RESOURCE) {
        throw Error(articles.message);
      } else {
        cardsList.viewCards(
          articles.myArticles.map((item) => translateUsersApiParametrsToCardParametrs(item))
        );
      }
    })
    .catch((err) => err);
}

if (getProfile(profileOwner)) {
  main();
} else window.location.href = 'index.html';
