import CardsListControl from '../../blocks/cards-list/CardListControl';

import { numberCardsInLine } from './constants';
import { cardsListElement, cardsListBtn } from './elements';
import { addCardBookMark } from '../utilits/callbacks';


const cardsListControl = new CardsListControl(
  cardsListElement,
  addCardBookMark,
  cardsListBtn,
  numberCardsInLine,
);

export default cardsListControl;
