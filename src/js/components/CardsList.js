import ElementsListeners from './ElementsListeners';

export default class CardsList extends ElementsListeners {
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
    this.cardListContainer = container;
    this.addListeners([
      {
        element: this.cardsListBtn.element,
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
      this.cardListContainer.appendChild(this.callBack({ ...obj, keyWordForSave: this.keyword }));
    };
    img.onerror = () => {
      obj.urlToImage = null;
      this.cardListContainer.appendChild(this.callBack({ ...obj, keyWordForSave: this.keyword }));
    };
    img.src = item.urlToImage;
  }

  viewCards(articles, keyword) {
    this.keyword = keyword;
    this._clear();
    this.stopRenderCards = articles.length;
    this.cards = Object.assign(articles);
    this.render();
  }
}
