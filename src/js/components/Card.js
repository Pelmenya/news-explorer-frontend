import { createElementDOM, getProfile, dataToStrRus } from '../utilits/functions';
import ElementsListeners from './ElementsListeners';
import { profileOwner } from '../constants/constants';

export default class Card extends ElementsListeners {
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
        this.toDoOnClickTopRightBtn(this.cardParametrs, 'DELETE')
          .then((_id) => {
            if (_id === null) {
              this.buttonTopRight.classList.remove(`card__icon_${this.cardParametrs.type}-marked`);
              this.cardParametrs._id = _id;
            }
          })
          .catch((err) => alert(err));
      } else {
        this.toDoOnClickTopRightBtn(this.cardParametrs, 'POST')
          .then((_id) => {
            if (_id) {
              this.buttonTopRight.classList.add(`card__icon_${this.cardParametrs.type}-marked`);
              this.cardParametrs._id = _id;
            }
          })
          .catch((err) => alert(err));
      }
      console.log(this.cardParametrs);
    }
  }

  constructor(props, item, toDoOnClickTopRightBtn, callBacks) {
    super(props);
    this.cardParametrs = Object.assign(item);
    this.callBacks = callBacks;
    this.toDoOnClickTopRightBtn = toDoOnClickTopRightBtn;
    //console.log(this.cardParametrs);
    // DOM элемент карточки
    this.cardParametrs.card = this.createCard();
    this.buttonTopRight = this.cardParametrs.card.querySelector(
      `.card__icon_${this.cardParametrs.type}`
    );
    this.buttonTopRightHint = this.cardParametrs.card.querySelector('.card__hint');
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
        callBack: this._toDoOnClickTopRightBtn,
      },
      {
        element: this.cardParametrs.card,
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
      createElementDOM('div', `card__item card__icon card__icon_${this.cardParametrs.type}`)
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
