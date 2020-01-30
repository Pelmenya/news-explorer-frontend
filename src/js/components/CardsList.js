import Card from './Card';
import ButtonsListeners from './ButtonsListeners';

export default class CardsList extends ButtonsListeners {
  constructor(props, container, cardsListBtn, numberRenderCards = 3) {
    super(props);
    this.cardsListBtn = cardsListBtn;
    this.numberRenderCards = numberRenderCards;
    this.cardListContainer = container;
  }

  clear() {
    while (this.cardListContainer.firstChild) {
      this.cardListContainer.removeChild(this.cardListContainer.firstChild);
    }
    this.counterRenderCards = 0;
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
