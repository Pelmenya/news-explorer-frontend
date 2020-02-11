import Card from '../../../blocks/card/Card';
import { toDoOnClickCard, toDoOnClickTopRightBtn } from './card';

function addCardBookMark(item) {
  const newCard = new Card(
    { ...item, type: 'bookmark' },
    {
      toDoOnClickTopRightBtn,
      toDoOnClickCard,
    },
  );
  newCard.create();
  newCard.addEventListeners();
  return newCard.cardParametrs.card;
}

export default addCardBookMark;
