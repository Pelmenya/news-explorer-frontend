import { cardsListElement } from './elements';
import CardsList from '../../../blocks/cards-list/CardsList';
import addCardTrash from '../../utilits/callbacks/cardsList';

const cardsList = new CardsList(cardsListElement, addCardTrash);

export default cardsList;
