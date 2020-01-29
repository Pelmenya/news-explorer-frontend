import Card from './Card';
import ButtonsListeners from './ButtonsListeners';

export default class CardList extends ButtonsListeners {
  constructor(props, container, initialCards, callBacks = null) {
    super(props);
    this.cardListContainer = container;
    this.cards = initialCards;
    this.render();
  }

  addCard(item) {
    const obj = Object.assign(item);
    const img = new Image();
    img.onload = () => {
      const objCard = new Card(obj);
      this.cardListContainer.appendChild(objCard.card);
    };
    img.onerror = () => {
      obj.urlToImage = null;
      const objCard = new Card(obj);
      this.cardListContainer.appendChild(objCard.card);
    };
    img.src = item.urlToImage;
  }

  render() {
    this.cards.forEach((item) => {
      this.addCard(item);
    });
  }
}
