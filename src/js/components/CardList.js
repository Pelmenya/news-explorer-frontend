import Card from './Card';

export default class CardList {
  constructor(container, initialCards) {
    this.playList = container;
    this.cards = initialCards;
    this.render();
  }

  addCard(item) {
    const objCard = new Card(item);
    this.playList.appendChild(objCard.card);
  }

  render() {
    this.cards.forEach((item) => {
      this.addCard(item);
    });
  }
}
