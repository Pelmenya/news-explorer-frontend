import { getProfile, translateUsersApiParametrsToCardParametrs } from '../utilits/functions';
import { profileOwner, NOT_CREATE_RESOURCE } from '../constants/constants';
import Element from './Element';

export default class ArticlesIntro {
  _getArticles() {
    return this.usersApi
      .getUserArticles(getProfile(profileOwner).key)
      .then((articles) => {
        if (articles.message === NOT_CREATE_RESOURCE) {
          return null;
        }
        return articles.myArticles.map((item) => translateUsersApiParametrsToCardParametrs(item));
      })
      .catch((err) => alert(err));
  }

  _sortArticles() {
    return this._getArticles().then((articles) => {
      if (articles) {
        console.log(articles)

        const arr = articles;
        const item = {};
        item.numberArticles = articles.length;
    
        return item;
      }
      return null;
    });
  }

  constructor(container, usersApi) {
    this.container = container;
    this.usersApi = usersApi;
  }

  create() {
    this.articlesIntroSubTitle = new Element({
      element: this.container.querySelector('.articles-intro__sub-title'),
      classOpened: 'articles-intro__is-opened',
    });

    this.articlesIntroKeyWords = new Element({
      element: this.container.querySelector('.articles-intro__keywords'),
      classOpened: 'articles-intro__is-opened',
    });
    this.articlesIntroKeyWordBegin = new Element({
      element: this.container.querySelector('articles-intro__keyword_begin'),
      classOpened: 'articles-intro__is-opened',
    });
    this.articlesIntroKeyWordAnd = new Element({
      element: this.container.querySelector('articles-intro__keyword-and'),
      classOpened: 'articles-intro__is-opened',
    });
    this.articlesIntroKeyWordEnd = new Element({
      element: this.container.querySelector('articles-intro__keyword_end'),
      classOpened: 'articles-intro__is-opened',
    });
  }

  render() {
    this._sortArticles().then((results) => {
      if (results) {
        if (
          String(results.numberArticles).split('')[
            String(results.numberArticles).split('').length - 1
          ] === '1'
          && String(results.numberArticles).split('')[
            String(results.numberArticles).split('').length - 2
          ] !== '1'
        ) {
          this.articlesIntroSubTitle.setTextContent(
            `${getProfile(profileOwner).user
              .name}, у Вас ${results.numberArticles} сохраненная статья`
          );
        } else {
          this.articlesIntroSubTitle.setTextContent(
            `${getProfile(profileOwner).user
              .name}, у Вас ${results.numberArticles} сохраненных статей`
          );
        }






      } else {
        this.articlesIntroSubTitle.setTextContent(
          `${getProfile(profileOwner).user.name}, у Вас еще нет сохраненных статей`
        );
        this.articlesIntroKeyWords.open();
        this.articlesIntroKeyWords.setTextContent('');
      }
    });
  }
}
