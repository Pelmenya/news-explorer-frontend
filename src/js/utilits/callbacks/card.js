import { profileOwner } from '../../constants/constants';
import { userArticlesContainer } from '../../constants/objects/elements';
import { ERROR_DELETE_CARD, ERROR_SAVE_CARD } from '../../constants/errors';
import { usersApi } from '../../constants/objects/api';
import articlesIntro from '../../constants/objects/articlesIntro';

import { getProfile, translateCardParametrsToUserApiParametrs } from '../functions';

function toDoOnClickTopRightBtn(item, method) {
  const cardParametrs = Object.assign(item);
  if (method === 'POST') {
    return usersApi
      .postArticle(
        translateCardParametrsToUserApiParametrs(cardParametrs),
        getProfile(profileOwner).key,
      )
      .then((card) => {
        if (card.data._id) return card.data._id;
        return Promise.reject(new Error(ERROR_SAVE_CARD));
      })
      .catch(() => {
        throw new Error(ERROR_SAVE_CARD);
      });
  }
  if (method === 'DELETE') {
    return usersApi
      .deleteArticle(cardParametrs._id, getProfile(profileOwner).key)
      .then((data) => {
        if (String(data.remove._id) === String(cardParametrs._id)) {
          if (cardParametrs.type === 'bookmark') return null;
          if (cardParametrs.type === 'trash') {
            cardParametrs.card.parentNode.removeChild(cardParametrs.card);
            articlesIntro.render();
            usersApi
              .getUserArticles(getProfile(profileOwner).key)
              .then((articles) => {
                if (!articles.myArticles) {
                  userArticlesContainer.close();
                }
              })
              .catch((err) => err);
            return method;
          }
        }
        return Promise.reject(new Error(ERROR_DELETE_CARD));
      })
      .catch(() => {
        throw new Error(ERROR_DELETE_CARD);
      });
  }
  return method;
}

function toDoOnClickCard(url) {
  window.open(url);
}

export { toDoOnClickTopRightBtn, toDoOnClickCard };
