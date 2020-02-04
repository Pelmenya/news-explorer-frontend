import CardsList from './CardsList';

export default class CardsListControl extends CardsList {
  constructor(container, createObject, cardsListBtn, numberRenderCards = 3) {
    super(container, createObject);

    this.cardsListBtn = cardsListBtn;
    this.numberRenderCards = numberRenderCards;
    this.createObject = createObject;
    this.cardListContainer = container;

    this.cardsListBtn.element.addEventListener('click', this.render);
  }

  render() {
    this.cardsListBtn.open();
    if (this.counterRenderCards + this.numberRenderCards < this.stopRenderCards) {
      for (
        let i = this.counterRenderCards;
        i < this.counterRenderCards + this.numberRenderCards;
        i += 1
      ) {
        this.addCard(this.cards[i]);
      }
      this.counterRenderCards += this.numberRenderCards;
    } else {
      for (let i = this.counterRenderCards; i < this.stopRenderCards; i += 1) {
        this.addCard(this.cards[i]);
      }
      this.cardsListBtn.close();
    }
  }
}
