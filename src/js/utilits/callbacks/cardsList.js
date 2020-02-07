import Card from '../../../blocks/card/Card';
import { toDoOnClickCard, toDoOnClickTopRightBtn } from './card';

function addCardTrash(item) {
  const newCard = new Card(
    { ...item, type: 'trash' },
    {
      toDoOnClickTopRightBtn,
      toDoOnClickCard,
    },
  );
  newCard.create();
  newCard.addEventListeners();
  return newCard.cardParametrs.card;
}

export default addCardTrash;
