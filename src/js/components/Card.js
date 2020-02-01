import { createElementDOM, getProfile, dataToStrRus } from '../utilits/functions';

export default class Card {
  _dataToStrRus(str) {
    const date = new Date(str.split('-'));
    const year = date.getFullYear(date);
    const month = date.getMonth(date);
    const day = date.getDate(date);
    const objMonth = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    return `${day} ${objMonth[month]}, ${year}`;
  }

  constructor(item, type) {
    this.cardParametrs = Object.assign(item);
    this.type = type;
    // console.log(this.cardParametrs);
    this.card = this.createCard();
    this.isLogged = getProfile();
  }

  /*
    <div class="card">
          <div class="card__pic card__pic_01">
            <div class="card__item card__icon card__icon_bookmark card__icon_bookmark_logout"></div>
            <div class="card__item card__hint card__hint_logout"></div>
          </div>
          <article class="card__description">
            <time class="card__data" datetime="2019-08-02">2 августа, 2019</time>
            <h2 class="card__title">Национальное достояние – парки</h2>
            <p class="card__info">
              В 2016 году Америка отмечала важный юбилей: сто лет назад
              здесь начала складываться система национальных парков – охраняемых территорий,
              где и сегодня каждый может приобщиться к природе.
            </p>
          </article>
          <h3 class="card__source">ЛЕНТА.РУ</h3>
        </div> */

  createCard() {
    const articleCard = createElementDOM('div', 'card');
    let articleCardPic;

    if (this.cardParametrs.urlToImage !== null) {
      articleCardPic = createElementDOM(
        'div',
        'card__pic',
        '',
        `background-image: url(${this.cardParametrs.urlToImage});`
      );
      articleCard.appendChild(articleCardPic);
    } else {
      articleCardPic = createElementDOM('div', 'card__pic');
      articleCard.appendChild(articleCardPic);
    }

    if (this.cardParametrs.keyword) {
      articleCardPic.appendChild(
        createElementDOM('div', 'card__item card__keyword', `${this.cardParametrs.keyword}`)
      );
    }

    articleCardPic.appendChild(
      createElementDOM('div', `card__item card__icon card__icon_${this.type}`)
    );
    articleCardPic.appendChild(createElementDOM('div', 'card__item card__item card__hint'));
    const articleCardDescription = createElementDOM('article', 'card__description');
    articleCardDescription.appendChild(
      createElementDOM(
        'time',
        'card__data',
        `${this._dataToStrRus(this.cardParametrs.publishedAt.slice(0, 10))}`,
        '',
        `${this.cardParametrs.publishedAt.slice(0, 10)}`
      )
    );
    const articleCardDescriptionWraper = createElementDOM('div', 'card__description-wraper');
    const articleCardDescriptionContainer = createElementDOM('div', 'card__description-container');
    articleCardDescriptionContainer.appendChild(
      createElementDOM('h2', 'card__title', `${this.cardParametrs.title}`)
    );
    articleCardDescriptionContainer.appendChild(
      createElementDOM('p', 'card__info', `${this.cardParametrs.description}`)
    );
    articleCardDescriptionWraper.appendChild(articleCardDescriptionContainer);
    articleCardDescription.appendChild(articleCardDescriptionWraper);
    articleCard.appendChild(articleCardDescription);
    articleCard.appendChild(articleCardDescription);
    articleCard.appendChild(
      createElementDOM('h3', 'card__source', `${this.cardParametrs.source.name}`)
    );
    return articleCard;
  }
}
