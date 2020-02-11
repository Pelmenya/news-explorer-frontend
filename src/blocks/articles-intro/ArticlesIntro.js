import {
  profileOwner,
  NOT_CREATE_RESOURCE,
  SAVED_ARTICLE,
  SAVED_ARTICLES,
  OTHER,
  NOT_ARTICLES,
  YOU,
} from '../../js/constants/constants';
import Element from '../../js/components/Element';

import { getProfile, translateUsersApiParametrsToCardParametrs } from '../../js/utilits/functions';

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
      .catch((err) => err);
  }

  _sortArticles() {
    return this._getArticles().then((articles) => {
      if (articles) {
        const item = {};
        item.numberArticles = articles.length;
        const obj = {};
        Object.keys(articles).forEach((i) => {
          obj[articles[i].keyword] = articles[i].keyword;
        });
        item.arrSort = [];
        let k = 0;
        Object.keys(obj).forEach((i) => {
          obj[k] = 0;
          Object.keys(articles).forEach((j) => {
            if (obj[i] === articles[j].keyword) obj[k] += 1;
          });
          item.arrSort.push({
            number: obj[k],
            keyword: obj[i],
          });
          k += 1;
        });
        item.arrSort.sort((a, b) => b.number - a.number);
        return item;
      }
      return null;
    });
  }

  constructor(container, usersApi, numberWordsToAnd = 2) {
    this.container = container;
    this.usersApi = usersApi;
    this.numberWordsToAnd = numberWordsToAnd;
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
      element: this.container.querySelector('.articles-intro__keyword_begin'),
      classOpened: 'articles-intro__is-opened',
    });
    this.articlesIntroKeyWordBegin.open();
    this.articlesIntroKeyWordAnd = new Element({
      element: this.container.querySelector('.articles-intro__keyword-and'),
      classOpened: 'articles-intro__is-opened',
    });
    this.articlesIntroKeyWordEnd = new Element({
      element: this.container.querySelector('.articles-intro__keyword_end'),
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
            `${getProfile(profileOwner).user.name}${YOU} ${results.numberArticles} ${SAVED_ARTICLE}`,
          );
        } else {
          this.articlesIntroSubTitle.setTextContent(
            `${getProfile(profileOwner).user
              .name}${YOU} ${results.numberArticles} ${SAVED_ARTICLES}`,
          );
        }
        let str = `${results.arrSort[0].keyword}`;
        for (let i = 1; i < this.numberWordsToAnd; i += 1) {
          if (results.arrSort[i]) str = `${str}, ${results.arrSort[i].keyword}`;
        }

        if (results.arrSort.length === this.numberWordsToAnd + 1) {
          this.articlesIntroKeyWordAnd.open();
          this.articlesIntroKeyWordEnd.setTextContent(
            results.arrSort[this.numberWordsToAnd].keyword,
          );
          this.articlesIntroKeyWordEnd.open();
        }
        if (results.arrSort.length > this.numberWordsToAnd + 1) {
          this.articlesIntroKeyWordAnd.open();
          this.articlesIntroKeyWordEnd.setTextContent(
            `${results.arrSort.length - this.numberWordsToAnd} ${OTHER}`,
          );
          this.articlesIntroKeyWordEnd.open();
        }
        this.articlesIntroKeyWordBegin.open();
        this.articlesIntroKeyWordBegin.setTextContent(str);
        this.articlesIntroKeyWords.open();
      } else {
        this.articlesIntroSubTitle.setTextContent(
          `${getProfile(profileOwner).user.name}${NOT_ARTICLES}`,
        );
        this.articlesIntroKeyWords.open();
        this.articlesIntroKeyWords.setTextContent('');
      }
    });
  }
}
