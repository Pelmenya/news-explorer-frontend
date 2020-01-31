import ButtonsListeners from './ButtonsListeners';

export default class CardsList extends ButtonsListeners {
  _clear() {
    while (this.cardListContainer.firstChild) {
      this.cardListContainer.removeChild(this.cardListContainer.firstChild);
    }
    this.counterRenderCards = 0;
  }

  constructor(props, container, cardsListBtn, numberRenderCards = 3, callBack = null) {
    super(props);
    this.cardsListBtn = cardsListBtn;
    this.numberRenderCards = numberRenderCards;
    this.callBack = callBack;
    console.log(container);
    this.cardListContainer = container;
    this.addListeners([
      {
        button: this.cardsListBtn.element,
        event: 'click',
        callBack: this.render,
      },
    ]);
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

  addCard(item) {
    const obj = Object.assign(item);
    const img = new Image();

    img.onload = () => {
      //const objCard = new Card(obj);
      this.cardListContainer.appendChild(this.callBack(obj));
    };
    img.onerror = () => {
      obj.urlToImage = null;
      //const objCard = new Card(obj);
      this.cardListContainer.appendChild(this.callBack(obj));
    };
    img.src = item.urlToImage;
  }

  viewCards(articles) {
    this._clear();
    this.stopRenderCards = articles.length;
    this.cards = Object.assign(articles);
    this.render();
  }
}
