import createElementDOM from '../utilits/functions';

export default class Card {
  constructor(item) {
    this.cardParametrs = Object.assign(item);
    console.log(this.cardParametrs);

    this.card = this.createCard();
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
    if (this.cardParametrs.urlToImage !== null) {
      articleCard.appendChild(
        createElementDOM(
          'div',
          'card__pic',
          false,
          `background-image: url(${this.cardParametrs.urlToImage});`
        )
      );
    }

    return articleCard;
  }
}
