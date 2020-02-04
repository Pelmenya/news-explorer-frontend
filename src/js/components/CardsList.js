export default class CardsList {
  _clear() {
    while (this.cardListContainer.firstChild) {
      this.cardListContainer.removeChild(this.cardListContainer.firstChild);
    }
    this.counterRenderCards = 0;
  }

  constructor(container, createObject) {
    this.createObject = createObject;
    this.cardListContainer = container;
    this.render = this.render.bind(this);
  }

  render() {
    this.cards.forEach((item) => this.addCard(item));
  }

  addCard(item) {
    const obj = Object.assign(item);
    const img = new Image();

    img.onload = () => {
      this.cardListContainer.appendChild(
        this.createObject({ ...obj, keyWordForSave: this.keyword })
      );
    };
    img.onerror = () => {
      obj.urlToImage = null;
      this.cardListContainer.appendChild(
        this.createObject({ ...obj, keyWordForSave: this.keyword })
      );
    };
    img.src = item.urlToImage;
  }

  viewCards(articles, keyword = null) {
    this.keyword = keyword;
    this._clear();
    this.stopRenderCards = articles.length;
    this.cards = Object.assign(articles);
    this.render();
  }
}
