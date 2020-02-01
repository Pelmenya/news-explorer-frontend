import { createElementDOM, getProfile, dataToStrRus } from '../utilits/functions';
import ElementsListeners from './ElementsListeners';
import { profileOwner } from '../constants/constants';

export default class Card extends ElementsListeners {
  _toDoMouseMoveTopRightBtn() {
    if (getProfile(profileOwner)) {
      this.buttonTopRightHint.classList.add(`card__hint_${this.type}`);
    } else {
      this.buttonTopRightHint.classList.add(`card__hint_${this.type}`);
      this.buttonTopRightHint.classList.add(`card__hint_${this.type}_logout`);
    }
  }

  _toDoMouseOutTopRightBtn() {
    this.buttonTopRightHint.classList.remove(`card__hint_${this.type}`);
    this.buttonTopRightHint.classList.remove(`card__hint_${this.type}_logout`);
  }

  _cardOnclick(event) {
    if (!event.target.classList.contains(`card__icon_${this.type}`)) {
      this.callBacks.toDoOnClickCard(this.cardParametrs.url);
    }
  }

  constructor(props, item, type, callBacks) {
    super(props);
    this.cardParametrs = Object.assign(item);
    this.type = type;
    this.callBacks = callBacks;
    console.log(this.cardParametrs);
    // DOM элемент карточки
    this.card = this.createCard();
    this.buttonTopRight = this.card.querySelector(`.card__icon_${this.type}`);
    this.buttonTopRightHint = this.card.querySelector('.card__hint');
    this.addListeners([
      {
        element: this.buttonTopRight,
        event: 'mouseover',
        callBack: this._toDoMouseMoveTopRightBtn,
      },
      {
        element: this.buttonTopRight,
        event: 'mouseout',
        callBack: this._toDoMouseOutTopRightBtn,
      },
      {
        element: this.buttonTopRight,
        event: 'click',
        callBack: this.callBacks.toDoOnClickTopRightBtn,
      },
      {
        element: this.card,
        event: 'click',
        callBack: this._cardOnclick,
      },
    ]);
  }

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
    articleCardPic.appendChild(createElementDOM('div', 'card__item card__hint'));
    const articleCardDescription = createElementDOM('article', 'card__description');
    articleCardDescription.appendChild(
      createElementDOM(
        'time',
        'card__data',
        `${dataToStrRus(this.cardParametrs.publishedAt.slice(0, 10))}`,
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
