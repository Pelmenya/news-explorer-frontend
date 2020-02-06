import { createElementDOM, getProfile, dataToStrRus } from '../utilits/functions';
import { profileOwner } from '../constants/constants';

export default class Card {
  _toDoMouseMoveTopRightBtn() {
    if (getProfile(profileOwner)) {
      this.buttonTopRightHint.classList.add(`card__hint_${this.cardParametrs.type}`);
    } else {
      this.buttonTopRightHint.classList.add(`card__hint_${this.cardParametrs.type}`);
      this.buttonTopRightHint.classList.add(`card__hint_${this.cardParametrs.type}_logout`);
    }
  }

  _toDoMouseOutTopRightBtn() {
    this.buttonTopRightHint.classList.remove(`card__hint_${this.cardParametrs.type}`);
    this.buttonTopRightHint.classList.remove(`card__hint_${this.cardParametrs.type}_logout`);
  }

  _cardOnclick(event) {
    if (!event.target.classList.contains(`card__icon_${this.cardParametrs.type}`)) {
      this.callBacks.toDoOnClickCard(this.cardParametrs.url);
    }
  }

  _toDoOnClickTopRightBtn() {
    if (getProfile(profileOwner)) {
      if (this.cardParametrs._id) {
        this.callBacks.toDoOnClickTopRightBtn(this.cardParametrs, 'DELETE')
          .then((_id) => {
            if (_id === null) {
              this.buttonTopRight.classList.remove(`card__icon_${this.cardParametrs.type}-marked`);
              this.cardParametrs._id = _id;
            }
          })
          .catch((err) => alert(err));
      } else {
        this.callBacks.toDoOnClickTopRightBtn(this.cardParametrs, 'POST')
          .then((_id) => {
            if (_id) {
              this.buttonTopRight.classList.add(`card__icon_${this.cardParametrs.type}-marked`);
              this.cardParametrs._id = _id;
            }
          })
          .catch((err) => alert(err));
      }
    }
  }

  constructor(item, callBacks) {
    this.cardParametrs = Object.assign(item);
    this.callBacks = callBacks;
  }

  addEventListeners() {
    Object.keys(this.elements).forEach((item) => {
      this.elements[item].callBack = this.elements[item].callBack.bind(this);
      this.elements[item].element.addEventListener(
        this.elements[item].event,
        this.elements[item].callBack,
      );
    });
  }

  removeEventListeners() {
    Object.keys(this.elements).forEach((item) => {
      this.elements[item].element.removeEventListener(
        this.elements[item].event,
        this.elements[item].callBack,
      );
    });
  }

  create() {
    const articleCard = createElementDOM('div', 'card');
    let articleCardPic;

    if (this.cardParametrs.urlToImage !== null) {
      articleCardPic = createElementDOM(
        'div',
        'card__pic',
        '',
        `background-image: url(${this.cardParametrs.urlToImage});`,
      );
      articleCard.appendChild(articleCardPic);
    } else {
      articleCardPic = createElementDOM('div', 'card__pic');
      articleCard.appendChild(articleCardPic);
    }

    if (this.cardParametrs.keyword) {
      articleCardPic.appendChild(
        createElementDOM('div', 'card__item card__keyword', `${this.cardParametrs.keyword}`),
      );
    }

    this.buttonTopRight = createElementDOM(
      'div',
      `card__item card__icon card__icon_${this.cardParametrs.type}`,
    );
    articleCardPic.appendChild(this.buttonTopRight);

    this.buttonTopRightHint = createElementDOM('div', 'card__item card__hint');
    articleCardPic.appendChild(this.buttonTopRightHint);

    const articleCardDescription = createElementDOM('article', 'card__description');
    articleCardDescription.appendChild(
      createElementDOM(
        'time',
        'card__data',
        `${dataToStrRus(this.cardParametrs.publishedAt.slice(0, 10))}`,
        '',
        `${this.cardParametrs.publishedAt.slice(0, 10)}`,
      ),
    );

    const articleCardDescriptionWraper = createElementDOM('div', 'card__description-wraper');

    const articleCardDescriptionContainer = createElementDOM('div', 'card__description-container');
    articleCardDescriptionContainer.appendChild(
      createElementDOM('h2', 'card__title', `${this.cardParametrs.title}`),
    );
    articleCardDescriptionContainer.appendChild(
      createElementDOM('p', 'card__info', `${this.cardParametrs.description}`),
    );
    articleCardDescriptionWraper.appendChild(articleCardDescriptionContainer);
    articleCardDescription.appendChild(articleCardDescriptionWraper);
    articleCard.appendChild(articleCardDescription);
    articleCard.appendChild(articleCardDescription);
    articleCard.appendChild(
      createElementDOM('h3', 'card__source', `${this.cardParametrs.source.name}`),
    );
    this.cardParametrs.card = articleCard;
    this.elements = [
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
        callBack: this._toDoOnClickTopRightBtn,
      },
      {
        element: this.cardParametrs.card,
        event: 'click',
        callBack: this._cardOnclick,
      },
    ];
  }
}
