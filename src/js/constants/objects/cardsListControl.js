import { numberCardsInLine } from '../constants';
import { cardsListElement, cardsListBtn } from './elements';

import addCardBookMark from '../../utilits/callbacks/cardsListControl';
import CardsListControl from '../../../blocks/cards-list/CardListControl';

const cardsListControl = new CardsListControl(
  cardsListElement,
  addCardBookMark,
  cardsListBtn,
  numberCardsInLine,
);

export default cardsListControl;
